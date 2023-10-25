import styles from './CardUserGift.module.scss';
import { CardUserGiftProps } from './CardUserGift.props';
import cn from 'classnames';
import { timeConverterUser } from '@/utils/timeConverterUser';
import EditPanelAuthBtn from '@/ui/EditPanelAuthBtn/EditPanelAuthBtn';
import { getUserEditUrl } from '@/config/api.config';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import P from '@/ui/P/P';
import { memo, useMemo } from 'react';
import { useRouter } from 'next/navigation';

const CardUserGift = ({
  user,
  award,
  userRewardAsync,
  className,
  ...props
}: CardUserGiftProps): JSX.Element => {
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
          width={300}
          height={300}
          alt='award img'
          className='rounded-[27px]'
          forWhat='award'
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

export default memo(CardUserGift);
