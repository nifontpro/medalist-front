import styles from './SingleUserNominee.module.scss';
import { SingleUserNomineeProps } from './SingleUserNominee.props';
import cn from 'classnames';
import uniqid from 'uniqid';
import CardNomineeUser from './CardNomineeUser/CardNomineeUser';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import { useFetchParams } from '@/hooks/useFetchParams';
import ScrollContainerWithSearchParams from '@/ui/ScrollContainerWithSearchParams/ScrollContainerWithSearchParams';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import { memo, useMemo } from 'react';
import { awardApi } from '@/api/award/award.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';

const SingleUserNominee = ({
  user,
  id,
  className,
  ...props
}: SingleUserNomineeProps): JSX.Element => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const {
    page,
    setPage,
    searchValue,
    setSearchValue,
    searchHandleChange,
    state,
    setState,
    nextPage,
    prevPage,
    setEndDateChange,
    endDate,
    setStartDateChange,
    startDate,
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
        pageSize: 5,
        filter: searchValue,
        maxDate: endDate,
        minDate: startDate,
        orders: [{ field: 'award.name', direction: state }],
      },
      awardType: 'PERIOD',
    },
    {
      skip: !id || !typeOfUser,
    }
  );

  console.log('nominee', singleActivAwardUser);

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
        <Htag tag='h3'>Номинации</Htag>
        {totalElements && (
          <P size='s' fontstyle='thin' className={styles.countAwards}>
            {totalElements}
          </P>
        )}
      </div>

      <ScrollContainerWithSearchParams
        search={true}
        searchHandleChange={searchHandleChange}
        setEndDateChange={setEndDateChange}
        setStartDateChange={setStartDateChange}
        state={state}
        setState={setState}
      >
        {singleActivAwardUser &&
        singleActivAwardUser.data &&
        singleActivAwardUser.data.filter(
          (award) => award.award?.type == 'PERIOD'
        ).length > 0 ? (
          <>
            <div className={styles.content}>
              {singleActivAwardUser.data!.map((award) => {
                if (award.award?.type == 'PERIOD') {
                  return (
                    <CardNomineeUser
                      key={uniqid()}
                      userId={user?.user.id}
                      award={award}
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
            У вас пока нет номинаций
          </P>
        )}
      </ScrollContainerWithSearchParams>
    </div>
  );
};

export default memo(SingleUserNominee);
