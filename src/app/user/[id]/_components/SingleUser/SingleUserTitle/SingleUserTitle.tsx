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
import { ImageDefault } from '@/ui/ImageDefault/ImageDefault';
import ButtonIcon from '@/ui/ButtonIcon/ButtonIcon';

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

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.title}>
        <Htag tag='h2'>
          {user?.user.lastname} {user?.user.firstname}
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
          {user?.user.email}
        </P>
        <P size='m' fontstyle='thin'>
          {user?.phone}
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
        {/* {currentUser?.id == user.id ? (
          <div className={styles.buttons}>
            <Button
              onClick={() => push(getUserEditUrl(`/${user.id}`))}
              size='m'
              appearance='blackWhite'
              className={styles.editBtn}
            >
              Редактировать
            </Button>
            <Button
              onClick={() => {
                console.log('Change password');
                // push(getUserEditPasswordUrl(`/${user.id}`))
              }}
              size='m'
              appearance='whiteBlack'
              className={styles.changePasswordBtn}
            >
              Сменить пароль
            </Button>
          </div>
        ) : ( */}
        <AuthComponent minRole={'ADMIN'}>
          <Button
            onClick={() => setVisibleModal(true)}
            size='l'
            appearance='blackWhite'
            ref={refOpen}
            className={styles.awardedBtn}
          >
            Наградить
          </Button>
        </AuthComponent>
        {/* )} */}
      </div>
      <Button
        onClick={() => setVisibleModalEvent(true)}
        appearance='blackWhite'
        size='l'
        className='@apply mt-[25px]'
      >
        Создать событие
      </Button>

      <P size='l' className={styles.aboutUser}>
        О сотруднике
      </P>
      <P size='m' fontstyle='thin'>
        {user?.description}
      </P>
    </div>
  );
};

export default SingleUserTitle;
