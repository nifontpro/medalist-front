import { User } from '@/types/user/user';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback } from 'react';

import { useJwt } from 'react-jwt';
import { RootState } from '@/store/storage/store';

import { getUserEditUrl, getUserUrl } from '@/config/api.config';
import { deleteCookie, getCookie } from 'cookies-next';
import { useHeader } from '../../useHeader';
import {
  setIsOpenUserSelection,
  setTypeOfUserUndefined,
} from '@/store/features/userSelection/userSelection.slice';
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

  function logoutWin(it: string) {
    const params = [
      'post_logout_redirect_uri=' + APP_URI,
      'id_token=' + it,
      'client_id=' + CLIENT_ID,
    ];
    const url = KEYCLOAK_URI + '/logout' + '?' + params.join('&');
    localStorage.removeItem('selectCompany');
    dispatch(resetTreeDepts());
    dispatch(removeToken());
    deleteCookie('access_token');
    window.open(url, '_self');
  }

  // const { idToken } = useAppSelector((state: RootState) => state.auth);

  // const { isExpired } = useJwt(idToken || '');

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

  const handleLogoutClick = useCallback(async () => {
    const it = localStorage.getItem('it');
    localStorage.removeItem('selectCompany');
    const id_token = getCookie('id_token') as string | undefined;

    setTimeout(async () => {
      if (id_token != undefined) {
        await logoutWin(id_token);
        // dispatch(authActions.setIsAuth(false));
        // await deleteCookie('exp'); // Для middleware
      }
      // await dispatch(authActions.setNoAccess());
      // await deleteCookie('exp'); // Для middleware
      await logoutWin(id_token!);
    }, 0);
  }, []);

  // const handleLogoutClick = useCallback(() => {
  //   const it = localStorage.getItem('it');
  //   if (it != undefined && !isExpired) {
  //     const logoutPromise = logoutWin(it);
  //     const setIsAuthPromise = dispatch(authActions.setIsAuth(false));
  //     const setVisibleModalPromise = setVisibleModal(false);
  //     const deleteCookiePromise = deleteCookie('exp');

  //     return Promise.all([
  //       logoutPromise,
  //       setIsAuthPromise,
  //       setVisibleModalPromise,
  //       deleteCookiePromise,
  //     ])
  //       .then(() => {
  //         dispatch(authActions.setNoAccess());
  //         setVisibleModal(false);
  //         return deleteCookie('exp');
  //       })
  //       .catch((error) => {
  //         // Handle error
  //       });
  //   } else {
  //     return Promise.resolve();
  //   }
  // }, [dispatch, isExpired, setVisibleModal]);

  return {
    handleClickProfile,
    handleClickEditProfile,
    handleLogoutClick,
    handleChangeCompany,
  };
};
