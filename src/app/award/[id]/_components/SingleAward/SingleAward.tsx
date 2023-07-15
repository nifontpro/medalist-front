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

const SingleAward = ({ award, id, className, ...props }: SingleAwardProps) => {
  const { back } = useRouter();

  if (award?.award.state == 'FINISH' || award?.award.state == 'ERROR') {
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

        <AwardTitle award={award} />
        <AwardWasAwarded award={award} id={id} />
        <AwardWasNominee award={award} id={id} className='mb-[50px]' />
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

        <AwardTitle award={award} />
        <AwardNominee award={award} id={id} />
        <ButtonScrollUp />
      </div>
    );
  }
};

export default SingleAward;
