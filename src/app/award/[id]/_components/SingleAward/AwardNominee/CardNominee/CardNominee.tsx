'use client';

import styles from './CardNominee.module.scss';
import { CardNomineeProps } from './CardNominee.props';
import cn from 'classnames';
import { useCardNominee } from './useCardNominee';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import P from '@/ui/P/P';
import Button from '@/ui/Button/Button';
import ButtonEdit from '@/ui/ButtonEdit/ButtonEdit';
import { checkRole } from '@/utils/checkRole';
import Htag from '@/ui/Htag/Htag';
import AwardIcon from '@/icons/union.svg';
import SpinnerFetching from '@/ui/SpinnerFetching/SpinnerFetching';
import { awardApi } from '@/api/award/award.api';

const CardNominee = ({
  awardId,
  user,
  userRewardAsync,
  className,
  ...props
}: CardNomineeProps): JSX.Element => {
  const [deleteUserReward, deleteUserRewardInfo] =
    awardApi.useSendActionMutation();

  let userId = user.user?.id;

  const { handleRemove, typeOfUser, rewardInfo } = useCardNominee(
    userId,
    awardId
  );

  return (
    <>
      <div className={cn(styles.wrapper, className)} {...props}>
        <div className={styles.img}>
          <ImageDefault
            src={user.user?.mainImg}
            width={76}
            height={76}
            alt='award img'
            objectFit='cover'
            className='rounded-[27px]'
            priority={true}
          />
        </div>

        <div className={styles.user}>
          <P size='l'>
            {user.user?.lastname} {user.user?.firstname}
          </P>
          <P size='s' fontstyle='thin' color='gray' className={styles.post}>
            {user.user?.post}
          </P>
        </div>

        {/* <P size='s' fontstyle='thin' color='gray' className={styles.date}>
        Какой то пост
      </P> */}

        {checkRole(typeOfUser, 'ADMIN') ? (
          <div className={styles.buttons}>
            {user.actionType === 'NOMINEE' && (
              <Button
                onClick={() =>
                  userId && userRewardAsync(awardId, 'AWARD', userId)
                }
                size='m'
                appearance='blackWhite'
              >
                Наградить
              </Button>
            )}
            {user.actionType === 'AWARD' && (
              <Button
                size='m'
                appearance='blackWhite'
                className={styles.btnDefault}
              >
                Буден награжден
              </Button>
            )}
            <ButtonEdit icon='remove' onClick={handleRemove} />
          </div>
        ) : (
          <div className={styles.buttons}>
            <Htag tag='h2'>
              {/* {user?.awards.filter((item) => item.state == 'AWARD').length} */}
              10
            </Htag>
            <AwardIcon className={styles.union} />
          </div>
        )}
      </div>
      {rewardInfo.status == 'pending' ||
      deleteUserRewardInfo.status == 'pending' ? (
        <SpinnerFetching />
      ) : null}
    </>
  );
};

export default CardNominee;
