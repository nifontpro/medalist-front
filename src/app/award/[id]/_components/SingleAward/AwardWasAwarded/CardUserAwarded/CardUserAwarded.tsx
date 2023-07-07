import styles from './CardUserAwarded.module.scss';
import { CardUserAwardedProps } from './CardUserAwarded.props';
import cn from 'classnames';
import { useRef, useState } from 'react';
import { timeConverterUser } from '@/utils/timeConverterUser';
import useOutsideClick from '@/hooks/useOutsideClick';
import { ImageDefault } from '@/ui/ImageDefault/ImageDefault';
import P from '@/ui/P/P';
import EditPanelAuthBtn from '@/ui/EditPanelAuthBtn/EditPanelAuthBtn';
import { getUserEditUrl } from '@/config/api.config';
import AwardIcon from '@/icons/union.svg';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';

const CardUserAwarded = ({
  award,
  user,
  className,
  ...props
}: CardUserAwardedProps): JSX.Element => {
  let convertDate = timeConverterUser(user.date);

  const userId = user.user?.id;

  const [visible, setVisible] = useState<boolean>(false);
  //Закрытие модального окна нажатием вне его
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisible(false);
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visible);

  const { userRewardAsync } = useAwardAdmin();

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.contentTitle}>
        <div className={styles.img}>
          {user && (
            <ImageDefault
              src={user.user?.mainImg}
              width={64}
              height={64}
              alt='award img'
              objectFit='cover'
              className='rounded-[27px]'
            />
          )}
        </div>
        <div>
          <P size='l' className={styles.fio}>
            {user.user?.lastname} {user.user?.firstname}
          </P>
          <P size='s' fontstyle='thin' color='gray' className={styles.post}>
            {user.user?.post}
          </P>
        </div>
      </div>

      <div className={styles.date}>
        <P size='xs' fontstyle='thin' className={styles.dateRewarded}>
          {convertDate}
          <AwardIcon className={styles.icon} />
        </P>
      </div>

      {award && userId && (
        <EditPanelAuthBtn
          onlyRemove={true}
          handleRemove={() => userRewardAsync(award.award.id, 'DELETE', userId)}
          id={award.award.id.toString()}
          getUrlEdit={getUserEditUrl}
          className={styles.dots}
        />
      )}
    </div>
  );
};

export default CardUserAwarded;
