import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { userApi } from '@/api/user/user.api';
import {
  setTypeOfUser_IsOpen,
  setIsOpenUserSelection,
} from '@/store/features/userSelection/userSelection.slice';
import {
  setArrayIds,
  setSelectedTreeId,
} from '@/store/features/sidebar/sidebarTree.slice';
import { usePathname, useRouter } from 'next/navigation';
import { User } from '@/types/user/user';

export const useUserSelection = () => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const pathName = usePathname();

  const { isAuth } = useAppSelector((state) => state.auth);
  const { typeOfUser, isOpen } = useAppSelector((state) => state.userSelection);
  const { expandedIds, selectedIds } = useAppSelector(
    (state) => state.sidebarTree
  );

  const { data: rolesUser, isLoading } = userApi.useGetProfilesQuery(
    undefined,
    {
      skip: !isAuth,
    }
  );

  const handleChangeRole = (role: User) => {
    dispatch(setTypeOfUser_IsOpen(role));
    dispatch(setArrayIds(['0']));
    dispatch(setSelectedTreeId('0'));
    push('/');
  };

  return {
    isAuth,
    typeOfUser,
    isOpen,
    pathName,
    rolesUser,
    handleChangeRole,
    isLoading,
    dispatch,
    push,
    setIsOpenUserSelection,
    expandedIds,
    selectedIds,
  };
};
