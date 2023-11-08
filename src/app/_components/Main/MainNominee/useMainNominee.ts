import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { awardApi } from '@/api/award/award.api';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export const useMainNominee = (deptId?: string) => {
  const { push } = useRouter();

  const switcher = useAppSelector((state) => state.switcher);

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // Получить награды в отделе
  const {
    data: awardsOnDepartment,
    isLoading: isLoadingAwardsOnDept,
    isFetching: isFetchingUsersOnDepartment,
  } = awardApi.useGetByDeptQuery(
    {
      authId: typeOfUser?.id!,
      deptId: Number(deptId ? deptId : typeOfUser?.dept.id),
      withUsers: false,
      state: 'NOMINEE',
      baseRequest: {
        // subdepts: switcher,
        subdepts: true,
        orders: [{ field: 'endDate', direction: 'ASC' }],
      },
    },
    {
      skip: !typeOfUser,
      refetchOnFocus: true,
    }
  );

  let minEndDateNominee = useMemo(
    () =>
      awardsOnDepartment &&
      awardsOnDepartment.data &&
      awardsOnDepartment?.data[0],
    [awardsOnDepartment]
  );

  const defaultColorImg =
    awardsOnDepartment &&
    awardsOnDepartment.data?.length &&
    awardsOnDepartment.data?.length > 0;

  // Получить награду по id
  const { data: nominee, isLoading: isLoadingSingleNominee } =
    awardApi.useGetByIdQuery(
      {
        authId: typeOfUser?.id!,
        awardId: Number(minEndDateNominee?.id),
      },
      {
        skip: !minEndDateNominee || !typeOfUser,
      }
    );

  let lastNominee = nominee?.data?.award;
  let currentDate = +new Date();
  return {
    push,
    isLoadingSingleNominee,
    lastNominee,
    defaultColorImg,
    currentDate,
  };
};
