import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { userApi } from '@/api/user/user.api';
import {
  setTypeOfUser_IsOpen,
  setIsOpenUserSelection,
} from '@/store/features/userSelection/userSelection.slice';
import { setArrayIds } from '@/store/features/sidebar/sidebarTree.slice';
import { usePathname, useRouter } from 'next/navigation';
import { User } from '@/types/user/user';
import { deptApi } from '@/api/dept/dept.api';

export const useUserSelection = () => {
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const pathName = usePathname();

  const { typeOfUser, isOpen } = useAppSelector((state) => state.userSelection);
  const { expandedIds, selectedIds } = useAppSelector(
    (state) => state.sidebarTree
  );

  const { data: rolesUser, isLoading } = userApi.useGetProfilesQuery(undefined);
  console.log(rolesUser);

  // //Получаем отделы возможные для просмотра
  const [subTree] = deptApi.useLazyGetAuthTopLevelTreeQuery();

  const handleChangeRole = async (role: User) => {
    dispatch(setTypeOfUser_IsOpen(role));
    dispatch(setArrayIds(['0']));
    localStorage.removeItem('selectCompany');
    // dispatch(setSelectedTreeId(role.dept.id.toString())); //чтобы в сайдбаре выделялся отдел в который перешли

    if (role.roles.includes('OWNER') && role.id) {
      const result = await subTree({
        authId: role.id,
        baseRequest: {
          orders: [{ field: 'parentId' }, { field: 'name', direction: 'ASC' }],
        },
      });

      if (result.data?.data?.length == 1 && result.data.data[0].id) {
        localStorage.setItem(
          'selectCompany',
          result.data?.data[0].id.toString()
        );
        push(`department/${result.data?.data[0].id}`);
      }
      if (
        result.data?.data &&
        result.data?.data?.length > 1 &&
        result.data?.data[1].id
      ) {
        localStorage.setItem(
          'selectCompany',
          result.data?.data[1].id.toString()
        );
        push(`/department/${result.data?.data[1].id}`);
      }
    } else {
      push(`/department/${role.dept.id}`);
    }
  };

  return {
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
