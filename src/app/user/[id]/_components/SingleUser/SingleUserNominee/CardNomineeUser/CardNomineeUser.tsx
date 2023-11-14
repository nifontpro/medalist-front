import { timeConverterUser } from '@/utils/timeConverterUser';
import styles from './CardNomineeUser.module.scss';
import { CardNomineeUserProps } from './CardNomineeUser.props';
import cn from 'classnames';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import P from '@/ui/P/P';
import AuthComponent from '@/store/providers/AuthComponent';
import Button from '@/ui/Button/Button';
import ButtonEdit from '@/ui/ButtonEdit/ButtonEdit';
import { useCardNominee } from '@/app/award/[id]/_components/SingleAward/AwardNominee/CardNominee/useCardNominee';
import { memo, useMemo } from 'react';
import { useRouter } from 'next/navigation';

const CardNomineeUser = ({
  userId,
  award,
  userRewardAsync,
  disabled,
  className,
  ...props
}: CardNomineeUserProps): JSX.Element => {
  const { push } = useRouter();
  let awardId = useMemo(() => award.award?.id, [award]);

  const { handleRemove } = useCardNominee(Number(userId), awardId);

  let convertDate = useMemo(
    () => timeConverterUser(award.award?.endDate),
    [award]
  );

  return (
    <div
      className={cn(styles.wrapper, className)}
      {...props}
      onClick={() => push(`/award/${award.award?.id}`)}
    >
      <div
        className={cn(styles.img, {
          [styles.disabled]: disabled,
        })}
      >
        <ImageDefault
          src={award.award?.mainImg}
          width={76}
          height={76}
          alt='award img'
          // objectFit='cover'
          className='rounded-[10px]'
          // priority={true}
          forWhat='award'
        />
      </div>

      <div
        className={cn(styles.user, {
          [styles.disabled]: disabled,
        })}
      >
        <P size='l'>{award.award?.name}</P>
      </div>

      {award.activ ? (
        <P size='s' fontstyle='thin' color='gray' className={styles.date}>
          Дата завершения {convertDate}
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

export default memo(CardNomineeUser);
