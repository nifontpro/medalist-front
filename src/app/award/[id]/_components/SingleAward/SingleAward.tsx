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
import { useAwardAdmin } from '@/api/award/useAwardAdmin';

const SingleAward = ({ id, className, ...props }: SingleAwardProps) => {
  const { singleAward: award, isLoadingSingleAward } = useAwardAdmin(id);

  const { back } = useRouter();

  if (isLoadingSingleAward) return <Spinner />;
  if (!award?.success) return <NoAccess />;

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
