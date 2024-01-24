import { DefaultSession, DefaultUser, NextAuthOptions, User } from 'next-auth';
import { type JWT } from 'next-auth/jwt';
import ZitadelProvider from 'next-auth/providers/zitadel';
import { Issuer } from 'openid-client';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      username?: string;
    } & DefaultSession['user'];
    clientId?: string;
    error?: string;
  }
  interface User extends DefaultUser {
    preferred_username?: string;
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    id_token?: string;
    provider?: string;
    error?: string;
    user?: User;
  }
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const issuer = await Issuer.discover(process.env.ZITADEL_ISSUER ?? '');
    const client = new issuer.Client({
      client_id: process.env.ZITADEL_CLIENT_ID || '',
      token_endpoint_auth_method: 'none',
    });

    const { refresh_token, access_token, expires_at } = await client.refresh(
      token.refreshToken as string,
    );

    return {
      ...token,
      accessToken: access_token,
      expiresAt: (expires_at ?? 0) * 1000,
      refreshToken: refresh_token, // Fall back to old refresh token
    };
  } catch (error) {
    console.error('Error during refreshAccessToken', error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
async function getUserInfo(accessToken: string) {
  try {
    const response = await fetch(
      process.env.ZITADEL_ISSUER + '/oidc/v1/userinfo',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('Response not OK during getUserInfo');
    }

    const userInfo = await response.json();
    return userInfo;
  } catch (error) {
    console.error('Error during getUserInfo', error);
    return null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    ZitadelProvider({
      issuer: process.env.ZITADEL_ISSUER || '',
      clientId: process.env.ZITADEL_CLIENT_ID || '',
      clientSecret: process.env.ZITADEL_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: `openid email profile offline_access`,
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      token.accessToken ??= account?.access_token;
      token.refreshToken ??= account?.refresh_token;
      token.id_token ??= account?.id_token;
      token.expiresAt ??= (account?.expires_at ?? 0) * 1000;
      token.error = undefined;
      token.user ??= await getUserInfo(account?.access_token ?? 'none');
      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.expiresAt as number)) {
        return token;
      }
      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token: { user, error: tokenError, id_token } }) {
      session.user = {
        email: user?.email,
        image: user?.image,
        name: user?.name,
        username: user?.preferred_username,
      };
      session.clientId = process.env.ZITADEL_CLIENT_ID || '';
      session.accessToken = id_token;
      session.error = tokenError;
      console.log(session);

      return session;
    },
  },
};
