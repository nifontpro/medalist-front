import styles from './SingleActivity.module.scss';
import { SingleActivityProps } from './SingleActivity.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import P from '@/core/presenter/ui/P/P';
import ButtonIcon from '@/core/presenter/ui/ButtonIcon/ButtonIcon';
import { timeConverterUser } from '@/core/utils/timeConverterUser';

const SingleActivity = ({
  activity,
  className,
  ...props
}: SingleActivityProps): JSX.Element => {

  const date = timeConverterUser(activity.date)

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={styles.img}>
        <ImageDefault
          src={activity.user?.imageUrl}
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
          {activity.user?.lastname} {activity.user?.name}
        </P>
        <div className={styles.userTag}>
          {activity.user?.post && (
            <P size='s' fontstyle='thin' color='gray'>
              {activity.user?.post}
            </P>
          )}
        </div>
      </div>
      {activity?.departmentName ? (
        <ButtonIcon className={styles.depart} appearance='graySilver'>
          {activity?.departmentName}
        </ButtonIcon>
      ) : (
        <ButtonIcon className={styles.depart} appearance='graySilver'>
          Нет отдела
        </ButtonIcon>
      )}
      <div className={styles.award}>
        <div className={styles.imgAward}>
          <ImageDefault
            src={activity.award?.imageUrl}
            width={64}
            height={64}
            alt='preview image'
            objectFit='cover'
            className='rounded-[10px]'
          />
        </div>
        <div className={styles.userAward}>
          <P size='m'>
            {activity.award?.name}
          </P>
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
