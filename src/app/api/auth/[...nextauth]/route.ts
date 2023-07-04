import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { refreshAccessToken } from '../refreshAccessToken';
import { JWT } from 'next-auth/jwt';

// const secret = process.env.NEXTAUTH_SECRET;

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      id: 'keycloak',
      name: 'Keycloak',
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_SECRET!,
      wellKnown: `${process.env.KEYCLOAK_ISSUER}/.well-known/openid-configuration`,
      issuer: process.env.KEYCLOAK_ISSUER,
      // requestTokenUrl: `${process.env.KEYCLOAK_URL}/protocol/openid-connect/auth`,
      // authorization: {
      //   url: `${process.env.KEYCLOAK_URL}/protocol/openid-connect/token`,
      //   params: {
      //     scope: 'openid email profile',
      //   },
      // },
      checks: ['pkce', 'state'],
      idToken: true,
      profile(profile) {
        return {
          id: profile.sub,
          ...profile,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  // Generate secret: openssl rand -base64 32
  // secret: challenge,
  pages: {
    signIn: undefined,
  },
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   return Promise.resolve(url.startsWith(baseUrl) ? url : baseUrl);
    // },
    // async signIn({ account, user }) {
    //   if (account && user) {
    //     console.log('true');
    //     return true;
    //   } else {
    //     console.log('false');
    //     return false;
    //   }
    // },
    jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        // Add access_token, refresh_token and expirations to the token right after signin
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpired = account.expires_at! * 1000;
        token.refreshTokenExpired =
          Date.now() + (account.refresh_expires_in as number) * 1000;
        token.user = user;

        return token;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.accessTokenExpired as number)) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    // session({ session, token }) {
    //   if (token) {
    //     session.accessToken = token.accessToken;
    //     session.refreshToken = token.refreshToken;
    //   }
    //   return session;
    // },
  },
  // events: {
  //   async signOut({ token }: { token: JWT }) {
  //     // if (token.provider === "keycloak") {
  //     //   const logOutUrl = new URL(`${process.env.KEYCLOAK_URL}/protocol/openid-connect/logout`)
  //     //   logOutUrl.searchParams.set("id_token_hint", token.id_token!.toString())
  //     //   await fetch(logOutUrl);
  //     // }
  //   },
  // }
});

export { handler as GET, handler as POST };
