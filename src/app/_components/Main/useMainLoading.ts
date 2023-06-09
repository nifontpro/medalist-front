import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import { eventApi } from '@/api/event/event.api';
import { useUserAdmin } from '@/api/user/useUserAdmin';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';

export const useMainLoading = () => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { data } = eventApi.useCreateOwnerQuery({
    authId: 78,
    deptId: 87,
    baseRequest: {
      page: 0,
      pageSize: 100,
      subdepts: true,
    },
  });

  console.log(data);

  const {
    colAwardsOnDepartment,
    isLoadingColAwardsOnDept,
    colAwardsActivRoot,
    isLoadingColAwardsActivRoot,
  } = useAwardAdmin(typeOfUser?.dept.id, { subdepts: true });

  const { usersOnDepartmentWithAwards, isLoadingUsersOnDepartmentWithAwards } =
    useUserAdmin(typeOfUser?.dept.id, { subdepts: true });

  return {
    isLoadingColAwardsActivRoot,
    isLoadingUsersOnDepartmentWithAwards,
    isLoadingColAwardsOnDept,
  };
};
