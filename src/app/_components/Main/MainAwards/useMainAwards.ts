import { awardApi } from '@/api/award/award.api';
import { userApi } from '@/api/user/user.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export const useMainAwards = (deptId: string | undefined) => {
  const { push } = useRouter();

  const switcher = useAppSelector((state) => state.switcher);

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // Получить колличество наград в отделе
  const { data: colAwardsOnDepartment, isLoading: isLoadingColAwardsOnDept } =
    awardApi.useGetAwardCountQuery(
      {
        authId: typeOfUser?.id!,
        deptId: Number(deptId ? deptId : typeOfUser?.dept.id),
        baseRequest: {
          // subdepts: switcher
          subdepts: true,
        },
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
        deptId: Number(deptId ? deptId : typeOfUser?.dept.id),
        baseRequest: {
          // subdepts: switcher
          subdepts: true,
        },
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
      deptId: Number(deptId ? deptId : typeOfUser?.dept.id),
      baseRequest: {
        // subdepts: switcher
        subdepts: true,
      },
    },
    {
      skip: !typeOfUser,
    }
  );

  let countAll = useMemo(
    () =>
      colAwardsOnDepartment &&
      colAwardsOnDepartment.data &&
      colAwardsOnDepartment?.data?.finish +
        colAwardsOnDepartment?.data?.nominee +
        colAwardsOnDepartment?.data?.future +
        colAwardsOnDepartment?.data?.error,
    [colAwardsOnDepartment]
  );

  let countUserWithAwardAndWithout = useMemo(
    () => usersOnDepartmentWithAwards?.data?.length,
    [usersOnDepartmentWithAwards]
  );

  let countUserWithAward = useMemo(
    () =>
      usersOnDepartmentWithAwards?.data?.filter((user) => user.awardCount > 0)
        .length,
    [usersOnDepartmentWithAwards]
  );

  let countUserWithAwardPercent = useMemo(
    () =>
      countUserWithAward &&
      countUserWithAwardAndWithout &&
      Math.ceil((countUserWithAward * 100) / countUserWithAwardAndWithout),
    [countUserWithAward, countUserWithAwardAndWithout]
  );

  let numberIsNaN = useMemo(
    () => Number.isNaN(countUserWithAwardPercent),
    [countUserWithAwardPercent]
  );

  return {
    push,
    countUserWithAwardPercent,
    countUserWithAward,
    countAll,
    typeOfUser,
    colAwardsActivRoot,
    isLoadingColAwardsActivRoot,
    numberIsNaN,
  };
};
