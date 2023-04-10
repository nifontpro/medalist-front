import Cookies from 'js-cookie';

const STATE = 'state';
const CODE_VERIFIER = 'codeVerifier';

export interface StatesDate {
  state: string;
  codeVerifier: string;
}

export function saveStatesToCookie(states: StatesDate) {
  Cookies.set(STATE, states.state);
  Cookies.set(CODE_VERIFIER, states.codeVerifier);
}

export function getStatesFromCookie(): StatesDate {
  return {
    state: Cookies.get(STATE) || '',
    codeVerifier: Cookies.get(CODE_VERIFIER) || '',
  };
}
