import styles from './SingleUserNominee.module.scss';
import { SingleUserNomineeProps } from './SingleUserNominee.props';
import cn from 'classnames';
import uniqid from 'uniqid';
import CardNomineeUser from './CardNomineeUser/CardNomineeUser';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';

const SingleUserNominee = ({
  user,
  userActiv,
  className,
  ...props
}: SingleUserNomineeProps): JSX.Element => {

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.title}>
        <Htag tag='h3'>Номинации</Htag>
        <P size='s' fontstyle='thin' className={styles.countAwards}>
          {userActiv &&
            userActiv.filter((award) => award.award?.type == 'PERIOD').length}
        </P>
      </div>
      {userActiv &&
      userActiv.filter((award) => award.award?.type == 'PERIOD').length > 0 ? (
        <div className={styles.content}>
          {userActiv.map((award) => {
            if (award.award?.type == 'PERIOD') {
              return (
                <CardNomineeUser
                  key={uniqid()}
                  userId={user?.user.id}
                  award={award}
                />
              );
            }
          })}
        </div>
      ) : (
        <P size='s' fontstyle='thin' className={styles.countAwards}>
          У вас пока нет номинаций
        </P>
      )}
    </div>
  );
};

export default SingleUserNominee;
