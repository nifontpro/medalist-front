import styles from './UserPreview.module.scss';
import cn from 'classnames';
import { UserPreviewProps } from './UserPreview.props';
import { ImageDefault } from '@/ui/ImageDefault/ImageDefault';
import P from '@/ui/P/P';

const UserPreview = ({
  user,
  forWhat,
  children,
  className,
  ...props
}: UserPreviewProps): JSX.Element => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.images}>
        <ImageDefault
          src={user.imageUrl}
          width={76}
          height={76}
          alt={user.name}
          objectFit='cover'
          className='rounded-xl w-[76px] h-[76px]'
          priority={true}
        />
      </div>

      <div className={styles.info}>
        <P size='m' fontstyle='bold'>
          {user.lastname} {user.firstname}
        </P>
        <P color='gray' size='m' fontstyle='thin'>
          {user.post}Пост сотрудника
        </P>
      </div>
      {forWhat == 'user' && (
        <P size='xs' fontstyle='thin' className={styles.departName}>
          Depart{user.departmentName}
        </P>
      )}
    </div>
  );
};
export default UserPreview;
