import styles from './MainAwards.module.scss';
import { MainAwardsProps } from './MainAwards.props';
import cn from 'classnames';
import ArrowIcon from '@/icons/arrowRight.svg';
import CupIcon from '@/icons/cup.svg';
import PeopleIcon from '@/icons/people.svg';
import UnionIcon from '@/icons/union.svg';
import { useRouter } from 'next/navigation';
import P from '@/ui/P/P';
import Htag from '@/ui/Htag/Htag';
import { useAwardAdmin } from '@/app/award/useAwardAdmin';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { useUserAdmin } from '@/app/user/useUserAdmin';

const MainAwards = ({
  // awards,
  // users,
  // awardsOnCompanyGroupDep,
  className,
  ...props
}: MainAwardsProps): JSX.Element => {
  const { push } = useRouter();

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { colAwardsOnDepartment, isLoadingColAwardsOnDept } = useAwardAdmin(
    typeOfUser?.dept.id,
    { subdepts: true }
  );

  const { usersOnDepartmentWithAwards, isLoadingUsersOnDepartmentWithAwards } =
    useUserAdmin(typeOfUser?.dept.id);

  let awards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let awardsOnCompanyGroupDep = [
    {
      id: {
        name: 'Frontend',
      },
    },
  ];

  let countAll =
    colAwardsOnDepartment &&
    colAwardsOnDepartment.data &&
    colAwardsOnDepartment?.data?.finish +
      colAwardsOnDepartment?.data?.nominee +
      colAwardsOnDepartment?.data?.future +
      colAwardsOnDepartment?.data?.error;
  let countUserWithAwardAndWithout = usersOnDepartmentWithAwards?.data?.length;
  let countUserWithAward = usersOnDepartmentWithAwards?.data?.filter(
    (user) => user.awards && user.awards?.length > 0
  ).length;
  let countUserWithAwardPercent =
    countUserWithAward &&
    countUserWithAwardAndWithout &&
    Math.ceil((countUserWithAward * 100) / countUserWithAwardAndWithout);

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <Htag tag='h2'>Медали</Htag>
      <div className={styles.content}>
        <div
          className={cn(styles.allAwards, styles.card)}
          onClick={() => push(`/department/${typeOfUser?.dept.id}/awards`)}
        >
          <div className='flex'>
            <div className={styles.img}>
              <CupIcon className={styles.imgSvg} />
            </div>
            <div className={styles.description}>
              <P size='s'>Наград в подразделении</P>
              {countAll ? <P size='xl'>{countAll}</P> : <P size='xl'>0</P>}
            </div>
          </div>
          <ArrowIcon className={styles.arrow} />
        </div>
        <div
          className={cn(styles.countAwards, styles.card)}
          onClick={() => push(`/department/${typeOfUser?.dept.id}/statistics`)}
        >
          <div className='flex'>
            <div className={styles.img}>
              <PeopleIcon className={styles.imgSvg} />
            </div>
            <div className={styles.description}>
              <P size='s'>Есть награды</P>
              <div className='flex items-end'>
                <P size='xl'>{countUserWithAward}</P>
                <P size='l' color='gray' className={styles.percent}>
                  {Number.isNaN(countUserWithAwardPercent)
                    ? '0'
                    : countUserWithAwardPercent}{' '}
                  %
                </P>
              </div>
            </div>
          </div>
          <ArrowIcon className={styles.arrow} />
        </div>
        <div
          className={cn(styles.bestDepart, styles.card)}
          onClick={() => push(`/department/${typeOfUser?.dept.id}/statistics`)}
        >
          <div className='flex'>
            <div className={styles.img}>
              <UnionIcon className={styles.imgSvg} />
            </div>

            <div className={styles.description}>
              <P size='s' fontstyle='thin'>
                Лучший отдел
              </P>
              <P size='m' className={styles.countAwardsTitle}>
                {awardsOnCompanyGroupDep[0] &&
                  awardsOnCompanyGroupDep[0].id.name}
              </P>
            </div>
          </div>
          <ArrowIcon className={styles.arrow} />
        </div>
      </div>
    </div>
  );
};

export default MainAwards;
