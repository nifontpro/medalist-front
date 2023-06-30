import axios from 'axios';
import NextAuth from 'next-auth';
import { getToken, type JWT } from 'next-auth/jwt';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { IKeycloakRefreshTokenApiResponse } from '../keycloakRefreshToken';

// const secret = process.env.NEXTAUTH_SECRET;

async function refreshAccessToken(token: JWT) {
  try {
    const refreshedTokens = await axios.post<IKeycloakRefreshTokenApiResponse>(
      'https://nmedalist.ru:9443/realms/medalist-realm/protocol/openid-connect/token',
      {
        refreshToken: token?.refreshToken,
      }
    );

    if (refreshedTokens.status !== 200) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.data.access_token,
      accessTokenExpired: Date.now() + refreshedTokens.data.expires_in * 1000,
      refreshToken: refreshedTokens.data.refresh_token ?? token.refreshToken,
      refreshTokenExpired:
        Date.now() + refreshedTokens.data.refresh_expires_in * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      id: 'keycloak',
      name: 'Keycloak',
      clientId: 'medalist-client',
      clientSecret: '_',
      issuer: process.env.KEYCLOAK_ISSUER,
      requestTokenUrl: `${process.env.KEYCLOAK_URL}/protocol/openid-connect/auth`,
      authorization: {
        params: {
          scope: 'openid email profile',
        },
      },
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
    //     return true;
    //   } else {
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
});

export { handler as GET, handler as POST };
