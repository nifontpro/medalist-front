import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import { eventApi } from '@/api/event/event.api';
import { useUserAdmin } from '@/api/user/useUserAdmin';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';

export const useMainLoading = () => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

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
