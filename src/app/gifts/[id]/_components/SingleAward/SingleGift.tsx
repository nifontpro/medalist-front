'use client';

import { SingleGiftProps } from './SingleGift.props';
import cn from 'classnames';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useRouter } from 'next/navigation';
import ButtonScrollUp from '@/ui/ButtonScrollUp/ButtonScrollUp';
import SingleGiftTitle from './SingleGiftTitle/SingleGiftTitle';
import { memo } from 'react';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { awardApi } from '@/api/award/award.api';

const SingleGift = ({ id, className, ...props }: SingleGiftProps) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // Получить награду по id
  const { data: award, isLoading: isLoadingSingleAward } =
    awardApi.useGetByIdQuery(
      {
        authId: typeOfUser?.id!,
        awardId: Number(id),
      },
      {
        skip: !id || !typeOfUser,
      }
    );

  const { push } = useRouter();

  if (isLoadingSingleAward) return <Spinner />;
  if (!award?.success) return <NoAccess />;

  if (
    award?.data?.award.state == 'FINISH' ||
    award?.data?.award.state == 'ERROR'
  ) {
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

        <SingleGiftTitle award={award.data!} />
        {/* <AwardWasAwarded award={award.data!} id={id} /> */}
        {/* <AwardWasNominee award={award.data!} id={id} className='mb-[50px]' /> */}
        <ButtonScrollUp />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default memo(SingleGift);
