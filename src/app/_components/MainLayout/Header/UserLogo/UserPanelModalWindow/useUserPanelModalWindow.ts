import { User } from '@/domain/model/user/user';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { getUserEditUrl, getUserUrl } from '@/config/api.config';
import { APP_URI, CLIENT_ID, KEYCLOAK_URI } from '@/api/base/base.api';

export function logoutWin(it: string) {
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
      setVisibleModal(false);
    };

    return {
      handleClickProfile,
      handleClickEditProfile,
      handleLogoutClick,
    };
  }, [push, setVisibleModal, user]);
};
