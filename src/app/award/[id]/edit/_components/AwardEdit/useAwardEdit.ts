import {
  SubmitHandler,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-error';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { UpdateAwardRequest } from '@/api/award/request/UpdateAwardRequest';
import { awardApi } from '@/api/award/award.api';
import { GalleryItem } from '@/types/gallery/item';

export const useAwardEdit = (
  setValue: UseFormSetValue<UpdateAwardRequest>,
  id: string,
  getValues: UseFormGetValues<UpdateAwardRequest>,
  setOpenModalConfirm: Dispatch<SetStateAction<boolean>>
) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // Получить награду по id
  const { data: singleAward, isLoading: isLoadingSingleAward } =
    awardApi.useGetByIdQuery(
      {
        authId: typeOfUser?.id!,
        awardId: Number(id),
      },
      {
        skip: !id || !typeOfUser,
      }
    );

  const [imagesGallery, setImagesGallery] = useState<GalleryItem | undefined>(
    undefined
  ); // Для выбора из галлереи

  const { back } = useRouter();
  const [update] = awardApi.useUpdateMutation();

  useEffect(() => {
    if (typeOfUser && typeOfUser.id) {
      setValue('authId', typeOfUser.id);
    }
    if (singleAward && singleAward.data) {
      setValue('awardId', singleAward.data.award.id);
      setValue('startDate', singleAward.data.award.startDate);
      setValue('endDate', singleAward.data.award.endDate);
      setValue('type', singleAward.data.award.type);
      setValue('name', singleAward.data.award.name);
      setValue('description', singleAward.data.award.description);
      setValue('criteria', singleAward.data.criteria);
      setValue('score', singleAward.data.award.score);
    }
  }, [setValue, typeOfUser, singleAward]);

  const handleBack = () => {
    if (singleAward) {
      const { criteria, description, score, name } = getValues();
      if (
        criteria != singleAward.data?.criteria ||
        description != singleAward.data?.award.description ||
        score != singleAward.data?.award.score ||
        name != singleAward.data?.award.name
      ) {
        setOpenModalConfirm(true);
      } else {
        back();
      }
    }
  };

  const handleClick = useCallback(
    (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      handleBack();
    },
    []
  );

  const onSubmit: SubmitHandler<UpdateAwardRequest> = useCallback(
    async (data) => {
      if (data.score && data.score > 0) {
        data.score = Number(data.score);
      }

      let isError = false;

      await update({ ...data })
        .unwrap()
        .then((res) => {
          if (res.success == false) {
            errorMessageParse(res.errors);
            isError = true;
          }
        })
        .catch((e) => {
          isError = true;
          toastError(e, 'Ошибка редактирования награды');
        });
      if (!isError) {
        toast.success('Награда успешно изменена');
        back();
      }
    },
    [back, update]
  );

  return {
    onSubmit,
    handleClick,
    isLoadingSingleAward,
    singleAward,
    back,
    imagesGallery,
    setImagesGallery,
    handleBack,
  };
};
