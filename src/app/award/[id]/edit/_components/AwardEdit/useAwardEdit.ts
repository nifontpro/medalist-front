import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-error';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { BaseImage } from '@/types/base/image/baseImage';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import { UpdateAwardRequest } from '@/api/award/request/UpdateAwardRequest';
import { awardApi } from '@/api/award/award.api';
import { GalleryItem } from '@/types/gallery/item';

export const useAwardEdit = (
  setValue: UseFormSetValue<UpdateAwardRequest>,
  id: string
) => {
  const { singleAward, isLoadingSingleAward } = useAwardAdmin(id);

  const [imagesGallery, setImagesGallery] = useState<GalleryItem | undefined>(
    undefined
  ); // Для выбора из галлереи

  const [imageNum, setImageNum] = useState<number>(0);
  const [images, setImages] = useState<BaseImage[]>();

  useEffect(() => {
    setImages(singleAward?.data?.award.images);
  }, [singleAward]);

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { back } = useRouter();
  const [update] = awardApi.useUpdateMutation();
  const [addImage] = awardApi.useImageAddMutation();
  const [removeImage] = awardApi.useImageDeleteMutation();

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
      setValue('description', singleAward.data.description);
      setValue('criteria', singleAward.data.criteria);
      setValue('score', singleAward.data.award.score);
    }
  }, [setValue, typeOfUser, singleAward]);

  const handleClick = useCallback(
    (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      back();
    },
    [back]
  );

  const addPhoto = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      let isError = false;
      event.preventDefault();

      if (
        event.target.files !== null &&
        singleAward &&
        singleAward.data &&
        typeOfUser &&
        typeOfUser.id
      ) {
        const file = new FormData();
        file.append('file', event.target.files[0]);
        file.append('authId', typeOfUser.id.toString());
        file.append('awardId', singleAward.data.award.id.toString());
        if (event.target.files[0].size > 1024000) {
          toast.error('Размер фотографии должен быть меньше 1МБ');
        } else {
          await addImage(file)
            .unwrap()
            .then((res) => {
              if (res.success == false) {
                errorMessageParse(res.errors);
                isError = true;
              }
            })
            .catch(() => {
              isError = true;
              toast.error('Ошибка добавления фотографии');
            });

          if (!isError) {
            toast.success('Фото успешно добавлено');
            setImageNum(0);
          }
        }
      }
    },
    [addImage, singleAward, typeOfUser]
  );

  const removePhoto = useCallback(
    async (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      e.preventDefault();
      let isError = false;
      if (
        singleAward &&
        singleAward.data &&
        typeOfUser &&
        typeOfUser.id &&
        imageNum != undefined
      ) {
        await removeImage({
          awardId: singleAward.data.award.id,
          imageId: singleAward.data.award.images[imageNum].id,
          authId: typeOfUser.id,
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
            toast.error('Ошибка удаления фотографии');
          });
        if (!isError) {
          toast.success('Фото успешно удалено');
          setImageNum(0);
        }
      }
    },
    [imageNum, removeImage, singleAward, typeOfUser]
  );

  const onSubmit: SubmitHandler<UpdateAwardRequest> = useCallback(
    async (data) => {
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
    addPhoto,
    removePhoto,
    isLoadingSingleAward,
    singleAward,
    back,
    imageNum,
    setImageNum,
    images,
    imagesGallery,
    setImagesGallery,
  };
};
