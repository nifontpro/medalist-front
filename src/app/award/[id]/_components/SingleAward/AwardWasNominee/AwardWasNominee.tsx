import Htag from '@/ui/Htag/Htag';
import styles from './AwardWasNominee.module.scss';
import { AwardWasNomineeProps } from './AwardWasNominee.props';
import cn from 'classnames';
import uniqid from 'uniqid';
import P from '@/ui/P/P';
import CardUserNominee from './CardUserNominee/CardUserNominee';
import ScrollContainerWithSearchParams from '@/ui/ScrollContainerWithSearchParams/ScrollContainerWithSearchParams';
import { useFetchParams } from '@/hooks/useFetchParams';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import { memo, useMemo } from 'react';

const AwardWasNominee = ({
  award,
  id,
  className,
  ...props
}: AwardWasNomineeProps): JSX.Element => {
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
  } = useAwardAdmin(
    id,
    {
      page: page,
      pageSize: 6,
      filter: searchValue,
      orders: [{ field: 'user.firstname', direction: state }],
    },
    undefined,
    'NOMINEE'
  );
  const totalPage = useMemo(
    () => singleActivAward?.pageInfo?.totalPages,
    [singleActivAward]
  );

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Htag tag='h3'>Были номинированы </Htag>
          <P className={styles.rewardedLength}>
            {singleActivAward?.pageInfo?.totalElements}
          </P>
        </div>

        <ScrollContainerWithSearchParams
          search={true}
          searchHandleChange={searchHandleChange}
        >
          {singleActivAward &&
          singleActivAward.data &&
          singleActivAward.data.findIndex(
            (item) => item.actionType === 'NOMINEE'
          ) >= 0 ? (
            <>
              <div className={styles.usersAwarded}>
                {singleActivAward?.data!.map((item) => {
                  if (item.actionType === 'NOMINEE') {
                    return (
                      <CardUserNominee
                        award={award}
                        user={item}
                        key={uniqid()}
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
                    singleActivAward && nextPage(singleActivAward)
                  }
                  handlePrevClick={prevPage}
                />
              ) : null}
            </>
          ) : (
            <>
              <P className={styles.none} fontstyle='thin' size='m'>
                Нет номинантов
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
    </div>
  );
};

export default memo(AwardWasNominee);
