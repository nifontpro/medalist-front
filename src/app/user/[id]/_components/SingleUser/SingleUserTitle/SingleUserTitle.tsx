import { useUserAdmin } from '@/api/user/useUserAdmin';
import styles from './SingleUserTitle.module.scss';
import { SingleUserTitleProps } from './SingleUserTitle.props';
import cn from 'classnames';
import uniqid from 'uniqid';
import Htag from '@/ui/Htag/Htag';
import EditPanelAuthBtn from '@/ui/EditPanelAuthBtn/EditPanelAuthBtn';
import { getUserEditUrl } from '@/config/api.config';
import P from '@/ui/P/P';
import AuthComponent from '@/store/providers/AuthComponent';
import Button from '@/ui/Button/Button';
import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import ButtonIcon from '@/ui/ButtonIcon/ButtonIcon';
import { memo, useCallback, useMemo } from 'react';
import { RoleUser } from '@/types/user/user';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { usePathname, useSearchParams } from 'next/navigation';
import MoneyPreview from '@/ui/MoneyPreview/MoneyPreview';
import { SelectGetGiftSettings } from '@/store/features/giftSettings/giftSettings-selectors';
import { formatDateAndDaysUntil } from '@/utils/formatDateAndDaysUntil';
import { declOfNum } from '@/utils/declOfNum';
import { calculateWorkExperience } from '@/utils/calculateWorkExperience';

const SingleUserTitle = ({
  user,
  userActiv,
  setVisibleModal,
  setVisibleModalEvent,
  refOpen,
  className,
  moneyUser,
  ...props
}: SingleUserTitleProps): JSX.Element => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const settings = useAppSelector(SelectGetGiftSettings);

  const { deleteUserAsync } = useUserAdmin();

  const addEventVisible = useCallback(() => {
    setVisibleModalEvent(true);
  }, [setVisibleModalEvent]);

  const addAwardVisible = useCallback(() => {
    setVisibleModal(true);
  }, [setVisibleModal]);

  const minRole: RoleUser = useMemo(() => 'ADMIN', []);

  const { formattedBirthDate, daysUntil } = formatDateAndDaysUntil(
    user?.birthDate!
  );

  const { experience, nextAnniversaryString, years, daysUntilNextYear } =
    calculateWorkExperience(user?.jobDate!);

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.title}>
        <Htag tag='h2'>
          {user?.user.firstname} {user?.user.lastname}
        </Htag>
      </div>

      <EditPanelAuthBtn
        onlyRemove={false}
        handleRemove={deleteUserAsync}
        id={user?.user.id}
        getUrlEdit={getUserEditUrl}
        className={styles.dots}
      />

      <div className={styles.position}>
        {user?.user.dept.name ? (
          <P
            size='xs'
            fontstyle='thin'
            type='silverBtn'
            className={styles.depart}
          >
            {user?.user.dept.name}
          </P>
        ) : (
          <P
            size='xs'
            fontstyle='thin'
            type='silverBtn'
            className={styles.depart}
          >
            Нет отдела
          </P>
        )}
        {user?.user.post ? (
          <P
            size='xs'
            fontstyle='thin'
            type='silverBtn'
            className={styles.post}
          >
            {user.user.post}
          </P>
        ) : (
          <P
            size='xs'
            fontstyle='thin'
            type='silverBtn'
            className={styles.post}
          >
            Нет отдела
          </P>
        )}
      </div>

      {user?.user?.authEmail || user?.phone ? (
        <div className={styles.contacts}>
          {user?.user?.authEmail ? (
            <a href={`mailto:${user?.user?.authEmail}`}>
              <P size='m'>{user?.user?.authEmail}</P>
            </a>
          ) : null}
          {user?.phone ? (
            <a href={`tel:${user?.phone}`} className='mt-[10px]'>
              <P size='m'>{user?.phone}</P>
            </a>
          ) : null}
        </div>
      ) : null}

      <div className={styles.awards}>
        <div className={styles.imagesAward}>
          <div className={styles.moneyWrapper}>
            <MoneyPreview
              value={moneyUser?.data?.balance}
              currency={settings?.payName || ''}
              color={'gray'}
            />
          </div>

          <div className={styles.imagesWrapper}>
            {userActiv &&
              userActiv
                .filter((award) => award.actionType == 'AWARD')
                .map((award, index) => {
                  if (index < 4) {
                    return (
                      // <div className={styles.circle} key={uniqid()}></div>
                      <div className={styles.imgAward} key={uniqid()}>
                        <ImageDefault
                          src={award.award?.normImg}
                          width={50}
                          height={50}
                          alt='preview image'
                          // objectFit='cover'
                          className='rounded-full'
                          // priority={true}
                          forWhat='award'
                        />
                      </div>
                    );
                  }
                })}
            {userActiv &&
            userActiv.filter((item) => item.actionType == 'AWARD').length >
              4 ? (
              <ButtonIcon className={styles.countIcon} appearance={'black'}>
                +
                {userActiv.filter((item) => item.actionType == 'AWARD').length -
                  4}
              </ButtonIcon>
            ) : (
              <div className={styles.countIcon}></div>
            )}
          </div>
        </div>
        <div className={styles.buttonsWrapper}>
          <AuthComponent minRole={minRole}>
            <Button
              onClick={addEventVisible}
              size='l'
              appearance='whiteBlack'
              ref={refOpen}
              className={styles.createEventBtn}
            >
              Создать событие
            </Button>

            <Button
              onClick={addAwardVisible}
              size='l'
              appearance='blackWhite'
              ref={refOpen}
              className={styles.awardedBtn}
            >
              Наградить
            </Button>
          </AuthComponent>
        </div>
      </div>

      <div className={styles.about}>
        {user?.birthDate ? (
          <div className={styles.aboutUser}>
            <P size='l'>День прождения</P>

            <P size='m' fontstyle='thin' className='flex items-center'>
              {formattedBirthDate}{' '}
              <ButtonIcon className='ml-[10px]' appearance='lime'>
                {`через ${daysUntil} ${declOfNum(daysUntil, [
                  'день',
                  'дня',
                  'дней',
                ])}`}
              </ButtonIcon>
            </P>
          </div>
        ) : null}

        {user?.jobDate ? (
          <div className={styles.aboutUser}>
            <P size='l'>Стаж работы</P>

            <P size='m' fontstyle='thin' className='flex items-center'>
              {experience}{' '}
              <ButtonIcon className='ml-[10px]' appearance='lime'>
                {`${years + 1} ${declOfNum(years, ['год', 'года', 'лет'])}`}{' '}
                через{' '}
                {`${daysUntilNextYear} ${declOfNum(daysUntilNextYear, [
                  'день',
                  'дня',
                  'дней',
                ])}`}
              </ButtonIcon>
            </P>
          </div>
        ) : null}

        {user?.description ? (
          <div className={styles.aboutUser}>
            <P size='l'>О сотруднике</P>

            <P size='m' fontstyle='thin'>
              {user?.description}
            </P>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default memo(SingleUserTitle);
