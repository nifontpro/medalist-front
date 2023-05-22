import Htag from '@/ui/Htag/Htag';
import styles from './SingleUserAwards.module.scss';
import { SingleUserAwardsProps } from './SingleUserAwards.props';
import cn from 'classnames';
import uniqid from 'uniqid';
import P from '@/ui/P/P';
import CardUserAward from './CardUserAward/CardUserAward';

const SingleUserAwards = ({
  user,
  userActiv,
  className,
  ...props
}: SingleUserAwardsProps): JSX.Element => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.title}>
        <Htag tag='h3'>Медали</Htag>
        <P size='s' fontstyle='thin' className={styles.countAwards}>
          {userActiv &&
            userActiv.filter((award) => award.award?.type == 'SIMPLE').length}
        </P>
      </div>
      {userActiv &&
      userActiv.filter((award) => award.award?.type == 'SIMPLE').length > 0 ? (
        <div className={styles.content}>
          {userActiv.map((award) => {
            if (award.award?.type == 'SIMPLE') {
              return <CardUserAward key={uniqid()} award={award} user={user} />;
            }
          })}
        </div>
      ) : (
        <P size='s' fontstyle='thin' className={styles.countAwards}>
          У вас пока нет медалей
        </P>
      )}
    </div>
  );
};

export default SingleUserAwards;
