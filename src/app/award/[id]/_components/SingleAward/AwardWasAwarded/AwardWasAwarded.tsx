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

const AwardWasAwarded = ({
  award,
  id,
  className,
  ...props
}: AwardWasAwardedProps): JSX.Element => {
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

  const {
    singleActivAward,
    isLoadingSingleActivAward,
    isFetchingSingleActivAward,
    userRewardAsync,
  } = useAwardAdmin(
    id,
    {
      page: page,
      pageSize: 5,
      filter: searchValue,
      orders: [{ field: 'user.firstname', direction: 'ASC' }],
    },
    undefined,
    'AWARD'
  );
  const totalPage = singleActivAward?.pageInfo?.totalPages;

  const {
    usersOnSubDepartment,
    ref,
    refOpen,
    visibleModal,
    setVisibleModal,
    arrUserNotAwarded,
    addUsersPage,
    addUsersSetPage,
    addUsersSetSearchValue,
    addUsersNextPage,
    addUsersPrevPage,
    addUsersTotalPage,
    handlerAddUsers,
  } = useAwardWasAwardedForAddUsers(award, singleActivAward?.data!);

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
          singleActivAward.data.length >= 0 ? (
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
            usersOnSubDepartment && addUsersNextPage(usersOnSubDepartment)
          }
          prevPage={addUsersPrevPage}
          page={addUsersPage}
          setPage={addUsersSetPage}
          setSearchValue={addUsersSetSearchValue}
          awardState='AWARD'
          awardId={award.award.id.toString()}
          users={arrUserNotAwarded}
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
