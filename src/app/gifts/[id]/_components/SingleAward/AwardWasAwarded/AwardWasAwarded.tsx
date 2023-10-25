'use client';

import styles from './AwardWasAwarded.module.scss';
import { AwardWasAwardedProps } from './AwardWasAwarded.props';
import cn from 'classnames';
import uniqid from 'uniqid';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import AuthComponent from '@/store/providers/AuthComponent';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';
import CardUserAwarded from './CardUserAwarded/CardUserAwarded';
import ModalWindowWithAddUsers from '../../ModalWindowWithAddUsers/ModalWindowWithAddUsers';
import { useFetchParams } from '@/hooks/useFetchParams';
import ScrollContainerWithSearchParams from '@/ui/ScrollContainerWithSearchParams/ScrollContainerWithSearchParams';
import { useAwardWasAwardedForAddUsers } from './useAwardWasAwardedForAddUsers';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import { memo } from 'react';
import { awardApi } from '@/api/award/award.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';

const AwardWasAwarded = ({
  award,
  id,
  className,
  ...props
}: AwardWasAwardedProps): JSX.Element => {
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
  } = useFetchParams();

  // Получить Актив награды по id награды
  const {
    data: singleActivAward,
    isLoading: isLoadingSingleActivAward,
    isFetching: isFetchingSingleActivAward,
  } = awardApi.useGetUsersByActivAwardQuery(
    {
      authId: typeOfUser?.id!,
      awardId: Number(id),
      baseRequest: {
        page: page,
        pageSize: 5,
        filter: searchValue,
        orders: [{ field: 'user.firstname', direction: 'ASC' }],
      },
      actionType: 'AWARD',
    },
    {
      skip: !id || !typeOfUser,
    }
  );

  const { userRewardAsync } = useAwardAdmin();

  const totalPage = singleActivAward?.pageInfo?.totalPages;

  const {
    ref,
    refOpen,
    visibleModal,
    setVisibleModal,
    addUsersPage,
    addUsersSetPage,
    addUsersSetSearchValue,
    addUsersNextPage,
    addUsersPrevPage,
    addUsersTotalPage,
    handlerAddUsers,
    addUsersSearchHandleChange,
    availableUsersBySubDeptForAwards,
  } = useAwardWasAwardedForAddUsers(award);

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Htag tag='h3' className={styles.headerTitle}>
            Награжденные
            <P className={styles.rewardedLength}>
              {singleActivAward?.pageInfo?.totalElements}
            </P>
          </Htag>
          <AuthComponent minRole={'ADMIN'}>
            <ButtonCircleIcon
              onClick={handlerAddUsers}
              classNameForIcon='@apply w-[12px] h-[12px]'
              appearance='black'
              icon='plus'
              className='font-bold'
              ref={refOpen}
            >
              Наградить еще
            </ButtonCircleIcon>
          </AuthComponent>
        </div>

        <ScrollContainerWithSearchParams
          search={true}
          searchHandleChange={searchHandleChange}
        >
          {singleActivAward &&
          singleActivAward.data &&
          singleActivAward.data.length > 0 ? (
            <>
              <div className={styles.usersAwarded}>
                {singleActivAward.data.map((item) => {
                  return (
                    <CardUserAwarded
                      award={award}
                      user={item}
                      key={uniqid()}
                      userRewardAsync={userRewardAsync}
                    />
                  );
                })}
              </div>
              {totalPage && totalPage > 1 ? (
                <PrevNextPages
                  startPage={page + 1}
                  endPage={totalPage}
                  handleNextClick={() =>
                    singleActivAward && nextPage(singleActivAward)
                  }
                  handlePrevClick={prevPage}
                />
              ) : null}
            </>
          ) : (
            <>
              <P className={styles.none} fontstyle='thin' size='m'>
                Нет награжденных
              </P>
              {totalPage && totalPage > 1 ? (
                <PrevNextPages
                  startPage={page + 1}
                  endPage={totalPage}
                  handleNextClick={() =>
                    singleActivAward && nextPage(singleActivAward)
                  }
                  handlePrevClick={prevPage}
                />
              ) : null}
            </>
          )}
        </ScrollContainerWithSearchParams>
      </div>
      {award?.award.id && (
        <ModalWindowWithAddUsers
          totalPage={addUsersTotalPage}
          nextPage={() =>
            availableUsersBySubDeptForAwards &&
            addUsersNextPage(availableUsersBySubDeptForAwards)
          }
          prevPage={addUsersPrevPage}
          page={addUsersPage}
          setPage={addUsersSetPage}
          setSearchValue={addUsersSetSearchValue}
          addUsersSearchHandleChange={addUsersSearchHandleChange}
          awardState='AWARD'
          awardId={award.award.id.toString()}
          users={availableUsersBySubDeptForAwards?.data!}
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          textBtn='Выдать награду'
          ref={ref}
        />
      )}
    </div>
  );
};

export default memo(AwardWasAwarded);
