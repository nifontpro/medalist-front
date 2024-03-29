'use client';

import styles from './AwardNominee.module.scss';
import { AwardNomineeProps } from './AwardNominee.props';
import cn from 'classnames';
import uniqid from 'uniqid';
import Htag from '@/ui/Htag/Htag';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import P from '@/ui/P/P';
import AuthComponent from '@/store/providers/AuthComponent';
import CardNominee from './CardNominee/CardNominee';
import ModalWindowWithAddUsers from '../../ModalWindowWithAddUsers/ModalWindowWithAddUsers';
import { useFetchParams } from '@/hooks/useFetchParams';
import ScrollContainerWithSearchParams from '@/ui/ScrollContainerWithSearchParams/ScrollContainerWithSearchParams';
import { useAwardNomineeForAddUsers } from './useAwardNomineeForAddUsers';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import { memo, useCallback, useMemo } from 'react';
import { awardUrl } from '@/api/award/award.api';

const AwardNominee = ({
  award,
  id,
  className,
  ...props
}: AwardNomineeProps): JSX.Element => {
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
      orders: [{ field: 'user.firstname', direction: state }],
    },
    undefined,
    undefined
  );

  const totalPage = useMemo(
    () => singleActivAward?.pageInfo?.totalPages,
    [singleActivAward]
  );

  const {
    setVisibleModal,
    refOpen,
    ref,
    addUsersTotalPage,
    addUsersPage,
    addUsersSetPage,
    visibleModal,
    addUsersNextPage,
    addUsersPrevPage,
    addUsersSetSearchValue,
    handlerOpenAddUser,
    availableUsersBySubDeptForAwards,
    addUsersSearchHandleChange,
  } = useAwardNomineeForAddUsers(award);

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Htag tag='h3' className={styles.headerTitle}>
            Кто участвует
            <P className={styles.rewardedLength}>
              {singleActivAward?.pageInfo?.totalElements}
            </P>
          </Htag>

          <AuthComponent minRole='ADMIN'>
            <ButtonCircleIcon
              classNameForIcon='@apply w-[12px] h-[12px]'
              onClick={handlerOpenAddUser}
              appearance='black'
              icon='plus'
              ref={refOpen}
            >
              Добавить участников
            </ButtonCircleIcon>
          </AuthComponent>
        </div>

        <ScrollContainerWithSearchParams
          search={true}
          searchHandleChange={searchHandleChange}
        >
          {singleActivAward &&
          singleActivAward.data &&
          singleActivAward.data.length == 0 ? (
            <P className={styles.none} fontstyle='thin' size='m'>
              Нет участников
            </P>
          ) : (
            <>
              <div
                className={cn(styles.usersAwarded, {
                  [styles.hidden]: singleActivAward?.data!?.length == 0,
                })}
              >
                {singleActivAward?.data!?.map((item) => {
                  return (
                    <CardNominee
                      awardId={award!.award?.id}
                      user={item}
                      key={uniqid()}
                      userRewardAsync={userRewardAsync}
                    />
                  );
                  // }
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
          awardState='NOMINEE'
          awardId={award.award.id.toString()}
          users={availableUsersBySubDeptForAwards?.data!}
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          textBtn='Номинировать'
          ref={ref}
        />
      )}
    </div>
  );
};

export default memo(AwardNominee);
