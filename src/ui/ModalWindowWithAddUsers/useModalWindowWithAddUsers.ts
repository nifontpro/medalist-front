import { awardApi } from '@/api/award/award.api';
import { ActionType } from '@/domain/model/award/Activity';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

export const useModalWindowWithAddUsers = (
  setVisibleModal: Dispatch<SetStateAction<boolean>>,
  awardId: string,
  awardState: ActionType
) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const [reward] = awardApi.useSendActionMutation();

  const [arrChoiceUser, setArrChoiceUser] = useState<string[]>([]);

  return useMemo(() => {
    const handleCancel = () => {
      setArrChoiceUser([]);
      setVisibleModal(false);
    };

    const onSubmitNominee = async () => {
      let isError: boolean = false;

      if (arrChoiceUser.length == 0) {
        toast.error(`Выберите сотрудников для номинации`);
      }

      if (arrChoiceUser != undefined && arrChoiceUser?.length > 0) {
        arrChoiceUser.forEach((user) => {
          if (typeOfUser && typeOfUser.id)
            reward({
              authId: typeOfUser.id,
              awardId: Number(awardId),
              userId: Number(user),
              actionType: awardState,
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
                toast.error(`Ошибка награждения ${user}`);
              });
        });
        if (!isError) {
          setArrChoiceUser([]);
          setVisibleModal(false);
          toast.success('Награждение успешно');
        }
      }
    };
    return {
      arrChoiceUser,
      setArrChoiceUser,
      onSubmitNominee,
      handleCancel,
    };
  }, [
    arrChoiceUser,
    setArrChoiceUser,
    awardId,
    awardState,
    reward,
    setVisibleModal,
    typeOfUser,
  ]);
};
