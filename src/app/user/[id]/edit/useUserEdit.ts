import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-error';
import { userApi } from '@/api/user/user.api';
import { Gender, RoleUser } from '@/domain/model/user/user';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { BaseResponse } from '@/domain/model/base/baseResponse';
import { UserDetails } from '@/domain/model/user/userDetails';
import { UpdateUserRequest } from '@/api/user/request/UpdateUserRequest';

export const useUserEdit = (
  setValue: UseFormSetValue<UpdateUserRequest>,
  setActive: Dispatch<SetStateAction<Gender>>,
  active: Gender,
  singleUser: BaseResponse<UserDetails> | undefined
) => {
  const [img, setImg] = useState<string | undefined>(undefined);
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { back } = useRouter();
  const [update] = userApi.useUpdateMutation();
  const [addImages] = userApi.useImageAddMutation();

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
    }
  }, [setValue, setActive, typeOfUser, singleUser]);

  const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    back();
  };

  const addPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    let isError = false;

    if (event.target.files !== null && singleUser) {
      // setImg(URL.createObjectURL(event.target.files[0]));
      const file = new FormData();
      file.append('imageUrl', event.target.files[0]);
      await addImages({file, userId: singleUser.data?.user.id})
        .unwrap()
        // .then((res) => {
        //   if (!res.success) {
        //     toastError(res.errors[0].message);
        //     isError = true;
        //   }
        // })
        .catch(() => {
          isError = true;
          toast.error('Ошибка обновления фотографии');
        });
      if (!isError) {
        toast.success('Фото успешно обновлен');
      }
    }
  };

  const removePhoto = async (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    let isError = false;
    console.log('Remove photo');
    // if (user != undefined) {
    //   await removeImg(user.id)
    //     .unwrap()
    //     .catch(() => {
    //       isError = true;
    //       toast.error('Ошибка удаления фотографии');
    //     });
    //   if (!isError) {
    //     toast.success('Фото успешно удалено');
    //   }
    // }
  };

  const onSubmit: SubmitHandler<UpdateUserRequest> = async (data) => {
    let isError = false;

    if (active != undefined) {
      data.gender = active;
    }
    await update({ ...data })
      .unwrap()
      .then((res) => {
        if (res.success == false) {
          toastError(res.errors[0].message);
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
  };

  return { onSubmit, handleClick, addPhoto, removePhoto };
};
