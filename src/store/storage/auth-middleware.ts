import Cookies from 'js-cookie';
import { AnyAction, Middleware } from 'redux';
import { setToken } from '../features/auth/auth.slice';

export const authMiddleware: Middleware =
  (storeAPI) => (next) => (action: AnyAction) => {
    // If the action is setToken, just pass it through
    if (action.type === setToken.type) {
      return next(action);
    }
    // Before any action is dispatched, check if there's a token in store
    const currentToken = storeAPI.getState().auth.access_token;
    if (!currentToken) {
      // If no token in store, get it from cookies
      const tokenFromCookies = Cookies.get('access_token');

      if (tokenFromCookies) {
        // If token exists in cookies, dispatch an action to set it in the store
        storeAPI.dispatch(setToken(tokenFromCookies));
        sessionStorage.removeItem('attemptedTokenRefresh');
      }
      return;
    }

    // Continue processing this action
    return next(action);
  };
