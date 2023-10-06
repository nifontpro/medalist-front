import {
  SubmitHandler,
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-error';
import { userApi } from '@/api/user/user.api';
import { Gender } from '@/types/user/user';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { CreateUserRequest } from '@/api/user/request/CreateUserRequest';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { GalleryItem } from '@/types/gallery/item';

export const useCreateUser = (
  setValue: UseFormSetValue<CreateUserRequest>,
  active: Gender,
  reset: UseFormReset<CreateUserRequest>,
  setOpenModalConfirm: Dispatch<SetStateAction<boolean>>,
  getValues: UseFormGetValues<CreateUserRequest>
) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const searchParams = useSearchParams();

  const { back } = useRouter();

  const [create, createInfo] = userApi.useCreateUserMutation();

  const deptId = useMemo(
    () => Number(searchParams.get('deptId')),
    [searchParams]
  );

  useEffect(() => {
    if (active != undefined) {
      setValue('gender', active);
    }
    if (deptId && typeOfUser && typeOfUser.id) {
      setValue('deptId', deptId);
      setValue('authId', typeOfUser.id);
    }
  }, [setValue, active, deptId, typeOfUser]);

  const handleBack = () => {
    const {
      firstname,
      lastname,
      patronymic,
      post,
      phone,
      roles,
      authEmail,
      description,
    } = getValues();
    if (
      firstname ||
      lastname ||
      patronymic ||
      post ||
      phone ||
      roles ||
      authEmail ||
      description
    ) {
      setOpenModalConfirm(true);
    } else {
      back();
    }
  };

  const handleClick = useCallback(
    (event: React.FormEvent<HTMLButtonElement>) => {
      event.preventDefault();
      handleBack();
    },
    []
  );

  const [imageFile, setImagesFile] = useState<File>(); // Для загрузки пользовательского изображения
  const [imagesGallery, setImagesGallery] = useState<GalleryItem | undefined>(
    undefined
  ); // Для предпросмотра и выбора из галлереи

  const [addImage] = userApi.useImageAddMutation();

  const onSubmit: SubmitHandler<CreateUserRequest> = useCallback(
    async (data) => {
      let isError = false;

      if (active != undefined) {
        data.gender = active;
      }
      await create({ ...data })
        .unwrap()
        .then(async (res) => {
          if (res.success == false) {
            errorMessageParse(res.errors);
            isError = true;
          } else {
            if (imageFile && typeOfUser && typeOfUser.id) {
              console.log(123);
              const file = new FormData();
              file.append('file', imageFile);
              file.append('authId', typeOfUser.id.toString());
              file.append('userId', res.data?.user.id.toString());
              console.log(123);
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
            }
          }
        })
        .catch((e) => {
          isError = true;
          toastError(e, 'Ошибка создания профиля сотрудника');
        });
      if (!isError) {
        reset();
        toast.success('Профиль сотрудника успешно создан');
        back();
      }
    },
    [active, back, create, reset, addImage, imageFile, typeOfUser]
  );

  return {
    onSubmit,
    handleClick,
    createInfo,
    back,
    imagesGallery,
    setImagesGallery,
    setImagesFile,
    handleBack,
  };
};
