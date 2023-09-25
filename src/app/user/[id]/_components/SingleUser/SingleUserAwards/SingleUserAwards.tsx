import Htag from '@/ui/Htag/Htag';
import styles from './SingleUserAwards.module.scss';
import { SingleUserAwardsProps } from './SingleUserAwards.props';
import cn from 'classnames';
import uniqid from 'uniqid';
import P from '@/ui/P/P';
import CardUserAward from './CardUserAward/CardUserAward';
import ScrollContainerWithSearchParams from '@/ui/ScrollContainerWithSearchParams/ScrollContainerWithSearchParams';
import { useFetchParams } from '@/hooks/useFetchParams';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import { memo, useMemo } from 'react';

const SingleUserAwards = ({
  user,
  id,
  className,
  ...props
}: SingleUserAwardsProps): JSX.Element => {
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

  const { singleActivAwardUser, userRewardAsync } = useAwardAdmin(
    id,
    {
      page: page,
      pageSize: 6,
      filter: searchValue,
      maxDate: endDate,
      minDate: startDate,
      orders: [{ field: 'award.name', direction: state }],
    },
    undefined,
    undefined,
    'SIMPLE'
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
        <Htag tag='h3'>Награды</Htag>
        {totalElements && (
          <P size='s' fontstyle='thin' className={styles.countAwards}>
            {totalElements}
          </P>
        )}
      </div>

      <ScrollContainerWithSearchParams
        search={true}
        setEndDateChange={setEndDateChange}
        setStartDateChange={setStartDateChange}
        state={state}
        setState={setState}
        searchHandleChange={searchHandleChange}
      >
        {singleActivAwardUser &&
        singleActivAwardUser.data &&
        singleActivAwardUser.data.filter(
          (award) => award.award?.type == 'SIMPLE'
        ).length > 0 ? (
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
            У вас пока нет медалей
          </P>
        )}
      </ScrollContainerWithSearchParams>
    </div>
  );
};

export default memo(SingleUserAwards);
