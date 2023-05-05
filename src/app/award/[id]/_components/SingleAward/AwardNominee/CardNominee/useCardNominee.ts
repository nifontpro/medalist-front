import { awardApi } from '@/api/award/award.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

export const useCardNominee = (userId: number | undefined, awardId: number) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const [reward] = awardApi.useSendActionMutation();

  const { push } = useRouter();

  return useMemo(() => {
    const handleReward = async () => {
      let isError = false;

      if (userId && typeOfUser && typeOfUser.id) {
        await reward({
          authId: typeOfUser.id,
          awardId: awardId,
          userId: userId,
          actionType: 'AWARD',
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
            toast.error('Ошибка награждения');
          });

        if (!isError) {
          toast.success('Награждение успешно');
        }
      }
    };

    const handleRemove = async () => {
      let isError = false;

      if (userId && typeOfUser && typeOfUser.id) {
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
      handleReward,
      handleRemove,
      typeOfUser
    };
  }, [userId, reward, awardId, typeOfUser]);
};
