import styles from './CardUserAwarded.module.scss';
import { CardUserAwardedProps } from './CardUserAwarded.props';
import cn from 'classnames';
import { toast } from 'react-toastify';
import { useRef, useState } from 'react';
import { timeConverterUser } from '@/utils/timeConverterUser';
import useOutsideClick from '@/hooks/useOutsideClick';
import { ImageDefault } from '@/ui/ImageDefault/ImageDefault';
import P from '@/ui/P/P';
import EditPanelAuthBtn from '@/ui/EditPanelAuthBtn/EditPanelAuthBtn';
import { getUserEditUrl } from '@/config/api.config';
import AwardIcon from '@/icons/union.svg';
import { awardApi } from '@/api/award/award.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';

const CardUserAwarded = ({
  award,
  user,
  className,
  ...props
}: CardUserAwardedProps): JSX.Element => {
  let convertDate = timeConverterUser(user.date);

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const [visible, setVisible] = useState<boolean>(false);
  //Закрытие модального окна нажатием вне его
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisible(false);
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visible);

  const [deleteUserReward] = awardApi.useSendActionMutation();

  const handleRemove = async () => {
    let isError = false;

    if (award && user.user && user.user.id && typeOfUser && typeOfUser.id) {
      await deleteUserReward({
        authId: typeOfUser.id,
        awardId: award.award.id,
        userId: user.user.id,
        actionType: 'DELETE',
      })
        .unwrap()
        .catch(() => {
          isError = true;
          toast.error('Ошибка удаления');
        });

      if (!isError) {
        toast.success('Удаление успешно');
      }
    }
  };

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.contentTitle}>
        <div className={styles.img}>
          {user && (
            <ImageDefault
              src={
                user.user && user.user.images.length > 0
                  ? user.user.images[0].imageUrl
                  : undefined
              }
              width={175}
              height={175}
              alt='award img'
              objectFit='cover'
              className='rounded-[27px]'
            />
          )}
        </div>
        <P size='l'>
          {user.user?.lastname} {user.user?.firstname}
        </P>
        <P size='s' fontstyle='thin' color='gray' className={styles.post}>
          {user.user?.post}
        </P>
      </div>

      <div className={styles.date}>
        <P size='xs' fontstyle='thin' className={styles.dateRewarded}>
          {convertDate}
          <AwardIcon className={styles.icon} />
        </P>
      </div>

      {award && (
        <EditPanelAuthBtn
          onlyRemove={true}
          handleRemove={handleRemove}
          id={award.award.id.toString()}
          getUrlEdit={getUserEditUrl}
          className={styles.dots}
        />
      )}
    </div>
  );
};

export default CardUserAwarded;
