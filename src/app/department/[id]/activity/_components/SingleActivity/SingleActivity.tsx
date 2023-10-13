import { timeConverterUser } from '@/utils/timeConverterUser';
import styles from './SingleActivity.module.scss';
import { SingleActivityProps } from './SingleActivity.props';
import cn from 'classnames';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import P from '@/ui/P/P';
import ButtonIcon from '@/ui/ButtonIcon/ButtonIcon';
import { useRouter } from 'next/navigation';

const SingleActivity = ({
  activity,
  className,
  ...props
}: SingleActivityProps): JSX.Element => {
  const { push } = useRouter();
  const date = timeConverterUser(activity.date);

  return (
    <div
      {...props}
      className={cn(styles.wrapper, className)}
      onClick={() => push(`/user/${activity.user?.id}`)}
    >
      <div className={styles.img}>
        <ImageDefault
          src={activity.user?.mainImg}
          width={64}
          height={64}
          alt='preview image'
          // objectFit='cover'
          className='rounded-[10px]'
          // priority={true}
          forWhat='user'
        />
      </div>
      <div className={styles.user}>
        <P size='m'>
          {activity.user?.firstname} {activity.user?.lastname}
        </P>
        <div className={styles.userTag}>
          {activity.user?.post && (
            <P size='s' fontstyle='thin' color='gray'>
              {activity.user?.post}
            </P>
          )}
        </div>
      </div>
      {activity?.deptId ? (
        <ButtonIcon className={styles.depart} appearance='graySilver'>
          {activity?.deptId}
        </ButtonIcon>
      ) : (
        <ButtonIcon className={styles.depart} appearance='graySilver'>
          Нет отдела
        </ButtonIcon>
      )}
      <div className={styles.award}>
        <div className={styles.imgAward}>
          <ImageDefault
            src={activity.award?.mainImg}
            width={64}
            height={64}
            alt='preview image'
            // objectFit='cover'
            className='rounded-[10px]'
            forWhat='award'
          />
        </div>
        <div className={styles.userAward}>
          <P size='m'>{activity.award?.name}</P>
          <div className={styles.userTag}>
            {activity.user?.post && (
              <P size='s' fontstyle='thin' color='gray'>
                Награжден {date}
              </P>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleActivity;
