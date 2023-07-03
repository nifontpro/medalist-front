import { type JWT } from 'next-auth/jwt';
import axios from 'axios';
import { IKeycloakRefreshTokenApiResponse } from './keycloakRefreshToken';

export async function refreshAccessToken(token: JWT) {
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