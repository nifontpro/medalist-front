import { User } from '@/domain/model/user/user';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { getUserEditUrl, getUserUrl } from '@/config/api.config';
import {
  APP_URI,
  AUTH_URL,
  CLIENT_ID,
  KEYCLOAK_URI,
} from '@/api/base/base.api';

import { signOut } from 'next-auth/react';
import { getCookie, deleteCookie } from 'cookies-next';
import { setTypeOfUserUndefined } from '@/store/features/userSelection/userSelection.slice';
import { useAppDispatch } from '@/store/hooks/hooks';

export function logoutWin(it: string) {
  // console.log(it);
  const params = [
    'post_logout_redirect_uri=' + AUTH_URL,
    'id_token=' + it,
    'client_id=' + CLIENT_ID,
  ];
  const url = KEYCLOAK_URI + '/logout' + '?' + params.join('&');

  deleteCookie('accessToken');
  deleteCookie('refreshToken');
  deleteCookie('refreshTokenExpire');
  deleteCookie('accessTokenExpired');
  window.open(url, '_self');
}

export const useUserPanelModalWindow = (
  setVisibleModal: Dispatch<SetStateAction<boolean>>,
  user: User | undefined
) => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const id_token = getCookie('id_token')?.toString();

  return useMemo(() => {
    const handleClickProfile = () => {
      push(getUserUrl(`/${user?.id}`));
      setVisibleModal(false);
    };

    const handleClickEditProfile = () => {
      push(getUserEditUrl(`${user?.id}`));
      setVisibleModal(false);
    };

    const handleLogoutClick = async () => {
      await dispatch(setTypeOfUserUndefined());
      if (id_token) {
        setVisibleModal(false);
        await signOut();
        await logoutWin(id_token);
      }
    };

    return {
      handleClickProfile,
      handleClickEditProfile,
      handleLogoutClick,
    };
  }, [push, setVisibleModal, user, id_token, dispatch]);
};
