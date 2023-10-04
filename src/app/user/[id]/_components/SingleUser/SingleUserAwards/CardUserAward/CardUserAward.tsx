import styles from './CardUserAward.module.scss';
import { CardUserAwardProps } from './CardUserAward.props';
import cn from 'classnames';
import { timeConverterUser } from '@/utils/timeConverterUser';
import EditPanelAuthBtn from '@/ui/EditPanelAuthBtn/EditPanelAuthBtn';
import { getUserEditUrl } from '@/config/api.config';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import P from '@/ui/P/P';
import { memo, useMemo } from 'react';
import { useRouter } from 'next/navigation';

const CardUserAward = ({
  user,
  award,
  userRewardAsync,
  className,
  ...props
}: CardUserAwardProps): JSX.Element => {
  let convertDate = useMemo(() => timeConverterUser(award.date), [award]);
  const { push } = useRouter();

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <EditPanelAuthBtn
        color='white'
        onlyRemove={true}
        handleRemove={() =>
          award &&
          award.award &&
          user?.user.id &&
          userRewardAsync(award.award.id, 'DELETE', user.user.id)
        }
        id={award.id.toString()}
        getUrlEdit={getUserEditUrl}
        className={styles.dots}
      />

      <div
        className={styles.img}
        onClick={() => push(`/award/${award.award?.id}`)}
      >
        <ImageDefault
          src={award.award?.mainImg}
          width={175}
          height={175}
          alt='award img'
          objectFit='cover'
          className='rounded-[27px]'
          // priority={true}
        />
      </div>
      <div className={styles.info}>
        <P size='l' color='white'>
          {award.award?.name}
        </P>
        <P size='s' fontstyle='thin' color='gray96' className={styles.date}>
          Выдана {convertDate}
        </P>
      </div>
    </div>
  );
};

export default memo(CardUserAward);
