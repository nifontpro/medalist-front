import {
  SubmitHandler,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { toastError } from '@/utils/toast-error';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { errorMessageParse } from '@/utils/errorMessageParse';
import { UpdateProductRequest } from '@/api/shop/product/request/UpdateProductRequest';
import { productApi } from '@/api/shop/product/product.api';

export const useGiftEdit = (
  setValue: UseFormSetValue<UpdateProductRequest>,
  id: string,
  getValues: UseFormGetValues<UpdateProductRequest>,
  setOpenModalConfirm: Dispatch<SetStateAction<boolean>>
) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // Получить подарка по id
  const { data: gift, isLoading: isLoadingGift } = productApi.useGetByIdQuery(
    {
      authId: typeOfUser?.id!,
      productId: Number(id),
    },
    {
      skip: !id || !typeOfUser,
    }
  );

  const { back, push } = useRouter();
  const [update] = productApi.useUpdateMutation();

  useEffect(() => {
    if (typeOfUser && typeOfUser.id) {
      setValue('authId', typeOfUser.id);
    }
    if (gift) {
      setValue('name', gift.data?.product.name);
      setValue('price', gift.data?.product.price);
      setValue('count', gift.data?.product.count);
      setValue('siteUrl', gift.data?.siteUrl);
      setValue('place', gift.data?.place);
      setValue('description', gift.data?.product.description);
      setValue('shortDescription', gift.data?.product.shortDescription);
      setValue('productId', gift.data?.product.id);
    }
  }, [setValue, typeOfUser, gift]);

  const handleBack = () => {
    if (gift) {
      const { price, name, count, siteUrl, place, description } = getValues();
      if (
        price != gift.data?.product.price ||
        name != gift.data?.product.name ||
        count != gift.data?.product.count ||
        siteUrl != gift.data?.product.siteUrl ||
        place != gift.data?.product.place ||
        description != gift.data?.product.description
      ) {
        setOpenModalConfirm(true);
      } else {
        back();
      }
    }
  };

  const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleBack();
  };

  const onSubmit: SubmitHandler<UpdateProductRequest> = useCallback(
    async (data) => {
      let isError = false;

      // console.log(data);

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
          toastError(e, 'Ошибка редактирования ');
        });
      if (!isError) {
        toast.success('Приз успешно отредактирован');
        back();
      }
    },
    [back, update]
  );

  return {
    onSubmit,
    handleClick,
    isLoadingGift,
    gift,
    back,
    handleBack,
  };
};
