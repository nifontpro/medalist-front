import { userApi } from '@/api/user/user.api';
import { BaseRequest } from '@/types/base/BaseRequest';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { toastError } from '@/utils/toast-error';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { eventApi } from './event.api';

export const useEventAdmin = (id?: string, baseRequest?: BaseRequest) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // /**
  //  * Получить все события сотрудников и отделов
  //  * с текущего дня года по кругу.
  //  * Пагинация.
  //  * Сортировка внутренняя (По дню от текущего и названию сущности).
  //  */
  // const { data: allEvent, isLoading: isLoadingAllEvent } =
  //   eventApi.useGetAllQuery(
  //     {
  //       authId: typeOfUser?.id!,
  //       deptId: Number(id),
  //       baseRequest: baseRequest ? baseRequest : undefined,
  //     },
  //     {
  //       skip: !id || !typeOfUser,
  //     }
  //   );

  // // Получить все события отдела
  // const { data: eventsDepartment, isLoading: isLoadingEventsDepartment } =
  //   eventApi.useGetByDeptQuery(
  //     {
  //       authId: typeOfUser?.id!,
  //       deptId: Number(id),
  //     },
  //     {
  //       skip: !id || !typeOfUser,
  //     }
  //   );

  // // Получить все события пользователя
  // const { data: eventsUser, isLoading: isLoadingEventsUser } =
  //   eventApi.useGetByUserQuery(
  //     {
  //       authId: typeOfUser?.id!,
  //       userId: Number(id),
  //     },
  //     {
  //       skip: !id || !typeOfUser,
  //     }
  //   );

  const [deleteUserEvent] = eventApi.useDeleteByUserMutation();
  const [deleteDepartmentEvent] = eventApi.useDeleteByDeptMutation();

  const deleteUserEventAsync = useCallback(
    async (id: number) => {
      let isError = false;
      if (typeOfUser && typeOfUser.id)
        if (!isError) {
          await deleteUserEvent({ authId: typeOfUser?.id, eventId: id })
            .unwrap()
            .then((res) => {
              if (res.success == false) {
                isError = true;
                errorMessageParse(res.errors);
              }
            })
            .catch((e) => {
              isError = true;
              toastError(e, 'Ошибка при удалении события');
            });
          toast.success('Событие успешно удалено');
        }
    },
    [deleteUserEvent, typeOfUser]
  );

  const deleteDepartmentEventAsync = useCallback(
    async (id: number) => {
      let isError = false;
      if (typeOfUser && typeOfUser.id)
        if (!isError) {
          await deleteDepartmentEvent({ authId: typeOfUser?.id, eventId: id })
            .unwrap()
            .then((res) => {
              if (res.success == false) {
                isError = true;
                errorMessageParse(res.errors);
              }
            })
            .catch((e) => {
              isError = true;
              toastError(e, 'Ошибка при удалении события');
            });
          toast.success('Событие успешно удалено');
        }
    },
    [deleteDepartmentEvent, typeOfUser]
  );

  return {
    deleteUserEventAsync,
    deleteDepartmentEventAsync,
    // allEvent,
    // isLoadingAllEvent,
    // eventsDepartment,
    // isLoadingEventsDepartment,
    // eventsUser,
    // isLoadingEventsUser,
  };
};
