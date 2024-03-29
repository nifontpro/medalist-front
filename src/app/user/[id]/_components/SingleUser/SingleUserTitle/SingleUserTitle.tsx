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

const SingleUserTitle = ({
  user,
  userActiv,
  setVisibleModal,
  setVisibleModalEvent,
  refOpen,
  className,
  ...props
}: SingleUserTitleProps): JSX.Element => {
  const { deleteUserAsync } = useUserAdmin();

  const addEventVisible = useCallback(() => {
    setVisibleModalEvent(true);
  }, [setVisibleModalEvent]);

  const addAwardVisible = useCallback(() => {
    setVisibleModal(true);
  }, [setVisibleModal]);

  const minRole: RoleUser = useMemo(() => 'ADMIN', []);

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

      <div className={styles.contacts}>
        <P size='m' fontstyle='thin'>
          Email: {user?.user.email ? user?.user.email : 'email не указан'}
        </P>
        <P size='m' fontstyle='thin'>
          Сотовый: {user?.phone ? user?.phone : 'Сотовый не указан'}
        </P>
      </div>

      <div className={styles.awards}>
        <div className={styles.imagesAward}>
          {userActiv &&
            userActiv
              .filter((award) => award.actionType == 'AWARD')
              .map((award, index) => {
                if (index < 4) {
                  return (
                    // <div className={styles.circle} key={uniqid()}></div>
                    <div className={styles.imgAward} key={uniqid()}>
                      <ImageDefault
                        src={award.award?.mainImg}
                        width={50}
                        height={50}
                        alt='preview image'
                        objectFit='cover'
                        className='rounded-full'
                        // priority={true}
                      />
                    </div>
                  );
                }
              })}
          {userActiv &&
          userActiv.filter((item) => item.actionType == 'AWARD').length > 4 ? (
            <ButtonIcon className={styles.countIcon} appearance={'black'}>
              +
              {userActiv.filter((item) => item.actionType == 'AWARD').length -
                4}
            </ButtonIcon>
          ) : (
            <div className={styles.countIcon}></div>
          )}
        </div>
        <div className={styles.buttonsWrapper}>
          <Button
            onClick={addEventVisible}
            size='l'
            appearance='whiteBlack'
            ref={refOpen}
            className={styles.createEventBtn}
          >
            Создать событие
          </Button>
          <AuthComponent minRole={minRole}>
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

      <P size='l' className={styles.aboutUser}>
        О сотруднике
      </P>
      {user?.description ? (
        <P size='m' fontstyle='thin'>
          {user?.description}
        </P>
      ) : (
        <P size='m' fontstyle='thin'>
          Нет данных о сотруднике
        </P>
      )}
    </div>
  );
};

export default memo(SingleUserTitle);
