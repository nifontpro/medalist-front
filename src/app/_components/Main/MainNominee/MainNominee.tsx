import styles from './MainNominee.module.scss';
import { MainNomineeProps } from './MainNominee.props';
import cn from 'classnames';
import ArrowIconSvg from '@/icons/arrowRight.svg';
import { useRouter } from 'next/navigation';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import ButtonIcon from '@/ui/ButtonIcon/ButtonIcon';
import { declOfNum } from '@/utils/declOfNum';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import SpinnerSmall from '@/ui/SpinnerSmall/SpinnerSmall';
import { memo, useMemo } from 'react';
import { awardApi } from '@/api/award/award.api';
import DefaultImgPNG from '@/icons/medalistDefaultImg.png';

const MainNominee = ({
  deptId,
  className,
  ...props
}: MainNomineeProps): JSX.Element => {
  const { push } = useRouter();

  const switcher = useAppSelector((state) => state.switcher);

  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  // Получить награды в отделе
  const {
    data: awardsOnDepartment,
    isLoading: isLoadingAwardsOnDept,
    isFetching: isFetchingUsersOnDepartment,
  } = awardApi.useGetByDeptQuery(
    {
      authId: typeOfUser?.id!,
      deptId: Number(deptId ? deptId : typeOfUser?.dept.id),
      withUsers: false,
      state: 'NOMINEE',
      baseRequest: {
        // subdepts: switcher,
        subdepts: true,
        orders: [{ field: 'endDate', direction: 'ASC' }],
      },
    },
    {
      skip: !typeOfUser,
      refetchOnFocus: true,
    }
  );

  let minEndDateNominee = useMemo(
    () =>
      awardsOnDepartment &&
      awardsOnDepartment.data &&
      awardsOnDepartment?.data[0],
    [awardsOnDepartment]
  );

  const defaultColorImg =
    awardsOnDepartment &&
    awardsOnDepartment.data?.length &&
    awardsOnDepartment.data?.length > 0;

  // Получить награду по id
  const { data: nominee, isLoading: isLoadingSingleNominee } =
    awardApi.useGetByIdQuery(
      {
        authId: typeOfUser?.id!,
        awardId: Number(minEndDateNominee?.id),
      },
      {
        skip: !minEndDateNominee || !typeOfUser,
      }
    );

  let lastNominee = nominee?.data?.award;

  let currentDate = +new Date();

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={styles.header}>
        <Htag tag='h2'>Номинации</Htag>
        <div
          className={styles.bestNominee}
          onClick={() => push(`/department/${deptId}/awards?active=NOMINEE`)}
        >
          <P size='s' fontstyle='thin' className={styles.text}>
            Все
          </P>
          <ArrowIcon />
        </div>
      </div>
      {isLoadingSingleNominee && isLoadingSingleNominee ? (
        <SpinnerSmall />
      ) : (
        <div
          className={styles.content}
          onClick={() => push(`/award/${lastNominee?.id}`)}
        >
          <div className={styles.img}>
            <ImageDefault
              src={
                defaultColorImg === true
                  ? lastNominee?.images[0]?.imageUrl ?? undefined
                  : DefaultImgPNG
              }
              width={236}
              height={236}
              alt='preview image'
              className={styles.imgDefault}
              priority={true}
              forWhat='award'
            />
            <span className='text-white'>111111</span>
          </div>

          <div className={styles.wrapper2}>
            <P size='m' color='white' className={styles.countAwardsTitle}>
              {lastNominee?.name}
            </P>
            <div className={styles.imgCenter}>
              <ImageDefault
                src={
                  defaultColorImg === true
                    ? lastNominee?.images[0]?.imageUrl ?? undefined
                    : DefaultImgPNG
                }
                width={236}
                height={236}
                alt='preview image'
                // objectFit='cover'
                className='rounded-[10px]'
                priority={true}
                forWhat='award'
              />
            </div>
            <div className={styles.countEnd}>
              {lastNominee?.endDate != undefined ? (
                <>
                  <P size='s' color='white' fontstyle='thin'>
                    Заканчивается
                  </P>
                  {Math.floor((lastNominee.endDate - currentDate) / 86400000) !=
                  0 ? (
                    <ButtonIcon className='ml-[10px]' appearance='whiteBlack'>
                      через{' '}
                      {Math.floor(
                        (lastNominee.endDate - currentDate) / 86400000
                      )}{' '}
                      {declOfNum(
                        Math.floor(
                          (lastNominee.endDate - currentDate) / 86400000
                        ),
                        ['день', 'дня', 'дней']
                      )}
                    </ButtonIcon>
                  ) : (
                    <ButtonIcon className='ml-[10px]' appearance='whiteBlack'>
                      сегодня
                    </ButtonIcon>
                  )}
                </>
              ) : (
                <P size='s' color='white' fontstyle='thin'>
                  Номинаций пока нет
                </P>
              )}
            </div>
          </div>
          <div className={styles.imgEnd}>
            <ImageDefault
              src={
                defaultColorImg === true
                  ? lastNominee?.images[0]?.imageUrl ?? undefined
                  : DefaultImgPNG
              }
              width={236}
              height={236}
              alt='preview image'
              // objectFit='cover'
              className='rounded-[10px]'
              priority={true}
              forWhat='award'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(MainNominee);

//Для мемоизации svg icon
const ArrowIcon = memo(() => {
  return <ArrowIconSvg className={styles.arrow} />;
});
ArrowIcon.displayName = 'ArrowIcon';
//__________________
