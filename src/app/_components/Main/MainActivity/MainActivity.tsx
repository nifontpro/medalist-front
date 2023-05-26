import styles from './MainActivity.module.scss';
import { MainActivityProps } from './MainActivity.props';
import cn from 'classnames';
import ArrowIcon from '@/icons/arrowRight.svg';
import { useRouter } from 'next/navigation';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';
import { ImageDefault } from '@/ui/ImageDefault/ImageDefault';

const MainActivity = ({
  className,
  ...props
}: MainActivityProps): JSX.Element => {

  // const { data: allActivity } = activityApi.useGetAwardCountQuery({
  //   companyId: currentCompany!.id,
  //   sort: -1,
  // });

  let currentDate = +new Date();

  const { push } = useRouter();
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
      {/* <ul>
        {allActivity?.map((item, index) => {
          if (index < 3) {
            return (
              <li key={item.id}>
                <div className={styles.activity}>
                  <div className={styles.img}>
                    <ImageDefault
                      src={item.user?.imageUrl}
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
                      {item.user?.lastname} {item.user?.name}
                    </P>
                    <div className={styles.userTag}>
                      <P size='s' fontstyle='thin' color='gray'>
                        {item.award?.name}
                      </P>
                    </div>
                  </div>
                </div>
                {Math.floor((currentDate - item.date) / 86400000) == 0 ? (
                  <P size='m' color='gray' fontstyle='thin'>
                    сегодня
                  </P>
                ) : (
                  <P size='m' color='gray' fontstyle='thin'>
                    {Math.floor((currentDate - item.date) / 86400000)}&nbsp;дн
                  </P>
                )}
              </li>
            );
          }
        })}
      </ul> */}
    </div>
  );
};

export default MainActivity;
