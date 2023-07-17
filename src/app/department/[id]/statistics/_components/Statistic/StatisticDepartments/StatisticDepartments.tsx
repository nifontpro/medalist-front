import styles from './StatisticDepartments.module.scss';
import uniqid from 'uniqid';
import { StatisticDepartmentsProps } from './StatisticDepartments.props';
import cn from 'classnames';
import AwardIcon from '@/icons/union.svg';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import P from '@/ui/P/P';
import Htag from '@/ui/Htag/Htag';
import SpinnerSmall from '@/ui/SpinnerSmall/SpinnerSmall';
import { useFetchParams } from '@/hooks/useFetchParams';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';

const StatisticDepartments = ({
  departId,
  className,
  ...props
}: StatisticDepartmentsProps): JSX.Element => {
  const {
    page,
    setPage,
    searchValue,
    setSearchValue,
    state,
    setState,
    nextPage,
    prevPage,
  } = useFetchParams();

  const { colAwardsActivRoot, isLoadingColAwardsActivRoot } = useAwardAdmin(
    departId,
    {
      orders: [{ field: '(awardCount)', direction: 'DESC' }],
      subdepts: true,
      page: page,
      pageSize: 5,
    }
  );

  const totalPage = colAwardsActivRoot?.pageInfo?.totalPages;

  if (!colAwardsActivRoot?.success && !isLoadingColAwardsActivRoot)
    return <div className={styles.wrapper}>Ошибка получения данных</div>;

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      {!isLoadingColAwardsActivRoot && colAwardsActivRoot ? (
        <>
          <div>
            {colAwardsActivRoot.data?.map((depart, index) => {
              if (index == 0 && page === 0) {
                return (
                  <div
                    key={uniqid()}
                    className={cn(styles.bestDepart, styles.depart)}
                  >
                    <div>
                      <P size='l'>{depart.deptName}</P>
                      <P size='xs' className={styles.best}>
                        Лучший отдел
                      </P>
                    </div>
                    <div className={styles.countAwards}>
                      <Htag className={styles.count} tag='h2'>
                        {depart.awardCount}
                      </Htag>
                      <AwardIcon className='@apply ml-[10px] w-[17px] h-[24px]' />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={uniqid()} className={styles.depart}>
                    <P size='l'>{depart.deptName}</P>
                    <div className={styles.countAwards}>
                      <Htag className={styles.count} tag='h2'>
                        {depart.awardCount}
                      </Htag>
                      <AwardIcon className='@apply ml-[10px] w-[17px] h-[24px]' />
                    </div>
                  </div>
                );
              }
            })}
          </div>

          {totalPage && totalPage > 1 ? (
            <PrevNextPages
              startPage={page + 1}
              endPage={totalPage}
              handleNextClick={() =>
                colAwardsActivRoot && nextPage(colAwardsActivRoot)
              }
              handlePrevClick={prevPage}
            />
          ) : null}
        </>
      ) : (
        <SpinnerSmall />
      )}
    </div>
  );
};

export default StatisticDepartments;
