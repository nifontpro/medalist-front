import { eventApi } from '@/api/event/event.api';
import { AddDeptEventRequest } from '@/api/event/request/AddDeptEventRequest';
import { AddUserEventRequest } from '@/api/event/request/AddUserEventRequest';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

export const useModalWindowWithAddEvent = (
  setVisibleModal: Dispatch<SetStateAction<boolean>>,
  forWhat: 'User' | 'Dept',
  id: string,
  date: number | undefined
) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const [createDeptEvent, createDeptEventInfo] =
    eventApi.useAddDeptEventMutation();
  const [createUserEvent, createUserEventInfo] =
    eventApi.useAddUserEventMutation();

  const instanceOfUser = useCallback(
    (object: any): object is AddUserEventRequest => {
      return true;
    },
    []
  );

  const instanceOfDept = useCallback(
    (object: any): object is AddDeptEventRequest => {
      return true;
    },
    []
  );

  const handleCancel = useCallback(() => {
    setVisibleModal(false);
  }, [setVisibleModal]);

  const onSubmit: SubmitHandler<AddUserEventRequest | AddDeptEventRequest> =
    useCallback(
      async (data) => {
        let isError: boolean = false;

        if (typeOfUser && typeOfUser.id && date) {
          if (forWhat === 'User' && instanceOfUser(data)) {
            createUserEvent({
              authId: typeOfUser.id,
              userId: Number(id),
              eventDate: date,
              eventName: data.eventName,
            })
              .unwrap()
              .then((res) => {
                if (res.success == false) {
                  errorMessageParse(res.errors);
                  isError = true;
                }
              })
              .catch(() => {
                isError = true;
                toast.error(`Ошибка создания события`);
              });
            setVisibleModal(false);
            if (!isError) {
              toast.success('Событие создано');
            }
          }
          if (forWhat === 'Dept' && instanceOfDept(data)) {
            createDeptEvent({
              authId: typeOfUser.id,
              deptId: Number(id),
              eventDate: date,
              eventName: data.eventName,
            })
              .unwrap()
              .then((res) => {
                if (res.success == false) {
                  errorMessageParse(res.errors);
                  isError = true;
                }
              })
              .catch(() => {
                isError = true;
                toast.error(`Ошибка создания события`);
              });
            setVisibleModal(false);
            if (!isError) {
              toast.success('Событие создано');
            }
          }
        }
      },
      [
        createDeptEvent,
        createUserEvent,
        date,
        forWhat,
        id,
        instanceOfDept,
        instanceOfUser,
        setVisibleModal,
        typeOfUser,
      ]
    );

  return {
    onSubmit,
    handleCancel,
    createDeptEvent,
    createDeptEventInfo,
    createUserEvent,
    createUserEventInfo,
  };
};
