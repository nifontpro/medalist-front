import styles from './StatisticCountNominee.module.scss';
import { StatisticCountNomineeProps } from './StatisticCountNominee.props';
import cn from 'classnames';
import ArrowIconSvg from '@/icons/arrowRight.svg';
import CupIconSvg from '@/icons/cup.svg';
import P from '@/ui/P/P';
import SpinnerSmall from '@/ui/SpinnerSmall/SpinnerSmall';
import { memo } from 'react';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { awardApi } from '@/api/award/award.api';

const StatisticCountNominee = ({
  departId,
  className,
  ...props
}: StatisticCountNomineeProps): JSX.Element => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const switcher = useAppSelector((state) => state.switcher);

  // Получить колличество наград в отделе
  const { data: colAwardsOnDepartment, isLoading: isLoadingColAwardsOnDept } =
    awardApi.useGetAwardCountQuery(
      {
        authId: typeOfUser?.id!,
        deptId: Number(departId),
        baseRequest: {
          // subdepts: switcher
          subdepts: true,
        },
      },
      {
        skip: !departId || !typeOfUser,
      }
    );

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={cn(styles.allAwards, styles.card)}>
        <div className='flex'>
          <CupIcon />
          <div>
            <P size='s' className={styles.descriptionTitle}>
              Номинации
            </P>
            {!isLoadingColAwardsOnDept &&
            colAwardsOnDepartment &&
            colAwardsOnDepartment.data ? (
              <P size='xl'>
                {colAwardsOnDepartment.data?.future +
                  colAwardsOnDepartment.data?.nominee}
              </P>
            ) : (
              <SpinnerSmall position='start' />
            )}
          </div>
        </div>
        <ArrowIcon />
      </div>
    </div>
  );
};

export default memo(StatisticCountNominee);

//Для мемоизации svg icon
const CupIcon = memo(() => {
  return <CupIconSvg className={styles.img} />;
});
CupIcon.displayName = 'CupIcon';

const ArrowIcon = memo(() => {
  return <ArrowIconSvg className={styles.arrow} />;
});
ArrowIcon.displayName = 'ArrowIcon';
//__________________
