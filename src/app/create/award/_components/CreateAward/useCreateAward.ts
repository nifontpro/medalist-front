import {
  SubmitHandler,
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { toastError } from '@/utils/toast-error';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { CreateAwardRequest } from '@/api/award/request/CreateAwardRequest';
import dayjs from 'dayjs';
import { convertCorrectDataForUnix } from '@/utils/convertCorrectDataForUnix';
import { awardApi } from '@/api/award/award.api';

import { RootState } from '@/store/storage/store';
import { GalleryItem } from '@/types/gallery/item';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useFetchParams } from '@/hooks/useFetchParams';
import { userApi } from '@/api/user/user.api';

export const useCreateAward = (
  setValue: UseFormSetValue<CreateAwardRequest>,
  reset: UseFormReset<CreateAwardRequest>,
  getValues: UseFormGetValues<CreateAwardRequest>
) => {
  const dispatch = useAppDispatch();
  const { back } = useRouter();
  const searchParams = useSearchParams();
  const deptId = useMemo(
    () => Number(searchParams.get('deptId')),
    [searchParams]
  );
  const [arrChoiceUser, setArrChoiceUser] = useState<string[]>([]);
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);

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
  const [startDateSelect, setStartDateSelect] = useState('');
  const [endDateSelect, setEndDateSelect] = useState('');
  const [startDateValue, setStartDateValue] = useState<string | null>(null);
  const [endDateValue, setEndDateValue] = useState<string | null>(null);

  const {
    page,
    setPage,
    searchValue,
    setSearchValue,
    state,
    setState,
    nextPage,
    prevPage,
  } = useFetchParams();

  // Получить пользоветлей в отделе
  const {
    data: users,
    isLoading: isLoadingUsersOnDepartment,
    isFetching: isFetchingUsersOnDepartment,
  } = userApi.useGetUsersByDeptQuery(
    {
      authId: typeOfUser?.id!,
      deptId: deptId,
      baseRequest: {
        subdepts: true,
        page: page,
        pageSize: 100,
        filter: searchValue,
        orders: [{ field: 'lastname', direction: state }],
      },
    },
    {
      skip: !typeOfUser,
    }
  );

  const totalPage = useMemo(() => users?.pageInfo?.totalPages, [users]);

  const onChangeStart = useCallback((value: string | null) => {
    setStartDateSelect(dayjs(value).format('DD.MM.YYYY'));
    setStartDateValue(dayjs(value).toString());
    // dispatch(setStartDate(value as unknown as Date));
  }, []);
  const onClearStart = useCallback(() => {
    setStartDateSelect('');
    setStartDateValue(null);
    // dispatch(clearStartDate());
  }, []);
  const onChangeEnd = useCallback((value: string | null) => {
    setEndDateSelect(dayjs(value).format('DD.MM.YYYY'));
    setEndDateValue(dayjs(value).toString());
    // dispatch(setEndDate(value as unknown as Date));
  }, []);
  const onClearEnd = useCallback(() => {
    setEndDateSelect('');
    setEndDateValue(null);
    // dispatch(clearEndDate());
  }, []);

  //Закрытие модального окна нажатием вне его
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = useCallback(() => {
    setVisibleModal(false);
  }, []);
  useOutsideClick(ref, refOpen, handleClickOutside, visibleModal); // добавить как разберусь с Selectom React

  useEffect(() => {
    if (deptId && typeOfUser && typeOfUser.id) {
      setValue('deptId', deptId);
      setValue('authId', typeOfUser.id);
    }
  }, [setValue, deptId, typeOfUser, dispatch]);

  const handleBack = () => {
    const { name, description, type, endDate, startDate, score, criteria } =
      getValues();
    if (
      name ||
      description ||
      type ||
      endDate ||
      startDate ||
      score ||
      criteria
    ) {
      setOpenModalConfirm(true);
    } else {
      back();
    }
  };

  const handleClick = useCallback(
    (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      handleBack();
    },
    []
  );

  const onSubmitReward: SubmitHandler<CreateAwardRequest> = useCallback(
    async (data) => {
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
            ? setImage(file)
                .unwrap()
                .catch((e: Error) => {
                  isError = true;
                  toastError(e.message, 'Ошибка загрузки изображения');
                })
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
    },
    [
      arrChoiceUser,
      back,
      createAward,
      deptId,
      imageFile,
      imagesGallery,
      rewardUser,
      rewardUserInfo.status,
      setImage,
      setImageGallery,
      typeOfUser,
    ]
  );

  //Номинировать
  const onSubmitNominee: SubmitHandler<CreateAwardRequest> = useCallback(
    async (data) => {
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
    },
    [
      arrChoiceUser,
      back,
      createAward,
      deptId,
      endDateSelect,
      imageFile,
      imagesGallery,
      rewardUser,
      rewardUserInfo.status,
      setImage,
      setImageGallery,
      startDateSelect,
      typeOfUser,
    ]
  );

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
    handleBack,
    startDateSelect,
    startDateValue,
    endDateSelect,
    endDateValue,
    setVisibleModal,
    onClearStart,
    onChangeStart,
    onClearEnd,
    onChangeEnd,
    users,
    setSearchValue,
    arrChoiceUser,
    setArrChoiceUser,
    page,
    totalPage,
    nextPage,
    prevPage,
    openModalConfirm,
    setOpenModalConfirm,
  };
};
