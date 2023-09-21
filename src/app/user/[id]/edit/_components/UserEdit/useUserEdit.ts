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
import { userApi } from '@/api/user/user.api';
import { Gender } from '@/types/user/user';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { UpdateUserRequest } from '@/api/user/request/UpdateUserRequest';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { useUserAdmin } from '@/api/user/useUserAdmin';
import { BaseImage } from '@/types/base/image/baseImage';
import { useDepartmentAdmin } from '@/api/dept/useDepartmentAdmin';
import { IOption } from '@/ui/SelectArtem/SelectArtem.interface';

export const useUserEdit = (
  setValue: UseFormSetValue<UpdateUserRequest>,
  id: string
) => {
  const { singleUser, isLoadingSingleUser } = useUserAdmin(id);

  //  Для выбора отделов и перемещения
  const { deptsForRelocation, isLoadingDeptsForRelocation } =
    useDepartmentAdmin();

  let arrDeparts: IOption[] = [];

  if (deptsForRelocation?.data)
    arrDeparts = deptsForRelocation.data.map((depart) => ({
      label: depart.name,
      value: depart?.id,
    }));
  //  ______

  const [imageNum, setImageNum] = useState<number>(0);
  const [images, setImages] = useState<BaseImage[]>();

  useEffect(() => {
    setImages(singleUser?.data?.user.images);
  }, [singleUser]);

  const [active, setActive] = useState<Gender>('UNDEF');

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { back } = useRouter();
  const [update] = userApi.useUpdateMutation();
  const [addImage] = userApi.useImageAddMutation();
  const [removeImage] = userApi.useImageDeleteMutation();
  const [refreshImage] = userApi.useImageUpdateMutation();

  useEffect(() => {
    if (typeOfUser && typeOfUser.id) {
      setValue('authId', typeOfUser.id);
    }
    if (singleUser) {
      setActive(singleUser.data?.user.gender);
      setValue('gender', singleUser.data?.user.gender);
      setValue('address', singleUser.data?.address);
      setValue('phone', singleUser.data?.phone);
      setValue('description', singleUser.data?.description);
      setValue('gender', singleUser.data?.user.gender);
      setValue('firstname', singleUser.data?.user.firstname);
      setValue('lastname', singleUser.data?.user.lastname);
      setValue('patronymic', singleUser.data?.user.patronymic);
      setValue('post', singleUser.data?.user.post);
      setValue('authEmail', singleUser.data?.user.authEmail);
      setValue('userId', singleUser.data?.user.id);
      setValue('roles', singleUser.data?.user.roles);
      setValue('deptId', singleUser.data?.user.dept.id);
    }
  }, [setValue, setActive, typeOfUser, singleUser]);

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

      if (event.target.files !== null && singleUser) {
        const file = new FormData();
        file.append('file', event.target.files[0]);
        file.append('userId', singleUser.data?.user.id);
        typeOfUser &&
          typeOfUser.id &&
          file.append('authId', typeOfUser.id.toString());
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
    [addImage, singleUser, typeOfUser]
  );

  const removePhoto = useCallback(
    async (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      e.preventDefault();
      let isError = false;
      if (singleUser && imageNum != undefined) {
        await removeImage({
          userId: singleUser.data?.user.id,
          imageId: singleUser?.data?.user.images[imageNum].id,
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
    [imageNum, removeImage, singleUser]
  );

  const refreshPhoto = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      let isError = false;

      if (event.target.files !== null && singleUser && imageNum != undefined) {
        const file = new FormData();
        file.append('file', event.target.files[0]);
        file.append('userId', singleUser.data?.user.id);
        file.append('imageId', singleUser?.data?.user.images[imageNum].id);

        await refreshImage(file)
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
    [imageNum, refreshImage, singleUser]
  );

  const onSubmit: SubmitHandler<UpdateUserRequest> = useCallback(
    async (data) => {
      let isError = false;

      if (active != undefined) {
        data.gender = active;
      }
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
          toastError(e, 'Ошибка редактирования профиля сотрудника');
        });
      if (!isError) {
        toast.success('Профиль сотрудника успешно изменен');
        back();
      }
    },
    [active, back, update]
  );

  return {
    onSubmit,
    handleClick,
    addPhoto,
    removePhoto,
    refreshPhoto,
    isLoadingSingleUser,
    singleUser,
    back,
    imageNum,
    setImageNum,
    images,
    active,
    setActive,
    arrDeparts,
  };
};
