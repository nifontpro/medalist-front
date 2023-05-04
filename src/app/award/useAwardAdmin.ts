import { awardApi } from '@/api/award/award.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { toastError } from '@/utils/toast-error';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

export const useAwardAdmin = (id?: string) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { data: singleAward, isLoading: isLoadingSingleAward } =
    awardApi.useGetByIdQuery(
      {
        authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
        awardId: id ? Number(id) : 0,
      },
      {
        skip: !typeOfUser && !id,
      }
    );

  const { data: awardsOnDepartment, isLoading: isLoadingAwardsOnDept } =
    awardApi.useGetByDeptQuery(
      {
        authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
        deptId: Number(id),
        orders: undefined,
      },
      {
        skip: !typeOfUser,
      }
    );

  const [deleteAward] = awardApi.useDeleteMutation();

  return useMemo(() => {
    let isError = false;
    const deleteAwardAsync = async (id: number, authId: number) => {
      await deleteAward({ authId, awardId: id })
        .unwrap()
        .then((res) => {
          if (res.success == false) {
            isError = true;
            errorMessageParse(res.errors);
          }
        })
        .catch((e) => {
          isError = true;
          toastError(e, 'Ошибка при удалении награды');
        });
      if (!isError) {
        toast.success('Награда успешно удалена');
      }
    };

    return {
      deleteAwardAsync,
      singleAward,
      isLoadingSingleAward,
      awardsOnDepartment,
      isLoadingAwardsOnDept,
    };
  }, [
    deleteAward,
    singleAward,
    isLoadingSingleAward,
    awardsOnDepartment,
    isLoadingAwardsOnDept,
  ]);
};
