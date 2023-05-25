import { User } from '@/domain/model/user/user';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { APP_URI, CLIENT_ID, KEYCLOAK_URI } from '@/api/auth/auth.api';
import { useJwt } from 'react-jwt';
import { RootState } from '@/store/storage/store';
import {
  setSelectedTreeId,
  setArrayIds,
} from '@/store/features/sidebar/sidebarTree.slice';
import { authActions } from '@/store/features/auth/auth.slice';
import { setTypeOfUserUndefined } from '@/store/features/userSelection/userSelection.slice';
import { getUserEditUrl, getUserUrl } from '@/config/api.config';
import { deleteCookie } from 'cookies-next';

function logoutWin(it: string) {
  console.log(it);
  const params = [
    'post_logout_redirect_uri=' + APP_URI,
    'id_token=' + it,
    'client_id=' + CLIENT_ID,
  ];
  const url = KEYCLOAK_URI + '/logout' + '?' + params.join('&');
  window.open(url, '_self');
}

export const useUserPanelModalWindow = (
  setVisibleModal: Dispatch<SetStateAction<boolean>>,
  user: User | undefined
) => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const { idToken } = useAppSelector((state: RootState) => state.auth);

  const { isExpired } = useJwt(idToken || '');

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
      const it = localStorage.getItem('it');
      if (it != undefined && !isExpired) {
        logoutWin(it);
        dispatch(setSelectedTreeId('0'));
        dispatch(setArrayIds(['0']));
        dispatch(authActions.setIsAuth(false));
        dispatch(setTypeOfUserUndefined());
        setVisibleModal(false);
        deleteCookie('exp'); // Для middleware
      }
      await dispatch(authActions.setNoAccess());
      setVisibleModal(false);
      deleteCookie('exp'); // Для middleware

      console.log('не понятно что это');
      // await push("/login")
    };

    return {
      handleClickProfile,
      handleClickEditProfile,
      handleLogoutClick,
    };
  }, [dispatch, isExpired, push, setVisibleModal, user]);
};
