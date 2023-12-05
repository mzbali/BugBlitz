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
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          accessToken: token.accessToken,
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
