import jwt, { JwtPayload } from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import { type JWT } from 'next-auth/jwt';
import { type OAuthConfig } from 'next-auth/providers';
import KeycloakProvider, {
  type KeycloakProfile,
} from 'next-auth/providers/keycloak';

declare module 'next-auth/jwt' {
  interface JWT {
    id_token?: string;
    provider?: string;
  }
}

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID || 'keycloak_client_id',
      clientSecret: process.env.KEYCLOAK_SECRET || 'keycloak_client_secret',
      issuer: process.env.KEYCLOAK_ISSUER || 'keycloak_url',
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id_token = account.id_token;
        token.provider = account.provider;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      // Check if the token is expired
      const decodedToken = jwt.decode(
        token.accessToken as string,
      ) as JwtPayload;
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        // Token is expired, refresh it
        const response = await fetch(
          `${process.env.KEYCLOAK_URL}/realms/myrealm/protocol/openid-connect/token`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              client_id: process.env.KEYCLOAK_ID as string,
              client_secret: process.env.KEYCLOAK_SECRET as string,
              grant_type: 'refresh_token' as string,
              refresh_token: token.refreshToken as string,
            }),
          },
        );
        if (response.ok) {
          const refreshedTokens = await response.json();
          token.accessToken = refreshedTokens.access_token;
          token.refreshToken = refreshedTokens.refresh_token;
          console.log('Token refreshed successfully');
        } else {
          console.error(`HTTP error! status: ${response.status}`);
          token.refreshToken = undefined;
          redirect('/');
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        });
      }
      return session;
    },
  },
  events: {
    async signOut({ token }: { token: JWT }) {
      if (token.provider === 'keycloak') {
        const issuerUrl = (
          authOptions.providers.find(
            (p) => p.id === 'keycloak',
          ) as OAuthConfig<KeycloakProfile>
        ).options!.issuer!;
        const logOutUrl = new URL(
          `${issuerUrl}/protocol/openid-connect/logout`,
        );
        logOutUrl.searchParams.set('id_token_hint', token.id_token!);
        await fetch(logOutUrl);
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
