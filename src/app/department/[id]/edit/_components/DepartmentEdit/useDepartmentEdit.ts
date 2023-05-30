import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { deptApi } from '@/api/dept/dept.api';
import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@/store/hooks/hooks';
import { toastError } from '@/utils/toast-error';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { UpdateDeptRequest } from '@/api/dept/request/updateDeptRequest';
import { useDepartmentAdmin } from '@/app/department/useDepartmentAdmin';
import { BaseImage } from '@/domain/model/base/image/baseImage';

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

  const { back } = useRouter();
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

  return useMemo(() => {
    const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      back();
    };

    const addPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
      let isError = false;

      if (event.target.files !== null && singleDepartment && typeOfUser) {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('deptId', singleDepartment.data?.dept.id);
        formData.append('authId', String(typeOfUser.id));

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
    };

    const removePhoto = async (
      e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
    ) => {
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
    };

    const refreshPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
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
    };

    const onSubmit: SubmitHandler<UpdateDeptRequest> = async (data) => {
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
        back();
      }
    };
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
  }, [
    back,
    update,
    addImage,
    imageNum,
    refreshImage,
    setImageNum,
    singleDepartment,
    typeOfUser,
    isLoadingByIdDept,
    images,
    removeImage,
  ]);
};
