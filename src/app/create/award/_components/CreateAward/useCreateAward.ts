import { SubmitHandler, UseFormReset, UseFormSetValue } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { toastError } from '@/utils/toast-error';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { CreateAwardRequest } from '@/api/award/request/CreateAwardRequest';
import dayjs from 'dayjs';
import { convertCorrectDataForUnix } from '@/utils/convertCorrectDataForUnix';
import { awardApi } from '@/api/award/award.api';
import { resetDate } from '@/store/features/awardCreateDate/awardCreateDate.slice';
import { RootState } from '@/store/storage/store';
import { GalleryItem } from '@/domain/model/gallery/item';

export const useCreateAward = (
  setValue: UseFormSetValue<CreateAwardRequest>,
  reset: UseFormReset<CreateAwardRequest>,
  arrChoiceUser?: string[]
) => {
  const dispatch = useAppDispatch();
  const { back } = useRouter();
  const searchParams = useSearchParams();
  const deptId = Number(searchParams.get('deptId'));
  const [createAward, createAwardInfo] = awardApi.useCreateMutation();
  const [rewardUser, rewardUserInfo] = awardApi.useSendActionMutation();
  const [setImageGallery, setImageGalleryInfo] =
    awardApi.useGalleryImageAddMutation();
  const [setImage, setImageInfo] = awardApi.useImageAddMutation();

  const [imagesGallery, setImagesGallery] = useState<GalleryItem | undefined>(
    undefined
  ); // Для предпросмотра и выбора из галлереи
  const [imageFile, setImagesFile] = useState<File>(); // Для загрузки пользовательского изображения

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const startDateSelect = useAppSelector(
    (state: RootState) => state.dataCreateAward.startDate
  );
  const endDateSelect = useAppSelector(
    (state: RootState) => state.dataCreateAward.endDate
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

    //Выдать сразу и закрыть
    // const onSubmitReward: SubmitHandler<CreateAwardRequest> = async (data) => {
    //   data.endDate = Math.floor(new Date().getTime());
    //   data.startDate = Math.floor(new Date().getTime());

    //   let isError = false;
    //   data.type = 'SIMPLE';

    //   if (typeOfUser && typeOfUser.id && deptId) {
    //     await createAward({ ...data })
    //       .unwrap()
    //       .then(async (res) => {
    //         //Если ошибка
    //         if (res.success == false) {
    //           errorMessageParse(res.errors);
    //           isError = true;
    //         }

    //         //Награждение тех кого выбрали
    //         arrChoiceUser!.forEach(async (user) => {
    //           if (typeOfUser && typeOfUser.id && res.data) {
    //             await rewardUser({
    //               authId: typeOfUser.id,
    //               awardId: res.data?.award.id,
    //               userId: Number(user),
    //               actionType: 'AWARD',
    //             })
    //               .unwrap()
    //               .then((res) => {
    //                 if (res.success == false) {
    //                   errorMessageParse(res.errors);
    //                   isError = true;
    //                 }
    //               })
    //               .catch((e) => {
    //                 isError = true;
    //                 toastError(e, 'Ошибка награждения');
    //               });
    //           }
    //         });

    //         //Добавления фото из галлереи
    //         if (
    //           imagesGallery &&
    //           imagesGallery.id !== -1 &&
    //           res.data &&
    //           typeOfUser &&
    //           typeOfUser.id
    //         ) {
    //           await setImageGallery({
    //             awardId: res.data?.award.id,
    //             authId: typeOfUser.id,
    //             itemId: imagesGallery.id,
    //           })
    //             .unwrap()
    //             .then(async (res) => {
    //               if (res.success == false) {
    //                 errorMessageParse(res.errors);
    //                 isError = true;
    //               }
    //             })
    //             .catch(() => {
    //               isError = true;
    //               toast.error('Ошибка добавления фото награды');
    //             });
    //         }

    //         //Добавления загруженного фото
    //         if (
    //           imagesGallery &&
    //           imagesGallery.id === -1 &&
    //           imageFile &&
    //           res.data &&
    //           typeOfUser &&
    //           typeOfUser.id
    //         ) {
    //           const file = new FormData();
    //           file.append('file', imageFile);
    //           file.append('authId', typeOfUser.id.toString());
    //           file.append('awardId', res.data.award.id.toString());

    //           await setImage(file)
    //             .unwrap()
    //             .then((res) => {
    //               if (res.success == false) {
    //                 errorMessageParse(res.errors);
    //                 isError = true;
    //               }
    //             })
    //             .catch(() => {
    //               isError = true;
    //               toast.error('Ошибка добавления фотографии');
    //             });
    //           if (!isError) {
    //             toast.success('Фото успешно добавлено');
    //           }
    //         }
    //       })
    //       .catch((e) => {
    //         isError = true;
    //         toastError(e, 'Ошибка создания награды');
    //       })
    //       .finally(() => {
    //         if (!isError && rewardUserInfo.status !== 'pending') {
    //           back();
    //           toast.success('Награда успешно создана');
    //           reset();
    //         }
    //       });
    //   }
    // };
    const onSubmitReward: SubmitHandler<CreateAwardRequest> = async (data) => {
      data.endDate = Math.floor(new Date().getTime());
      data.startDate = Math.floor(new Date().getTime());

      let isError = false;
      data.type = 'SIMPLE';

      const file = new FormData();

      if (typeOfUser && typeOfUser.id && deptId) {
        const createAwardPromise = createAward({ ...data }).unwrap();
        const resCreateAwardPromise = await createAwardPromise;

        //Добавления фото из галлереи
        const setImageGalleryPromise =
          imagesGallery &&
          imagesGallery.id !== -1 &&
          resCreateAwardPromise &&
          resCreateAwardPromise.data
            ? setImageGallery({
                awardId: resCreateAwardPromise.data?.award.id,
                authId: typeOfUser.id,
                itemId: imagesGallery.id,
              }).unwrap()
            : null;

        //Добавления загруженного фото
        if (
          imagesGallery &&
          imagesGallery.id === -1 &&
          imageFile &&
          typeOfUser &&
          typeOfUser.id &&
          resCreateAwardPromise &&
          resCreateAwardPromise.data
        ) {
          file.append('file', imageFile);
          file.append('authId', typeOfUser.id.toString());
          file.append(
            'awardId',
            resCreateAwardPromise.data.award.id.toString()
          );
        }
        const setImagePromise =
          imagesGallery &&
          imageFile &&
          imagesGallery.id === -1 &&
          typeOfUser &&
          typeOfUser.id
            ? setImage(file).unwrap()
            : null;

        //Номинирование тех кого выбрали
        const rewardUserPromises = arrChoiceUser!.map(async (user) => {
          if (resCreateAwardPromise && resCreateAwardPromise.data)
            return rewardUser({
              authId: Number(typeOfUser.id),
              awardId: resCreateAwardPromise.data?.award.id,
              userId: Number(user),
              actionType: 'AWARD',
            }).unwrap();
        });

        await Promise.all([
          createAwardPromise,
          setImageGalleryPromise,
          setImagePromise,
          ...rewardUserPromises,
        ])
          .then((resArray) => {
            // console.log(resArray);
            for (let i = 0; i < resArray.length; i++) {
              if (resArray[i] !== null) {
                if (resArray[i]!.success == false) {
                  errorMessageParse(resArray[i]?.errors);
                  isError = true;
                  break;
                }
              }
            }
          })
          .catch((e: Error) => {
            isError = true;
            toastError(e.message, 'Ошибка награждения');
          })
          .finally(() => {
            if (
              !isError &&
              rewardUserInfo.status !== 'pending' &&
              resCreateAwardPromise.success
            ) {
              back();
              toast.success('Награда успешно создана');
              // reset();
            }
          });
      }
    };

    //Номинировать
    const onSubmitNominee: SubmitHandler<CreateAwardRequest> = async (data) => {
      data.type = 'PERIOD';
      let isError = false;
      const file = new FormData();

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

      if (
        typeOfUser &&
        typeOfUser.id &&
        deptId &&
        data.endDate != undefined &&
        data.startDate != undefined &&
        data.endDate > data.startDate
      ) {
        const createAwardPromise = createAward({ ...data }).unwrap();
        const resCreateAwardPromise = await createAwardPromise;

        //Добавления фото из галлереи
        const setImageGalleryPromise =
          imagesGallery &&
          imagesGallery.id !== -1 &&
          resCreateAwardPromise &&
          resCreateAwardPromise.data
            ? setImageGallery({
                awardId: resCreateAwardPromise.data?.award.id,
                authId: typeOfUser.id,
                itemId: imagesGallery.id,
              }).unwrap()
            : null;

        //Добавления загруженного фото
        if (
          imagesGallery &&
          imagesGallery.id === -1 &&
          imageFile &&
          typeOfUser &&
          typeOfUser.id &&
          resCreateAwardPromise &&
          resCreateAwardPromise.data
        ) {
          file.append('file', imageFile);
          file.append('authId', typeOfUser.id.toString());
          file.append(
            'awardId',
            resCreateAwardPromise.data.award.id.toString()
          );
        }
        const setImagePromise =
          imagesGallery &&
          imageFile &&
          imagesGallery.id === -1 &&
          typeOfUser &&
          typeOfUser.id
            ? setImage(file).unwrap()
            : null;

        //Номинирование тех кого выбрали
        const rewardUserPromises = arrChoiceUser!.map(async (user) => {
          if (resCreateAwardPromise && resCreateAwardPromise.data)
            return rewardUser({
              authId: Number(typeOfUser.id),
              awardId: resCreateAwardPromise.data?.award.id,
              userId: Number(user),
              actionType: 'NOMINEE',
            }).unwrap();
        });

        await Promise.all([
          createAwardPromise,
          setImageGalleryPromise,
          setImagePromise,
          ...rewardUserPromises,
        ])
          .then((resArray) => {
            // console.log(resArray);
            for (let i = 0; i < resArray.length; i++) {
              if (resArray[i] !== null) {
                if (resArray[i]!.success == false) {
                  errorMessageParse(resArray[i]?.errors);
                  isError = true;
                  break;
                }
              }
            }
          })
          .catch((e: Error) => {
            isError = true;
            toastError(e.message, 'Ошибка номинации');
          })
          .finally(() => {
            if (
              !isError &&
              rewardUserInfo.status !== 'pending' &&
              resCreateAwardPromise.success
            ) {
              back();
              toast.success('Номинация успешно создана');
              // reset();
            }
          });
      }
    };
    return {
      onSubmitReward,
      onSubmitNominee,
      back,
      handleClick,
      dispatch,
      deptId,
      imagesGallery,
      setImagesGallery,
      setImagesFile,
      rewardUserInfo,
      setImageGalleryInfo,
      setImageInfo,
      createAwardInfo,
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
    imagesGallery,
    setImagesGallery,
    setImageGallery,
    setImagesFile,
    imageFile,
    setImage,
    rewardUserInfo,
    setImageGalleryInfo,
    setImageInfo,
    createAwardInfo,
  ]);
};
