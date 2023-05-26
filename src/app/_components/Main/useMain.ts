import { useEffect, useState } from 'react';

export const useMain = () => {
  // const { awardsLight } = useAward('');
  // const {
  //   usersWithAwards: users,
  //   usersCountAwardsOnDepCompany: awardsOnCompanyGroupDep,
  // } = useMyUser('');

  // const user = useAuthState();
  // const { data: settingsUser } = userApi.useGetSettingQuery(
  //   user.user?.id || ''
  // );

  // const [saveSetting] = userApi.useSaveSettingMutation();

  const [state, setState] = useState<boolean | undefined>(false);
  const [onBoarding, setOnboarding] = useState<number>(1);
  // const [onBoardingText, setOnboardingText] = useState<string>('');
  // const [onBoardingText3, setOnboardingText3] = useState<string>('');

  // useEffect(() => {
  //   setState(settingsUser?.showOnboarding);
  //   // setState(false);
  //   if (onBoarding == 1) {
  //     setOnboardingText('Следи за своим прогрессом');
  //   }
  //   if (onBoarding == 2) {
  //     setOnboardingText('Участвуй в новых номинациях');
  //   }
  //   if (onBoarding == 3) {
  //     setOnboardingText(`Узнавай об активностях `);
  //     setOnboardingText3('в компании');
  //   }
  // }, [onBoarding, settingsUser]);

  // const handleClick = async () => {
  //   if (user.user?.id) {
  //     if (onBoarding < 3) {
  //       setOnboarding((prev) => prev + 1);
  //     } else {
  //       await saveSetting({
  //         userId: user.user?.id,
  //         showOnboarding: true,
  //         pageOnboarding: 3,
  //       }).unwrap();
  //     }
  //   }
  // };

  return {
    onBoarding,
    // awardsLight,
    // users,
    // awardsOnCompanyGroupDep,
    state,
    // onBoardingText,
    // onBoardingText3,
    // handleClick,
  };
};
