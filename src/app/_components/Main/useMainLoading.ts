import { awardApi } from '@/api/award/award.api';
import { userApi } from '@/api/user/user.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';

export const useMainLoading = () => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // Получить колличество наград в отделе
  const { data: colAwardsOnDepartment, isLoading: isLoadingColAwardsOnDept } =
    awardApi.useGetAwardCountQuery(
      {
        authId: typeOfUser?.id!,
        deptId: typeOfUser?.dept.id,
        baseRequest: { subdepts: true },
      },
      {
        skip: !typeOfUser,
      }
    );

  // С КОРНЕВОГО ОТДЕЛА ! Получение количества активных награждений (наград у пользователей) разных типов в компании
  const { data: colAwardsActivRoot, isLoading: isLoadingColAwardsActivRoot } =
    awardApi.useGetActivCountRootQuery(
      {
        authId: typeOfUser?.id!,
        deptId: typeOfUser?.dept.id,
        baseRequest: { subdepts: true },
      },
      {
        skip: !typeOfUser,
      }
    );

  // Получить сотрудников отдела/подотделов с наградами (через активность типа AWARD)
  const {
    data: usersOnDepartmentWithAwards,
    isLoading: isLoadingUsersOnDepartmentWithAwards,
  } = userApi.useGetUsersWithAwardCountQuery(
    {
      authId: typeOfUser?.id!,
      deptId: typeOfUser?.dept.id,
      baseRequest: { subdepts: true },
    },
    {
      skip: !typeOfUser,
    }
  );

  return {
    isLoadingColAwardsActivRoot,
    isLoadingUsersOnDepartmentWithAwards,
    isLoadingColAwardsOnDept,
  };
};
