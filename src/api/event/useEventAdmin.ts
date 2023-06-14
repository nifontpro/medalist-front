import { userApi } from '@/api/user/user.api';
import { BaseRequest } from '@/domain/model/base/BaseRequest';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { toastError } from '@/utils/toast-error';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { eventApi } from './event.api';

export const useEventAdmin = (id?: string, baseRequest?: BaseRequest) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  /**
   * Получить все события сотрудников и отделов
   * с текущего дня года по кругу.
   * Пагинация.
   * Сортировка внутренняя (По дню от текущего и названию сущности).
   */
  const { data: allEvent, isLoading: isLoadingAllEvent } =
    eventApi.useGetAllQuery(
      {
        authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
        deptId: Number(id),
        baseRequest: baseRequest ? baseRequest : undefined,
      },
      {
        skip: !typeOfUser,
      }
    );

  // Получить все события отдела
  const { data: eventsDepartment, isLoading: isLoadingEventsDepartment } =
    eventApi.useGetByDeptQuery(
      {
        authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
        deptId: Number(id),
      },
      {
        skip: !typeOfUser,
      }
    );

  // Получить все события пользователя
  const { data: eventsUser, isLoading: isLoadingEventsUser } =
    eventApi.useGetByUserQuery(
      {
        authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
        userId: Number(id),
      },
      {
        skip: !typeOfUser,
      }
    );

  const [deleteUserEvent] = eventApi.useDeleteByUserMutation();
  const [deleteDepartmentEvent] = eventApi.useDeleteByDeptMutation();

  return useMemo(() => {
    const deleteUserEventAsync = async (id: number) => {
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
    };

    const deleteDepartmentEventAsync = async (id: number) => {
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
    };

    return {
      allEvent,
      isLoadingAllEvent,
      deleteUserEventAsync,
      deleteDepartmentEventAsync,
      eventsDepartment,
      isLoadingEventsDepartment,
      eventsUser,
      isLoadingEventsUser,
    };
  }, [
    allEvent,
    deleteDepartmentEvent,
    deleteUserEvent,
    isLoadingAllEvent,
    typeOfUser,
    eventsDepartment,
    isLoadingEventsDepartment,
    eventsUser,
    isLoadingEventsUser,
  ]);
};
