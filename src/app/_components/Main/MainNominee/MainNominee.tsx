import styles from './MainNominee.module.scss';

import { MainNomineeProps } from './MainNominee.props';
import cn from 'classnames';
import ArrowIcon from '@/icons/arrowRight.svg';
import { useRouter } from 'next/navigation';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';
import { ImageDefault } from '@/ui/ImageDefault/ImageDefault';
import ButtonIcon from '@/ui/ButtonIcon/ButtonIcon';
import { declOfNum } from '@/utils/declOfNum';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';
import SpinnerSmall from '@/ui/SpinnerSmall/SpinnerSmall';

const MainNominee = ({
  className,
  ...props
}: MainNomineeProps): JSX.Element => {
  const { push } = useRouter();

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { awardsOnDepartment, isLoadingAwardsOnDept } = useAwardAdmin(
    typeOfUser?.dept.id,
    { subdepts: true, orders: [{ field: 'endDate', direction: 'ASC' }] },
    'NOMINEE'
  );

  let minEndDateNominee =
    awardsOnDepartment &&
    awardsOnDepartment.data &&
    awardsOnDepartment?.data[0];

  let currentDate = +new Date();

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={styles.header}>
        <Htag tag='h2'>Номинации</Htag>
        <div
          className={styles.bestNominee}
          onClick={() => push(`/department/${typeOfUser?.dept.id}/awards`)}
        >
          <P size='s' fontstyle='thin' className={styles.text}>
            Все
          </P>
          <ArrowIcon className={styles.arrow} />
        </div>
      </div>
      {isLoadingAwardsOnDept ? (
        <SpinnerSmall />
      ) : (
        <div className={styles.content}>
          <div className={styles.img}>
            <ImageDefault
              src={minEndDateNominee?.mainImg}
              width={236}
              height={236}
              alt='preview image'
              objectFit='cover'
              className='rounded-[10px]'
              priority={true}
            />
          </div>
          <div className={styles.wrapper2}>
            <P size='m' color='white' className={styles.countAwardsTitle}>
              {minEndDateNominee?.name}
            </P>
            <div className={styles.imgCenter}>
              <ImageDefault
                src={minEndDateNominee?.mainImg}
                width={236}
                height={236}
                alt='preview image'
                objectFit='cover'
                className='rounded-[10px]'
                priority={true}
              />
            </div>
            <div className={styles.countEnd}>
              <P size='s' color='white' fontstyle='thin'>
                Заканчивается
              </P>
              {minEndDateNominee != undefined &&
                minEndDateNominee.endDate != undefined &&
                (Math.floor(
                  (minEndDateNominee.endDate - currentDate) / 86400000
                ) != 0 ? (
                  <ButtonIcon className='ml-[10px]' appearance='whiteBlack'>
                    через{' '}
                    {Math.floor(
                      (minEndDateNominee.endDate - currentDate) / 86400000
                    )}{' '}
                    {declOfNum(
                      Math.floor(
                        (minEndDateNominee.endDate - currentDate) / 86400000
                      ),
                      ['день', 'дня', 'дней']
                    )}
                  </ButtonIcon>
                ) : (
                  <ButtonIcon className='ml-[10px]' appearance='whiteBlack'>
                    сегодня
                  </ButtonIcon>
                ))}
            </div>
          </div>
          <div className={styles.imgEnd}>
            <ImageDefault
              src={minEndDateNominee?.mainImg}
              width={236}
              height={236}
              alt='preview image'
              objectFit='cover'
              className='rounded-[10px]'
              priority={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainNominee;
