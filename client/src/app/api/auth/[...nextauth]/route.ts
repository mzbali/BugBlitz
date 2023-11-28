import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
  ],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
