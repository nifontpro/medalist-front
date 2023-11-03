'use client';

import { SingleAwardProps } from './SingleAward.props';
import cn from 'classnames';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useRouter } from 'next/navigation';
import ButtonScrollUp from '@/ui/ButtonScrollUp/ButtonScrollUp';
import AwardTitle from './AwardTitle/AwardTitle';
import AwardWasAwarded from './AwardWasAwarded/AwardWasAwarded';
import AwardWasNominee from './AwardWasNominee/AwardWasNominee';
import AwardNominee from './AwardNominee/AwardNominee';
import { memo } from 'react';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { awardApi } from '@/api/award/award.api';

const SingleAward = ({ id, className, ...props }: SingleAwardProps) => {
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

  const { back } = useRouter();

  if (isLoadingSingleAward) return <Spinner />;
  if (!award?.success) return <NoAccess errors={award?.errors} />;

  if (
    award?.data?.award.state == 'FINISH' ||
    award?.data?.award.state == 'ERROR'
  ) {
    return (
      <div {...props} className={cn(className)}>
        <ButtonCircleIcon
          onClick={back}
          classNameForIcon=''
          appearance='black'
          icon='down'
        >
          Вернуться назад
        </ButtonCircleIcon>

        <AwardTitle award={award.data!} />
        <AwardWasAwarded award={award.data!} id={id} />
        <AwardWasNominee award={award.data!} id={id} className='mb-[50px]' />
        <ButtonScrollUp />
      </div>
    );
  } else {
    return (
      <div {...props} className={cn(className)}>
        <ButtonCircleIcon
          onClick={back}
          classNameForIcon=''
          appearance='black'
          icon='down'
        >
          Вернуться назад
        </ButtonCircleIcon>

        <AwardTitle award={award.data!} />
        <AwardNominee award={award.data!} id={id} />
        <ButtonScrollUp />
      </div>
    );
  }
};

export default memo(SingleAward);
