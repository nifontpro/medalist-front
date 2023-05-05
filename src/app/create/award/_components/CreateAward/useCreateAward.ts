import { SubmitHandler, UseFormReset, UseFormSetValue } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { toastError } from '@/utils/toast-error';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { CreateAwardRequest } from '@/api/award/request/CreateAwardRequest';
import dayjs from 'dayjs';
import { convertCorrectDataForUnix } from '@/utils/convertCorrectDataForUnix';
import { awardApi } from '@/api/award/award.api';
import { resetDate } from '@/store/features/awardCreateDate/awardCreateDate.slice';

export const useCreateAward = (
  setValue: UseFormSetValue<CreateAwardRequest>,
  reset: UseFormReset<CreateAwardRequest>,
  // images: IGalleryObject | undefined,
  // companyId?: string,
  arrChoiceUser?: string[]
) => {
  const dispatch = useAppDispatch();
  const { back } = useRouter();
  const searchParams = useSearchParams();
  const deptId = Number(searchParams.get('deptId'));
  const [createAward] = awardApi.useCreateMutation();
  const [rewardUser] = awardApi.useSendActionMutation();

  const { typeOfUser } = useAppSelector((state) => state.userSelection);
  const startDateSelect = useAppSelector(
    (state) => state.dataCreateAward.startDate
  );
  const endDateSelect = useAppSelector(
    (state) => state.dataCreateAward.endDate
  );

  useEffect(() => {
    if (deptId && typeOfUser && typeOfUser.id) {
      dispatch(resetDate());
      setValue('deptId', deptId);
      setValue('authId', typeOfUser.id);
    }
  }, [setValue, deptId, typeOfUser, dispatch]);

  return useMemo(() => {
    const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      back();
    };

    const onSubmitReward: SubmitHandler<CreateAwardRequest> = async (data) => {
      console.log('AWARD');

      data.endDate = Math.floor(new Date().getTime());
      data.startDate = Math.floor(new Date().getTime());

      let isError = false;
      data.type = 'SIMPLE';

      console.log(data);

      if (typeOfUser && typeOfUser.id && deptId) {
        await createAward({ ...data })
          .unwrap()
          .then((res) => {
            if (res.success == false) {
              errorMessageParse(res.errors);
              isError = true;
            }
            // if (images) {
            //   await setImage({ awardId: award.id, galleryItemId: images.id })
            //     .unwrap()
            //     .catch(() => {
            //       isError = true;
            //       toast.error('Ошибка добавления фото награды');
            //     });
            // }
            if (arrChoiceUser != undefined && arrChoiceUser?.length > 0) {
              arrChoiceUser.forEach((user) => {
                if (typeOfUser && typeOfUser.id && res.data)
                  rewardUser({
                    authId: typeOfUser.id,
                    awardId: res.data?.award.id,
                    userId: Number(user),
                    actionType: 'AWARD',
                  })
                    .unwrap()
                    .then((res) => {
                      if (res.success == false) {
                        errorMessageParse(res.errors);
                        isError = true;
                      }
                    })
                    .catch((e) => {
                      isError = true;
                      toastError(e, 'Ошибка награждения');
                    });
              });
            }
          })
          .catch((e) => {
            isError = true;
            toastError(e, 'Ошибка создания награды');
          });
      }
      if (!isError) {
        back();
        toast.success('Награда успешно создана');
      }
      reset();
    };

    const onSubmitNominee: SubmitHandler<CreateAwardRequest> = async (data) => {
      data.type = 'PERIOD';
      let isError = false;

      let currentDate = Math.floor(new Date().getTime());

      if (endDateSelect.length > 0) {
        data.endDate =
          dayjs(dayjs(convertCorrectDataForUnix(endDateSelect))).unix() * 1000;
      }
      if (startDateSelect.length > 0) {
        data.startDate =
          dayjs(dayjs(convertCorrectDataForUnix(startDateSelect))).unix() *
          1000;
      }
      if (data.endDate == undefined) {
        isError = true;
        toast.error('Необходимо указать дату окончания!');
      }
      if (data.endDate != undefined && data.startDate == undefined) {
        data.startDate = Math.floor(new Date().getTime());
        data.endDate =
          dayjs(dayjs(convertCorrectDataForUnix(endDateSelect))).unix() * 1000;
      }
      if (data.endDate != undefined && data.startDate != undefined) {
        if (data.endDate < data.startDate) {
          isError = true;
          toast.error('Дата начала больше чем дата окончания');
        }
      }

      console.log(data);

      if (
        typeOfUser &&
        typeOfUser.id &&
        deptId &&
        data.endDate != undefined &&
        data.startDate != undefined &&
        data.endDate > data.startDate
      ) {
        await createAward({ ...data })
          .unwrap()
          .then((res) => {
            if (res.success == false) {
              errorMessageParse(res.errors);
              isError = true;
            }

            //   if (images) {
            //     await setImage({ awardId: award.id, galleryItemId: images.id })
            //       .unwrap()
            //       .catch(() => {
            //         isError = true;
            //         toast.error('Ошибка добавления фото награды');
            //       });
            //   }

            if (arrChoiceUser != undefined && arrChoiceUser?.length > 0) {
              arrChoiceUser.forEach((user) => {
                if (typeOfUser && typeOfUser.id && res.data)
                  rewardUser({
                    authId: typeOfUser.id,
                    awardId: res.data?.award.id,
                    userId: Number(user),
                    actionType: 'NOMINEE',
                  })
                    .unwrap()
                    .then((res) => {
                      if (res.success == false) {
                        errorMessageParse(res.errors);
                        isError = true;
                      }
                    })
                    .catch((e) => {
                      isError = true;
                      toastError(e, 'Ошибка награждения');
                    });
              });
            }
          })
          .catch((e) => {
            isError = true;
            toastError(e, 'Ошибка создания награды');
          });
      }
      if (!isError) {
        toast.success('Награда успешно создана');
        back();
      }
    };
    return {
      onSubmitReward,
      onSubmitNominee,
      back,
      handleClick,
      dispatch,
      deptId,
    };
  }, [
    back,
    dispatch,
    startDateSelect,
    endDateSelect,
    rewardUser,
    deptId,
    reset,
    typeOfUser,
    arrChoiceUser,
    createAward,
  ]);
};
