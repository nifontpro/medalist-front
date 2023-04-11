import * as process from 'process';

export const KEYCLOAK_URI = `${process.env.KEYCLOAK_URL}/realms/medalist-realm/protocol/openid-connect`;
export const CLIENT_ID = 'medalist-client';
export const APP_URI = process.env.APP_URL;
export const AUTH_CODE_REDIRECT_URI = APP_URI + '/login/redirect';