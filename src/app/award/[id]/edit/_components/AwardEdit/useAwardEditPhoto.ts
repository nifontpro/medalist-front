import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { BaseImage } from '@/types/base/image/baseImage';
import { awardApi } from '@/api/award/award.api';
import { AwardDetails } from '@/types/award/AwardDetails';
import { GalleryItem } from '@/types/gallery/item';

export const useAwardEditPhoto = (singleAward: AwardDetails | null) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const [imagesGallery, setImagesGallery] = useState<GalleryItem | undefined>(
    undefined
  ); // Для выбора из галлереи

  const [imageNum, setImageNum] = useState<number>(0);
  const [images, setImages] = useState<BaseImage[]>();

  useEffect(() => {
    setImages(singleAward?.images);
  }, [singleAward]);

  const [addImage] = awardApi.useImageAddMutation();
  const [removeImage] = awardApi.useImageDeleteMutation();

  const addPhoto = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      let isError = false;
      event.preventDefault();

      if (
        event.target.files !== null &&
        singleAward &&
        typeOfUser &&
        typeOfUser.id
      ) {
        const file = new FormData();
        file.append('file', event.target.files[0]);
        file.append('authId', typeOfUser.id.toString());
        file.append('awardId', singleAward.award.id.toString());
        const fileImg = event.target.files[0];
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

        if (fileImg.size > 20971520) {
          toast.error('Размер фотографии должен быть меньше 1МБ');
        } else if (!allowedTypes.includes(fileImg.type)) {
          toast.error('Формат фотографии должен быть PNG, JPEG или JPG');
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
      if (singleAward && typeOfUser && typeOfUser.id && imageNum != undefined) {
        await removeImage({
          awardId: singleAward.award.id,
          imageId: singleAward.images[imageNum].id,
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

  return {
    addPhoto,
    removePhoto,
    imageNum,
    setImageNum,
    images,
    imagesGallery,
    setImagesGallery,
  };
};
