import { awardApi } from '@/api/award/award.api';
import { useAwardAdmin } from '@/app/award/useAwardAdmin';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

export const useCardNominee = (userId: number | undefined, awardId: number | undefined) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const [reward] = awardApi.useSendActionMutation();

  const { userRewardAsync } = useAwardAdmin();

  return useMemo(() => {
    const handleRemove = async () => {
      let isError = false;

      if (userId && typeOfUser && typeOfUser.id && awardId) {
        await reward({
          authId: typeOfUser.id,
          awardId: awardId,
          userId: userId,
          actionType: 'DELETE',
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
            toast.error('Ошибка удаления');
          });

        if (!isError) {
          toast.success('Удаление успешно');
        }
      }
    };

    return {
      userRewardAsync,
      handleRemove,
      typeOfUser
    };
  }, [userId, reward, awardId, typeOfUser, userRewardAsync]);
};
