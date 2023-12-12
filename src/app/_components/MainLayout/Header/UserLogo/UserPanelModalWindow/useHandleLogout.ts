import { useAppDispatch } from '@/store/hooks/hooks';
import { deleteCookie, getCookie } from 'cookies-next';
import { APP_URI, CLIENT_ID, KEYCLOAK_URI } from '@/api/base/base.api';
import { removeToken } from '@/store/features/auth/auth.slice';
import { resetTreeDepts } from '@/store/features/treeDepts/treeDepts.slice';

export const useHandleLogout = () => {
  const dispatch = useAppDispatch();

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

  const handleLogoutClick = async () => {
    const it = localStorage.getItem('it');
    localStorage.removeItem('selectCompany');
    const id_token = getCookie('id_token') as string | undefined;

    setTimeout(async () => {
      if (id_token != undefined) {
        await logoutWin(id_token);
      }
      await logoutWin(id_token!);
    }, 0);
  };

  return {
    handleLogoutClick,
  };
};
