import styles from './UserListRating.module.scss';
import { UserListRatingProps } from './UserListRating.props';
import cn from 'classnames';
import uniqid from 'uniqid';
import AwardIcon from '@/icons/union.svg';
import ArrowRightIcon from '@/icons/arrowRight.svg';
import Link from 'next/link';
import { getUserUrl } from '@/config/api.config';
import P from '../P/P';
import ImageDefault from '../ImageDefault/ImageDefault';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import Htag from '../Htag/Htag';
import { memo, useState } from 'react';
import { useWindowSize } from '@/hooks/useWindowSize';

const UserListRating = ({
  currentRank,
  users,
  withoutCountAwards,
  page,
  pageSize,
  className,
  ...props
}: UserListRatingProps): JSX.Element => {
  let previousAwardCount = 0;
  if (users) previousAwardCount = users[0].awardCount;

  const { windowSize } = useWindowSize();

  return (
    <div
      {...props}
      className={cn(
        {
          [styles.wrapperWithoutCountAwards]: withoutCountAwards == false,
          [styles.wrapper]: withoutCountAwards == true,
        },
        className
      )}
    >
      {users?.map((user, index) => {
        if (user.awardCount < previousAwardCount) {
          currentRank += 1;
          previousAwardCount = user.awardCount;
        }

        if (user.awardCount > 0)
          return (
            <Link key={uniqid()} href={getUserUrl(`/${user.id}`)}>
              <div className={styles.userWrapper}>
                <P
                  size='s'
                  fontstyle='thin'
                  className={styles.numberOfRating}
                  color='gray'
                >
                  #{currentRank}
                  {/* {pageSize && page && page > 0
                    ? currentRank + page * 1
                    : currentRank} */}
                  {/* {pageSize && page && page > 0
                    ? index + 1 + page * pageSize
                    : index + 1} */}
                </P>
                <div className={styles.img}>
                  <ImageDefault
                    src={user.mainImg}
                    width={70}
                    height={70}
                    alt='preview image'
                    // objectFit='cover'
                    className={`rounded-[10px] ${
                      windowSize.winWidth < 500
                        ? 'h-[40px] w-[40px]'
                        : 'h-[70px] w-[70px]'
                    }`}
                    forWhat='user'
                  />
                </div>
                <div className={styles.user}>
                  <P size='m'>
                    {user.firstname} {user.lastname}
                  </P>
                  <div className={styles.userTag}>
                    {user.post && (
                      <P size='s' fontstyle='thin' color='gray'>
                        {user.post}
                      </P>
                    )}
                  </div>
                </div>
                {user.dept ? (
                  <ButtonIcon className={styles.depart} appearance='graySilver'>
                    {user.dept.name}
                  </ButtonIcon>
                ) : (
                  <ButtonIcon className={styles.depart} appearance='graySilver'>
                    Нет отдела
                  </ButtonIcon>
                )}

                <div
                  className={cn({
                    [styles.countAwards]: user.awardCount > 0,
                    [styles.countAwardsDisable]: user.awardCount == 0,
                  })}
                >
                  <>
                    <Htag
                      tag='h2'
                      className={cn({
                        [styles.disabled]: user.awardCount == 0,
                      })}
                    >
                      {user.awardCount}
                    </Htag>
                    <AwardIcon className={styles.union} />
                  </>
                </div>

                {withoutCountAwards == true ? (
                  <div className={styles.viewerAward}>
                    {user.awards &&
                      user.awards
                        .filter((item) => item.state == 'FINISH')
                        .map((award, index) => {
                          if (index < 3) {
                            return (
                              <div
                                className={cn(styles.imgAward)}
                                key={uniqid()}
                              >
                                <ImageDefault
                                  src={award.mainImg}
                                  width={windowSize.winWidth < 500 ? 40 : 70}
                                  height={50}
                                  alt='preview image'
                                  // objectFit='cover'
                                  className={`rounded-full ${
                                    windowSize.winWidth < 800
                                      ? 'h-[40px] w-[40px]'
                                      : 'h-[70px] w-[70px]'
                                  }`}
                                  // priority={true}
                                  forWhat='award'
                                />
                              </div>
                            );
                          }
                        })}
                    {user.awards &&
                    user.awards.filter((item) => item.state == 'FINISH')
                      .length > 3 ? (
                      <ButtonIcon
                        appearance='black'
                        className={styles.countPreview}
                      >
                        +
                        {user.awards.filter((item) => item.state == 'FINISH')
                          .length - 3}
                      </ButtonIcon>
                    ) : (
                      <div className={styles.countIconDisabled}></div>
                    )}
                  </div>
                ) : (
                  ''
                )}
                <div className={styles.arrowRight}>
                  <ArrowRightIcon />
                </div>
              </div>
            </Link>
          );
      })}
    </div>
  );
};

export default memo(UserListRating);
