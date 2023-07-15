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
  const totalPage = singleActivAward?.pageInfo?.totalPages;

  const {
    setVisibleModal,
    refOpen,
    ref,
    arrIdUserNominee,
    addUsersTotalPage,
    addUsersPage,
    addUsersSetPage,
    visibleModal,
    addUsersNextPage,
    addUsersPrevPage,
    addUsersSetSearchValue,
    usersOnSubDepartment,
    arrUserNotNominee,
  } = useAwardNomineeForAddUsers(award, singleActivAward?.data!);

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
              onClick={() => setVisibleModal(true)}
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
                  // if (
                  //   item.actionType === 'NOMINEE' ||
                  //   item.actionType === 'AWARD'
                  // ) {
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
            usersOnSubDepartment && addUsersNextPage(usersOnSubDepartment)
          }
          prevPage={addUsersPrevPage}
          page={addUsersPage}
          setPage={addUsersSetPage}
          setSearchValue={addUsersSetSearchValue}
          awardState='NOMINEE'
          awardId={award.award.id.toString()}
          users={arrUserNotNominee}
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          textBtn='Номинировать'
          ref={ref}
        />
      )}
    </div>
  );
};

export default AwardNominee;
