import { userApi } from '@/api/user/user.api';
import { setArrayIds } from '@/store/features/sidebar/sidebarTree.slice';
import {
  setTypeOfUserUndefined,
  setTypeOfUser_IsOpen,
} from '@/store/features/userSelection/userSelection.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { useEffect } from 'react';

export const useMainLayout = () => {
  const dispatch = useAppDispatch();
  const { typeOfUser } = useAppSelector((state) => state.userSelection);

  const { data: rolesUser, isLoading } = userApi.useGetProfilesQuery(undefined);

  const { expandedIds, selectedIds } = useAppSelector(
    (state) => state.sidebarTree
  );

  useEffect(() => {
    if (rolesUser?.data?.length && rolesUser?.data?.length > 0) {
      if (
        typeOfUser &&
        rolesUser?.data.filter((role) => role.id == typeOfUser.id).length > 0
      ) {
        dispatch(setArrayIds(expandedIds));
      } else {
        dispatch(setTypeOfUserUndefined());
      }
      if (rolesUser?.data?.length == 1) {
        dispatch(setTypeOfUser_IsOpen(rolesUser?.data[0]));
      }
    } else if (rolesUser?.data?.length == 0) {
      dispatch(setTypeOfUserUndefined());
    }
  });
  return {
    typeOfUser,
    rolesUser,
    isLoading,
    expandedIds,
    selectedIds,
  };
};
