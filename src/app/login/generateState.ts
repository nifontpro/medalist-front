export const generateState = (length: number) => {
  let state = '';
  // noinspection SpellCheckingInspection
  let alphaNumericCharacters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let alphaNumericCharactersLength = alphaNumericCharacters.length;
  for (let i = 0; i < length; i++) {
    state += alphaNumericCharacters.charAt(
      Math.floor(Math.random() * alphaNumericCharactersLength)
    );
  }

  return state;
};
