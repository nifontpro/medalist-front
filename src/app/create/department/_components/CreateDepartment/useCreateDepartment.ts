import {
  SubmitHandler,
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { CreateDeptRequest } from '@/api/dept/request/createDeptRequest';
import { deptApi } from '@/api/dept/dept.api';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAppSelector } from '@/store/hooks/hooks';
import { toastError } from '@/utils/toast-error';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { RootState } from '@/store/storage/store';
import { GalleryItem } from '@/types/gallery/item';

export const useCreateDepartment = (
  setValue: UseFormSetValue<CreateDeptRequest>,
  reset: UseFormReset<CreateDeptRequest>,
  setOpenModalConfirm: Dispatch<SetStateAction<boolean>>,
  getValues: UseFormGetValues<CreateDeptRequest>
) => {
  const searchParams = useSearchParams();
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const parentId = useMemo(
    () => Number(searchParams.get('id')),
    [searchParams]
  );

  const { back } = useRouter();
  const [create, createInfo] = deptApi.useGetProfilesMutation();

  useEffect(() => {
    if (parentId && typeOfUser && typeOfUser.id) {
      setValue('parentId', parentId);
      setValue('authId', typeOfUser.id);
    }
  }, [setValue, parentId, typeOfUser]);

  const handleBack = () => {
    const { name, email, phone, description } = getValues();
    if (name || email || phone || description) {
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

  const [addImage] = deptApi.useImageAddMutation();

  const onSubmit: SubmitHandler<CreateDeptRequest> = useCallback(
    async (data) => {
      let isError = false;
      if (parentId) {
        await create({ ...data })
          .unwrap()
          .then(async (res) => {
            if (res.success == false) {
              errorMessageParse(res.errors);
              isError = true;
            } else {
              if (imageFile && typeOfUser && typeOfUser.id) {
                const file = new FormData();
                file.append('file', imageFile);
                file.append('authId', typeOfUser.id.toString());
                file.append('deptId', res.data?.dept.id.toString());
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
            toastError(e, 'Ошибка создания отдела');
          });
      } else {
        isError = true;
        toast.error('Необходимо выбрать родительский отдел');
      }
      if (!isError) {
        reset();
        toast.success('Отдел успешно создан');
        back();
      }
    },
    [back, create, parentId, reset, addImage, imageFile, typeOfUser]
  );

  return {
    onSubmit,
    handleClick,
    back,
    createInfo,
    typeOfUser,
    imagesGallery,
    setImagesGallery,
    setImagesFile,
  };
};
