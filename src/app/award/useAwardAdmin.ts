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

  //   const [deleteUser] = awardApi.useDeleteMutation();

  return useMemo(() => {
    let isError = false;

    const deleteUserAsync = async (id: number, authId: number) => {
        console.log('Delete award')
    //   await deleteUser({ authId, userId: id })
    //     .unwrap()
    //     .then((res) => {
    //       if (res.success == false) {
    //         isError = true;
    //         errorMessageParse(res.errors);
    //       }
    //     })
    //     .catch((e) => {
    //       isError = true;
    //       toastError(e, 'Ошибка при удалении профиля сотрудника');
    //     });
    //   if (!isError) {
    //     toast.success('Профиль сотрудника успешно удален');
    //   }
    };

    return {
      deleteUserAsync,
      singleAward,
      isLoadingSingleAward,
      awardsOnDepartment,
      isLoadingAwardsOnDept,
    };
  }, [
    // deleteUser,
    singleAward,
    isLoadingSingleAward,
    awardsOnDepartment,
    isLoadingAwardsOnDept,
  ]);
};
