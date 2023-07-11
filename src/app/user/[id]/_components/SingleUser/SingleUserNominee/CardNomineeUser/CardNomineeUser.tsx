import { timeConverterUser } from '@/utils/timeConverterUser';
import styles from './CardNomineeUser.module.scss';
import { CardNomineeUserProps } from './CardNomineeUser.props';
import cn from 'classnames';
import { ImageDefault } from '@/ui/ImageDefault/ImageDefault';
import P from '@/ui/P/P';
import AuthComponent from '@/store/providers/AuthComponent';
import Button from '@/ui/Button/Button';
import ButtonEdit from '@/ui/ButtonEdit/ButtonEdit';
import { useCardNominee } from '@/app/award/[id]/_components/SingleAward/AwardNominee/CardNominee/useCardNominee';

const CardNomineeUser = ({
  userId,
  award,
  className,
  ...props
}: CardNomineeUserProps): JSX.Element => {
  let awardId = award.award?.id;

  const { userRewardAsync, handleRemove } = useCardNominee(
    Number(userId),
    awardId
  );

  console.log(award);

  let convertDate = timeConverterUser(award.date);

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.img}>
        <ImageDefault
          src={award.award?.mainImg}
          width={76}
          height={76}
          alt='award img'
          objectFit='cover'
          className='rounded-[27px]'
          // priority={true}
        />
      </div>

      <div className={styles.user}>
        <P size='l'>{award.award?.name}</P>
      </div>

      {award.activ ? (
        <P size='s' fontstyle='thin' color='gray' className={styles.date}>
          Завершена {convertDate}
        </P>
      ) : (
        <AuthComponent minRole={'ADMIN'}>
          <div className={styles.buttons}>
            {award.actionType === 'NOMINEE' && (
              <Button
                onClick={() =>
                  userId &&
                  awardId &&
                  userRewardAsync(awardId, 'AWARD', Number(userId))
                }
                size='m'
                appearance='blackWhite'
              >
                Наградить
              </Button>
            )}
            {award.actionType === 'AWARD' && (
              <Button
                size='m'
                appearance='blackWhite'
                className={styles.btnDefault}
              >
                Буден награжден
              </Button>
            )}
            <ButtonEdit icon='remove' onClick={handleRemove} />
          </div>
        </AuthComponent>
      )}
    </div>
  );
};

export default CardNomineeUser;
