import { useUserAdmin } from '@/api/user/useUserAdmin';
import { userApi } from '@/api/user/user.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { toastError } from '@/utils/toast-error';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

export const useMain = () => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { userSettings, isLoadingUserSettings } = useUserAdmin();
  const [saveUserSettings] = userApi.useSaveSettingsMutation();

  const [state, setState] = useState<boolean | undefined>(false);
  const [onBoarding, setOnboarding] = useState<number>(1);
  const [onBoardingText, setOnboardingText] = useState<string>('');
  const [onBoardingText3, setOnboardingText3] = useState<string>('');

  useEffect(() => {
    setState(userSettings?.data?.showOnboarding);
    if (onBoarding == 1) {
      setOnboardingText('Следи за своим прогрессом');
    }
    if (onBoarding == 2) {
      setOnboardingText('Участвуй в новых номинациях');
    }
    if (onBoarding == 3) {
      setOnboardingText(`Узнавай об активностях `);
      setOnboardingText3('в компании');
    }
  }, [onBoarding, userSettings]);

  const onBoardingFalse = useCallback(async () => {
    let isError = false;
    if (typeOfUser && typeOfUser.id) {
      setOnboarding(1);
      await saveUserSettings({
        userId: typeOfUser.id,
        showOnboarding: false,
        pageOnboarding: onBoarding,
      })
        .unwrap()
        .then((res) => {
          if (res.success == false) {
            isError = true;
            errorMessageParse(res.errors);
          }
        })
        .catch((e) => {
          isError = true;
          toastError(e, 'Ошибка сохраннеия настроек');
        });
      if (!isError) {
        toast.success('Настройки успешно сохраненны');
      }
    }
  }, [onBoarding, saveUserSettings, typeOfUser]);

  const saveUserSettingsAsync = useCallback(async () => {
    let isError = false;
    if (typeOfUser && typeOfUser.id)
      if (onBoarding < 3) {
        setOnboarding((prev) => prev + 1);
      } else {
        await saveUserSettings({
          userId: typeOfUser.id,
          showOnboarding: true,
          pageOnboarding: 3,
        })
          .unwrap()
          .then((res) => {
            if (res.success == false) {
              isError = true;
              errorMessageParse(res.errors);
            }
          })
          .catch((e) => {
            isError = true;
            toastError(e, 'Ошибка сохраннеия настроек');
          });
        if (!isError) {
          toast.success('Настройки успешно сохраненны');
        }
      }
  }, [onBoarding, saveUserSettings, typeOfUser]);

  return {
    onBoarding,
    state,
    saveUserSettingsAsync,
    onBoardingText,
    onBoardingText3,
    onBoardingFalse,
  };
};
