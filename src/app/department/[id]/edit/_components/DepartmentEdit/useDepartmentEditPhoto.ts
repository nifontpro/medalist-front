import { toast } from 'react-toastify';
import { deptApi } from '@/api/dept/dept.api';
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useAppSelector } from '@/store/hooks/hooks';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { BaseImage } from '@/types/base/image/baseImage';
import { RootState } from '@/store/storage/store';
import { BaseResponse } from '@/types/base/BaseResponse';
import { DeptDetails } from '@/types/dept/deptDetails';

export const useDepartmentEditPhoto = (
  singleDepartment: BaseResponse<DeptDetails> | undefined
) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const [imageNum, setImageNum] = useState<number>(0);
  const [images, setImages] = useState<BaseImage[]>();

  useEffect(() => {
    setImages(singleDepartment?.data?.dept.images);
  }, [singleDepartment]);

  const [addImage] = deptApi.useImageAddMutation();
  const [refreshImage] = deptApi.useImageUpdateMutation();
  const [removeImage] = deptApi.useImageDeleteMutation();

  const addPhoto = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      let isError = false;

      if (event.target.files !== null && singleDepartment && typeOfUser) {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('deptId', singleDepartment.data?.dept.id);
        formData.append('authId', String(typeOfUser.id));

        const fileImg = event.target.files[0];
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

        if (fileImg.size > 20971520) {
          toast.error('Размер фотографии должен быть меньше 1МБ');
        } else if (!allowedTypes.includes(fileImg.type)) {
          toast.error('Формат фотографии должен быть PNG, JPEG или JPG');
        } else {
          await addImage(formData)
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
    [addImage, singleDepartment, typeOfUser]
  );

  const removePhoto = useCallback(
    async (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      e.preventDefault();
      let isError = false;
      if (
        singleDepartment &&
        imageNum != undefined &&
        typeOfUser &&
        typeOfUser.id
      ) {
        await removeImage({
          authId: typeOfUser?.id,
          deptId: singleDepartment.data?.dept.id,
          imageId: singleDepartment?.data?.dept.images[imageNum].id,
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
    [imageNum, removeImage, singleDepartment, typeOfUser]
  );

  const refreshPhoto = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      let isError = false;

      if (
        event.target.files !== null &&
        singleDepartment &&
        imageNum != undefined &&
        typeOfUser
      ) {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('deptId', singleDepartment.data?.dept.id);
        formData.append('authId', String(typeOfUser.id));
        formData.append(
          'imageId',
          singleDepartment?.data?.dept.images[imageNum].id
        );

        await refreshImage(formData)
          .unwrap()
          .then((res) => {
            if (res.success == false) {
              errorMessageParse(res.errors);
              isError = true;
            }
          })
          .catch(() => {
            isError = true;
            toast.error('Ошибка обновления фотографии');
          });
        if (!isError) {
          toast.success('Фото успешно обновлено');
        }
      }
    },
    [imageNum, refreshImage, singleDepartment, typeOfUser]
  );

  return {
    addPhoto,
    refreshPhoto,
    removePhoto,
    imageNum,
    setImageNum,
    images,
  };
};
