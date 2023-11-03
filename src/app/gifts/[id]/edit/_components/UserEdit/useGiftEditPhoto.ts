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
import { BaseResponse } from '@/types/base/BaseResponse';
import { ProductDetails } from '@/types/shop/product/ProductDetails';
import { productApi } from '@/api/shop/product/product.api';

export const useGiftEditPhoto = (
  gift: BaseResponse<ProductDetails> | undefined
) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const [imageNum, setImageNum] = useState<number>(0);
  const [images, setImages] = useState<BaseImage[]>();

  useEffect(() => {
    setImages(gift?.data?.images);
  }, [gift]);

  const [addImage] = productApi.useImageAddMutation();
  const [removeImage] = productApi.useImageDeleteMutation();

  const addPhoto = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      let isError = false;

      if (event.target.files !== null && gift) {
        const file = new FormData();
        file.append('file', event.target.files[0]);
        file.append('productId', gift.data?.product.id);
        typeOfUser &&
          typeOfUser.id &&
          file.append('authId', typeOfUser.id.toString());
        if (event.target.files[0].size > 20971520) {
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
    [addImage, gift, typeOfUser]
  );

  const removePhoto = useCallback(
    async (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      e.preventDefault();
      let isError = false;
      if (gift && imageNum != undefined && typeOfUser?.id) {
        await removeImage({
          productId: gift.data?.product.id,
          imageId: gift?.data?.images[imageNum].id!,
          authId: typeOfUser?.id,
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
    [imageNum, removeImage, gift, typeOfUser]
  );

  return {
    addPhoto,
    removePhoto,
    imageNum,
    setImageNum,
    images,
  };
};
