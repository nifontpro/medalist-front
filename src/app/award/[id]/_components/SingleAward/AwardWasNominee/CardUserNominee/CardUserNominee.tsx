import P from '@/ui/P/P';
import styles from './CardUserNominee.module.scss';
import { CardUserNomineeProps } from './CardUserNominee.props';
import cn from 'classnames';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import { useRouter } from 'next/navigation';

const CardUserNominee = ({
  user,
  className,
  ...props
}: CardUserNomineeProps): JSX.Element => {
  const { push } = useRouter();

  return (
    <div
      className={cn(styles.wrapper, className)}
      {...props}
      onClick={() => push(`/user/${user?.user?.id}`)}
    >
      <div className={styles.img}>
        <ImageDefault
          src={user.user?.mainImg}
          width={64}
          height={64}
          alt='award img'
          objectFit='cover'
          className='rounded-full'
          // priority={true}
        />
      </div>
      <div className={styles.description}>
        <P size='s'>
          {user.user?.lastname}
          {/* {user.user?.firstname} */}
        </P>
        <P size='xs' fontstyle='thin' color='gray' className={styles.post}>
          {user.user?.post}
        </P>
      </div>
    </div>
  );
};

export default CardUserNominee;
