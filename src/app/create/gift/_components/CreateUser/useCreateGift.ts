import {
  SubmitHandler,
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-error';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { GalleryItem } from '@/types/gallery/item';
import { CreateProductRequest } from '@/api/shop/product/request/CreateProductRequest';
import { productApi } from '@/api/shop/product/product.api';

export const useCreateGift = (
  setValue: UseFormSetValue<CreateProductRequest>,
  reset: UseFormReset<CreateProductRequest>,
  setOpenModalConfirm: Dispatch<SetStateAction<boolean>>,
  getValues: UseFormGetValues<CreateProductRequest>
) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  const selectCompany = Number(localStorage.getItem('selectCompany'));

  const { back, push } = useRouter();

  const [create, createInfo] = productApi.useCreateMutation();

  useEffect(() => {
    if (selectCompany && typeOfUser && typeOfUser.id) {
      setValue('deptId', selectCompany);
      setValue('authId', typeOfUser.id);
    }
  }, [setValue, typeOfUser, selectCompany]);

  const handleBack = () => {
    const { name, price, count, siteUrl, place, description } = getValues();
    if (name || price || count || siteUrl || place || description) {
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

  const [addImage] = productApi.useImageAddMutation();

  const onSubmit: SubmitHandler<CreateProductRequest> = useCallback(
    async (data) => {
      let isError = false;

      console.log(data);

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
              file.append('productId', res.data?.product.id.toString());
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
          toastError(e, 'Ошибка создания приза');
        });
      if (!isError) {
        reset();
        toast.success('Приз успешно создан');
        push('/gifts');
      }
    },
    [create, reset, addImage, imageFile, typeOfUser]
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
