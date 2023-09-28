import styles from './UserPreview.module.scss';
import cn from 'classnames';
import { UserPreviewProps } from './UserPreview.props';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import P from '@/ui/P/P';
import { memo } from 'react';

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
          src={user.mainImg}
          width={76}
          height={76}
          alt={user.firstname}
          objectFit='cover'
          priority={true}
        />
      </div>

      <div className={styles.info}>
        <P size='m' fontstyle='bold'>
          {user.firstname} {user.lastname}
        </P>
        <P color='gray' size='m' fontstyle='thin'>
          {user.post}
        </P>
      </div>
      {/* {forWhat == 'user' ? ( */}
      <P size='xs' fontstyle='thin' className={styles.departName}>
        {user.dept?.name}
      </P>
      {/* ) : null} */}
    </div>
  );
};
export default memo(UserPreview);
