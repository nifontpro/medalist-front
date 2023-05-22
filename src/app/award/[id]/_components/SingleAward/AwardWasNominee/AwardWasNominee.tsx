import Htag from '@/ui/Htag/Htag';
import styles from './AwardWasNominee.module.scss';
import { AwardWasNomineeProps } from './AwardWasNominee.props';
import cn from 'classnames';
import uniqid from 'uniqid';
import P from '@/ui/P/P';
import CardUserNominee from './CardUserNominee/CardUserNominee';

const AwardWasNominee = ({
  award,
  awardActiv,
  className,
  ...props
}: AwardWasNomineeProps): JSX.Element => {
  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Htag tag='h3'>Были номинированы </Htag>
          <P className={styles.rewardedLength}>{awardActiv!.filter((user) => user.actionType == 'NOMINEE').length}</P>
        </div>
        {awardActiv!.findIndex((item) => item.actionType === 'NOMINEE') >= 0 ? (
          <div className={styles.usersAwarded}>
            {awardActiv!.map((item) => {
              if (item.actionType === 'NOMINEE') {
                return <CardUserNominee award={award} user={item} key={uniqid()}/>;
              }
            })}
          </div>
        ) : (
          <P className={styles.none} fontstyle='thin' size='m'>Нет номинантов</P>
        )}
      </div>
    </div>
  );
};

export default AwardWasNominee;
