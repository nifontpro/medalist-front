import { User } from '@/types/user/user';
import { useAppDispatch } from '@/store/hooks/hooks';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { getUserEditUrl, getUserUrl } from '@/config/api.config';
import { deleteCookie, getCookie } from 'cookies-next';
import { useHeader } from '../../useHeader';
import { setIsOpenUserSelection } from '@/store/features/userSelection/userSelection.slice';
import { APP_URI, CLIENT_ID, KEYCLOAK_URI } from '@/api/base/base.api';
import { removeToken } from '@/store/features/auth/auth.slice';
import { resetTreeDepts } from '@/store/features/treeDepts/treeDepts.slice';

export const useUserPanelModalWindow = (
  setVisibleModal?: Dispatch<SetStateAction<boolean>>,
  user?: User | undefined
) => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { close } = useHeader();

  const handleClickProfile = useCallback(() => {
    push(getUserUrl(`/${user?.id}`));
    setVisibleModal && setVisibleModal(false);
  }, [push, setVisibleModal, user]);

  const handleChangeCompany = useCallback(() => {
    close();
    dispatch(setIsOpenUserSelection(true));
    setVisibleModal && setVisibleModal(false);
  }, [close, dispatch, setVisibleModal]);

  const handleClickEditProfile = useCallback(() => {
    push(getUserEditUrl(`${user?.id}`));
    setVisibleModal && setVisibleModal(false);
  }, [push, setVisibleModal, user]);

  return {
    handleClickProfile,
    handleClickEditProfile,
    handleChangeCompany,
  };
};
