import { awardApi } from '@/api/award/award.api';
import { ActionType } from '@/domain/model/award/Activity';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

export const useModalWindowWithAddAwards = (
  setVisibleModal: Dispatch<SetStateAction<boolean>>,
  userId: string,
  awardState: ActionType,
  setSearchValue: Dispatch<SetStateAction<string>>
) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const [arrChoiceAward, setArrChoiceAward] = useState<string[]>([]);
  const [reward] = awardApi.useSendActionMutation();

  return useMemo(() => {
    const handleCancel = () => {
      setArrChoiceAward([]);
      setVisibleModal(false);
      setSearchValue('');
    };

    const onSubmitNominee = async () => {
      let isError: boolean = false;

      if (arrChoiceAward.length == 0) {
        toast.error(`Выберите сотрудников для номинации`);
      }

      if (arrChoiceAward != undefined && arrChoiceAward?.length > 0) {
        arrChoiceAward.forEach((award) => {
          if (typeOfUser && typeOfUser.id)
            reward({
              authId: typeOfUser.id,
              awardId: Number(award),
              userId: Number(userId),
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
                toast.error(`Ошибка награждения ${award}`);
              });
        });

        if (!isError) {
          toast.success('Награждение успешно');
          setArrChoiceAward([]);
          setVisibleModal(false);
          setSearchValue('');
        }
      }
    };
    return { arrChoiceAward, setArrChoiceAward, handleCancel, onSubmitNominee };
  }, [
    arrChoiceAward,
    awardState,
    reward,
    setSearchValue,
    setVisibleModal,
    typeOfUser,
    userId,
  ]);
};
