import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { userApi } from '@/api/user/user.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { BaseImage } from '@/types/base/image/baseImage';
import { BaseResponse } from '@/types/base/BaseResponse';
import { UserDetails } from '@/types/user/userDetails';

export const useUserEditPhoto = (
  singleUser: BaseResponse<UserDetails> | undefined
) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const [imageNum, setImageNum] = useState<number>(0);
  const [images, setImages] = useState<BaseImage[]>();

  useEffect(() => {
    setImages(singleUser?.data?.user.images);
  }, [singleUser]);

  const [addImage] = userApi.useImageAddMutation();
  const [removeImage] = userApi.useImageDeleteMutation();

  const addPhoto = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      let isError = false;

      if (event.target.files !== null && singleUser) {
        const file = new FormData();
        file.append('file', event.target.files[0]);
        file.append('userId', singleUser.data?.user.id);
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
    [addImage, singleUser, typeOfUser]
  );

  const removePhoto = useCallback(
    async (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      e.preventDefault();
      let isError = false;
      if (singleUser && imageNum != undefined && typeOfUser?.id) {
        await removeImage({
          userId: singleUser.data?.user.id,
          imageId: singleUser?.data?.user.images[imageNum].id,
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
    [imageNum, removeImage, singleUser, typeOfUser]
  );

  // const refreshPhoto = useCallback(
  //   async (event: ChangeEvent<HTMLInputElement>) => {
  //     let isError = false;

  //     if (event.target.files !== null && singleUser && imageNum != undefined) {
  //       const file = new FormData();
  //       file.append('file', event.target.files[0]);
  //       file.append('userId', singleUser.data?.user.id);
  //       file.append('imageId', singleUser?.data?.user.images[imageNum].id);

  //       await refreshImage(file)
  //         .unwrap()
  //         .then((res) => {
  //           if (res.success == false) {
  //             errorMessageParse(res.errors);
  //             isError = true;
  //           }
  //         })
  //         .catch(() => {
  //           isError = true;
  //           toast.error('Ошибка обновления фотографии');
  //         });
  //       if (!isError) {
  //         toast.success('Фото успешно обновлено');
  //       }
  //     }
  //   },
  //   [imageNum, refreshImage, singleUser]
  // );

  return {
    addPhoto,
    removePhoto,
    // refreshPhoto,
    imageNum,
    setImageNum,
    images,
  };
};
