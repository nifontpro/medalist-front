import { useState } from 'react';

export const useMain = () => {
  const [state, setState] = useState<boolean | undefined>(false);
  const [onBoarding, setOnboarding] = useState<number>(1);

  return {
    onBoarding,
    state,
  };
};
