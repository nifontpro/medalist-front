'use client';

import { SingleGiftProps } from './SingleGift.props';
import cn from 'classnames';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useRouter } from 'next/navigation';
import ButtonScrollUp from '@/ui/ButtonScrollUp/ButtonScrollUp';
import SingleGiftTitle from './SingleGiftTitle/SingleGiftTitle';
import { memo } from 'react';
import Spinner from '@/ui/Spinner/Spinner';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import SingleGiftGet from './SingleGiftGet/SingleGiftGet';
import { productApi } from '@/api/shop/product/product.api';
import SingleGiftImages from './SingleGiftImages/SingleGiftImages';
import NoAccessError from '@/ui/ErrorPages/NoAccessError/NoAccessError';

const SingleGift = ({ id, className, ...props }: SingleGiftProps) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // Получить награду по id
  const { data: gift, isLoading: isLoadingGift } = productApi.useGetByIdQuery(
    {
      authId: typeOfUser?.id!,
      productId: Number(id),
    },
    {
      skip: !id || !typeOfUser,
    }
  );

  const { push } = useRouter();

  if (isLoadingGift) return <Spinner />;
  if (!gift?.success) return <NoAccessError errors={gift?.errors} />;

  return (
    <div {...props} className={cn(className)}>
      <ButtonCircleIcon
        onClick={() => push(`/gifts`)}
        classNameForIcon=''
        appearance='black'
        icon='down'
      >
        В магазин призов
      </ButtonCircleIcon>

      <SingleGiftTitle gift={gift.data!} />
      {typeOfUser?.roles.includes('ADMIN') ||
      gift.data?.secondImages?.length! > 0 ? (
        <SingleGiftImages gift={gift.data!} />
      ) : null}
      <SingleGiftGet gift={gift.data!} />

      <ButtonScrollUp />
    </div>
  );
};

export default memo(SingleGift);
