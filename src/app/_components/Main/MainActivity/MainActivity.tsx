import styles from './MainActivity.module.scss';
import { MainActivityProps } from './MainActivity.props';
import cn from 'classnames';
import ArrowIcon from '@/icons/arrowRight.svg';
import { useRouter } from 'next/navigation';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import { memo, useMemo } from 'react';

const MainActivity = ({
  className,
  ...props
}: MainActivityProps): JSX.Element => {
  const { push } = useRouter();

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { awardsActivOnDepartment, isLoadingAwardsActivOnDept } = useAwardAdmin(
    typeOfUser?.dept.id,
    {
      subdepts: true,
      page: 0,
      pageSize: 5,
      orders: [{ field: 'date', direction: 'DESC' }],
    }
  );

  let currentDate = +new Date();

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={styles.header}>
        <Htag tag='h2'>Активность</Htag>
        <div className={styles.bestActivity} onClick={() => push('/activity')}>
          <P size='s' fontstyle='thin' className={styles.text}>
            Все
          </P>
          <ArrowIcon className={styles.arrow} />
        </div>
      </div>
      <ul>
        {awardsActivOnDepartment?.data!.map((item, index) => {
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
                      {item.user?.lastname} {item.user?.firstname}
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
                  <P size='m' color='gray' fontstyle='thin'>
                    сегодня
                  </P>
                ) : (
                  <P size='m' color='gray' fontstyle='thin'>
                    {item.date &&
                      Math.floor((currentDate - item.date) / 86400000)}
                    &nbsp;дн
                  </P>
                )}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default memo(MainActivity);
