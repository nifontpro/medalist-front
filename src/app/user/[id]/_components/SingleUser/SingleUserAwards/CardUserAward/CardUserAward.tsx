import styles from './CardUserAward.module.scss';
import { CardUserAwardProps } from './CardUserAward.props';
import cn from 'classnames';
import { timeConverterUser } from '@/utils/timeConverterUser';
import EditPanelAuthBtn from '@/ui/EditPanelAuthBtn/EditPanelAuthBtn';
import { getUserEditUrl } from '@/config/api.config';
import { ImageDefault } from '@/ui/ImageDefault/ImageDefault';
import P from '@/ui/P/P';
import { useAwardAdmin } from '@/app/award/useAwardAdmin';

const CardUserAward = ({
  user,
  award,
  className,
  ...props
}: CardUserAwardProps): JSX.Element => {
  let convertDate = timeConverterUser(award.date);

  const { userRewardAsync } = useAwardAdmin();

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

      <div className={styles.img}>
        <ImageDefault
          src={
            award.award && award.award?.images.length > 0
              ? award.award?.images[0].imageUrl
              : undefined
          }
          width={175}
          height={175}
          alt='award img'
          objectFit='cover'
          className='rounded-[27px]'
          // priority={true}
        />
      </div>
      <P size='l' color='white'>
        {award.award?.name}
      </P>
      <P size='s' fontstyle='thin' color='gray96' className={styles.date}>
        Выдана {convertDate}
      </P>
    </div>
  );
};

export default CardUserAward;
