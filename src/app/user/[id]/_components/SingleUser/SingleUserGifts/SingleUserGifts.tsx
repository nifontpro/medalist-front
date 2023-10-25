import Htag from '@/ui/Htag/Htag';
import styles from './SingleUserGifts.module.scss';
import { SingleUserGiftsProps } from './SingleUserGifts.props';
import cn from 'classnames';
import uniqid from 'uniqid';
import P from '@/ui/P/P';
import CardUserAward from './CardUserGift/CardUserGift';
import { useFetchParams } from '@/hooks/useFetchParams';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import { memo, useMemo } from 'react';
import { awardApi } from '@/api/award/award.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';

const SingleUserGifts = ({
  user,
  id,
  className,
  ...props
}: SingleUserGiftsProps): JSX.Element => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const {
    page,
    setPage,
    searchValue,
    setSearchValue,
    searchHandleChange,
    nextPage,
    prevPage,
    setEndDateChange,
    endDate,
    setStartDateChange,
    startDate,
    state,
    setState,
  } = useFetchParams();

  const { userRewardAsync } = useAwardAdmin();

  // Получить Актив награды по id пользователя
  const {
    data: singleActivAwardUser,
    isLoading: isLoadingSingleActivAwardUser,
  } = awardApi.useGetActivAwardByUserQuery(
    {
      authId: typeOfUser?.id!,
      userId: Number(id),
      baseRequest: {
        page: page,
        pageSize: 4,
        filter: searchValue,
        maxDate: endDate,
        minDate: startDate,
        orders: [{ field: 'award.name', direction: state }],
      },
      awardType: 'SIMPLE',
    },
    {
      skip: !id || !typeOfUser,
    }
  );

  const totalPage = useMemo(
    () => singleActivAwardUser?.pageInfo?.totalPages,
    [singleActivAwardUser]
  );

  const totalElements = useMemo(
    () => singleActivAwardUser?.pageInfo?.totalElements,
    [singleActivAwardUser]
  );

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.title}>
        <Htag tag='h3'>Призы</Htag>
        {totalElements && (
          <P size='s' fontstyle='thin' className={styles.countAwards}>
            {totalElements}
          </P>
        )}
      </div>

      {singleActivAwardUser &&
      singleActivAwardUser.data &&
      singleActivAwardUser.data.filter((award) => award.award?.type == 'SIMPLE')
        .length > 0 ? (
        <>
          <div className={styles.content}>
            {singleActivAwardUser?.data!.map((award) => {
              if (award.award?.type == 'SIMPLE') {
                return (
                  <CardUserAward
                    key={uniqid()}
                    award={award}
                    user={user}
                    userRewardAsync={userRewardAsync}
                  />
                );
              }
            })}
          </div>
          {totalPage && totalPage > 1 ? (
            <PrevNextPages
              startPage={page + 1}
              endPage={totalPage}
              handleNextClick={() =>
                singleActivAwardUser && nextPage(singleActivAwardUser)
              }
              handlePrevClick={prevPage}
            />
          ) : null}
        </>
      ) : (
        <P size='s' fontstyle='thin' className={styles.none}>
          У вас пока нет призов
        </P>
      )}
    </div>
  );
};

export default memo(SingleUserGifts);
