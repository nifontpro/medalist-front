import styles from './StatisticDepartments.module.scss';
import uniqid from 'uniqid';
import { StatisticDepartmentsProps } from './StatisticDepartments.props';
import cn from 'classnames';
import AwardIconSvg from '@/icons/union.svg';
import P from '@/ui/P/P';
import Htag from '@/ui/Htag/Htag';
import { useFetchParams } from '@/hooks/useFetchParams';
import PrevNextPages from '@/ui/PrevNextPages/PrevNextPages';
import { memo, useMemo } from 'react';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { awardApi } from '@/api/award/award.api';

const StatisticDepartments = ({
  departId,
  className,
  ...props
}: StatisticDepartmentsProps): JSX.Element => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

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

  // С КОРНЕВОГО ОТДЕЛА ! Получение количества активных награждений (наград у пользователей) разных типов в компании
  const { data: colAwardsActivRoot, isLoading: isLoadingColAwardsActivRoot } =
    awardApi.useGetActivCountRootQuery(
      {
        authId: typeOfUser?.id!,
        deptId: Number(departId),
        baseRequest: {
          orders: [{ field: '(awardCount)', direction: 'DESC' }],
          subdepts: true,
          page: page,
          pageSize: 5,
        },
      },
      {
        skip: !departId || !typeOfUser,
      }
    );

  const totalPage = useMemo(
    () => colAwardsActivRoot?.pageInfo?.totalPages,
    [colAwardsActivRoot]
  );

  if (!colAwardsActivRoot?.success && !isLoadingColAwardsActivRoot)
    return <div className={styles.wrapper}>Ошибка получения данных</div>;

  if (!isLoadingColAwardsActivRoot && colAwardsActivRoot) {
    return (
      <div {...props} className={cn(styles.wrapper, className)}>
        <div>
          {colAwardsActivRoot?.data?.map((depart, index) => {
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
                    <AwardIcon />
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
                    <AwardIcon />
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
      </div>
    );
  } else return <></>;
};

export default memo(StatisticDepartments);

//Для мемоизации svg icon
const AwardIcon = memo(() => {
  return <AwardIconSvg className='@apply ml-[10px] w-[17px] h-[24px]' />;
});
AwardIcon.displayName = 'AwardIcon';
//__________________
