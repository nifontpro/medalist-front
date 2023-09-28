import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { deptApi } from '@/api/dept/dept.api';
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAppSelector } from '@/store/hooks/hooks';
import { toastError } from '@/utils/toast-error';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { UpdateDeptRequest } from '@/api/dept/request/updateDeptRequest';
import { useDepartmentAdmin } from '@/api/dept/useDepartmentAdmin';
import { BaseImage } from '@/types/base/image/baseImage';

export const useDepartmentEdit = (
  setValue: UseFormSetValue<UpdateDeptRequest>,
  id: string
) => {
  const { singleDepartment, isLoadingByIdDept } = useDepartmentAdmin(id);

  const [imageNum, setImageNum] = useState<number>(0);
  const [images, setImages] = useState<BaseImage[]>();

  useEffect(() => {
    setImages(singleDepartment?.data?.dept.images);
  }, [singleDepartment]);

  const { back, push } = useRouter();
  const [update] = deptApi.useUpdateMutation();
  const [addImage] = deptApi.useImageAddMutation();
  const [refreshImage] = deptApi.useImageUpdateMutation();
  const [removeImage] = deptApi.useImageDeleteMutation();

  const { typeOfUser } = useAppSelector((state) => state.userSelection);

  useEffect(() => {
    if (typeOfUser && typeOfUser.id) {
      setValue('authId', typeOfUser.id);
      setValue('deptId', Number(id));
    }
    if (singleDepartment) {
      setValue('name', singleDepartment.data?.dept.name);
      setValue('address', singleDepartment.data?.address);
      setValue('phone', singleDepartment.data?.phone);
      setValue('email', singleDepartment.data?.email);
      setValue('description', singleDepartment.data?.description);
      setValue('classname', singleDepartment.data?.dept.classname);
    }
  }, [id, setValue, singleDepartment, typeOfUser]);

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

      if (event.target.files !== null && singleDepartment && typeOfUser) {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('deptId', singleDepartment.data?.dept.id);
        formData.append('authId', String(typeOfUser.id));

        const fileImg = event.target.files[0];
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

        if (fileImg.size > 1024000) {
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

  const onSubmit: SubmitHandler<UpdateDeptRequest> = useCallback(
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
          toastError(e, 'Ошибка редактирования отдела');
        });

      if (!isError) {
        toast.success('Отдел успешно отредактирован');
        push(`/department/${id}`);
      }
    },
    [push, id, update]
  );

  return {
    onSubmit,
    handleClick,
    back,
    addPhoto,
    refreshPhoto,
    removePhoto,
    isLoadingByIdDept,
    singleDepartment,
    imageNum,
    setImageNum,
    images,
  };
};
