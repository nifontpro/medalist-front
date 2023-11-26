import { awardApi } from '@/api/award/award.api';
import { ActionType } from '@/types/award/Activity';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-toastify';

export const useModalWindowWithAddAwards = (
  arrChoiceAward: string[],
  setArrChoiceAward: Dispatch<SetStateAction<string[]>>,
  setVisibleModal: Dispatch<SetStateAction<boolean>>,
  userId: string,
  awardState: ActionType,
  setSearchValue: Dispatch<SetStateAction<string>>
) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const [reward] = awardApi.useSendActionMutation();

  const handleCancel = useCallback(() => {
    setArrChoiceAward([]);
    setVisibleModal(false);
    setSearchValue('');
  }, [setSearchValue, setVisibleModal]);

  const onSubmitNominee = useCallback(async () => {
    let isError: boolean = false;

    if (arrChoiceAward.length == 0) {
      toast.error(
        awardState === 'AWARD'
          ? `Выберите медаль для награждения`
          : `Выберите медаль для номинации`
      );
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
  }, [
    arrChoiceAward,
    awardState,
    reward,
    setSearchValue,
    setVisibleModal,
    typeOfUser,
    userId,
  ]);

  return { arrChoiceAward, setArrChoiceAward, handleCancel, onSubmitNominee };
};
