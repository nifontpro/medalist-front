import styles from './MainActivity.module.scss';
import { MainActivityProps } from './MainActivity.props';
import cn from 'classnames';
import ArrowIconSvg from '@/icons/arrowRight.svg';
import { useRouter } from 'next/navigation';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { memo } from 'react';
import { awardApi } from '@/api/award/award.api';

const MainActivity = ({
  deptId,
  className,
  ...props
}: MainActivityProps): JSX.Element => {
  const { push } = useRouter();

  const switcher = useAppSelector((state) => state.switcher);

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // Получить Актив наград по id в отделе
  const {
    data: awardsActivOnDepartment,
    isLoading: isLoadingAwardsActivOnDept,
    isFetching: isFetchingUsersActivOnDepartment,
  } = awardApi.useGetActivAwardByDeptQuery(
    {
      authId: typeOfUser?.id!,
      deptId: deptId ? deptId : typeOfUser?.dept.id,
      awardState: undefined,
      baseRequest: {
        // subdepts: switcher,
        subdepts: true,
        page: 0,
        pageSize: 5,
        orders: [{ field: 'date', direction: 'DESC' }],
      },
    },
    {
      skip: !typeOfUser,
    }
  );

  let currentDate = +new Date();

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={styles.header}>
        <Htag tag='h2'>Активность</Htag>
        <div
          className={styles.bestActivity}
          onClick={() => {
            push(`/department/${deptId}/activity`);
          }}
        >
          <P size='s' fontstyle='thin' className={styles.text}>
            Все
          </P>
          <ArrowIcon />
        </div>
      </div>
      <ul>
        {awardsActivOnDepartment &&
        awardsActivOnDepartment.data &&
        awardsActivOnDepartment.data.length > 0 ? (
          awardsActivOnDepartment?.data!.map((item, index) => {
            if (index < 5) {
              return (
                <li key={item.id}>
                  <div className={styles.activity}>
                    <div className={styles.img}>
                      <ImageDefault
                        src={item.user?.mainImg}
                        width={64}
                        height={64}
                        alt='preview image'
                        objectFit='cover'
                        className='rounded-[10px]'
                        // priority={true}
                      />
                    </div>
                    <div className={styles.user}>
                      <P size='m'>
                        {item.user?.firstname} {item.user?.lastname}
                      </P>
                      <div className={styles.userTag}>
                        <P size='s' fontstyle='thin' color='gray'>
                          {item.award?.name}
                        </P>
                      </div>
                    </div>
                  </div>
                  {item.date &&
                  Math.floor((currentDate - item.date) / 86400000) == 0 ? (
                    <P size='xs' color='gray' fontstyle='thin'>
                      сегодня
                    </P>
                  ) : (
                    <P size='xs' color='gray' fontstyle='thin'>
                      {item.date &&
                        Math.floor((currentDate - item.date) / 86400000)}
                      &nbsp;дн
                    </P>
                  )}
                </li>
              );
            }
          })
        ) : (
          <P size='s' fontstyle='thin'>
            На данный момент активности нет
          </P>
        )}
      </ul>
    </div>
  );
};

export default memo(MainActivity);

//Для мемоизации svg icon
const ArrowIcon = memo(() => {
  return <ArrowIconSvg className={styles.arrow} />;
});
ArrowIcon.displayName = 'ArrowIcon';
//__________________
