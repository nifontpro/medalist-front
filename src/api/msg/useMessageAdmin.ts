import { userApi } from '@/api/user/user.api';
import { BaseRequest } from '@/types/base/BaseRequest';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { toastError } from '@/utils/toast-error';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { messageApi } from './message.api';
import { UserMsg } from '@/types/msg/UserMsg';

export const useMessageAdmin = (id?: string, baseRequest?: BaseRequest) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  /**
   *Получить свои сообщения
   */
  const { data: myMessage, isLoading: isLoadingMyMessage } =
    messageApi.useGetMessagesQuery(
      {
        authId: typeOfUser && typeOfUser.id ? typeOfUser.id : 0,
      },
      {
        skip: !typeOfUser,
      }
    );

  const [deleteEvent, deleteEventInfo] = messageApi.useDeleteMessageMutation();

  return useMemo(() => {
    const deleteEventAsync = async (id: number) => {
      let isError = false;
      if (typeOfUser && typeOfUser.id) {
        await deleteEvent({ authId: typeOfUser?.id, messageId: id })
          .unwrap()
          .then((res) => {
            if (res.success == false) {
              isError = true;
              errorMessageParse(res.errors);
            }
          })
          .catch((e) => {
            isError = true;
            toastError(e, 'Ошибка при удалении');
          });
        if (!isError) {
          toast.success('Успешно удалено');
        }
      }
    };

    const deleteAllEventsAsync = async (data: UserMsg[] | undefined) => {
      let isError = false;
      if (data) {
        data.forEach(async (message) => {
          if (typeOfUser && typeOfUser.id) {
            await deleteEvent({ authId: typeOfUser?.id, messageId: message.id })
              .unwrap()
              .then((res) => {
                if (res.success == false) {
                  isError = true;
                  errorMessageParse(res.errors);
                }
              })
              .catch((e) => {
                isError = true;
                toastError(e, 'Ошибка при удалении');
              });
          }
        });
        if (!isError) {
          toast.success('Успешно удалены');
        }
      }
    };

    return {
      myMessage,
      isLoadingMyMessage,
      deleteEventAsync,
      deleteEventInfo,
      deleteAllEventsAsync,
    };
  }, [myMessage, isLoadingMyMessage, deleteEvent, typeOfUser, deleteEventInfo]);
};
