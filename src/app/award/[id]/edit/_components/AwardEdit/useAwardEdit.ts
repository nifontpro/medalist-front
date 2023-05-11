import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-error';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { BaseImage } from '@/domain/model/base/image/baseImage';
import { useAwardAdmin } from '@/app/award/useAwardAdmin';
import { UpdateAwardRequest } from '@/api/award/request/UpdateAwardRequest';
import { awardApi } from '@/api/award/award.api';

export const useAwardEdit = (
  setValue: UseFormSetValue<UpdateAwardRequest>,
  id: string
) => {
  const { singleAward, isLoadingSingleAward } = useAwardAdmin(id);

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
    }
  }, [setValue, typeOfUser, singleAward]);

  return useMemo(() => {
    const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      back();
    };

    const addPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
      let isError = false;

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

        await addImage(file)
          .unwrap()
          .then((res) => {
            console.log(res);
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
    };

    const removePhoto = async (
      e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
    ) => {
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
    };

    const onSubmit: SubmitHandler<UpdateAwardRequest> = async (data) => {
      let isError = false;
      console.log(data);

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
    };
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
    };
  }, [
    addImage,
    back,
    imageNum,
    images,
    isLoadingSingleAward,
    removeImage,
    singleAward,
    update,
    typeOfUser,
  ]);
};