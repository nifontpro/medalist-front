'use client';

import styles from './SingleUser.module.scss';
import cn from 'classnames';
import { SingleUserProps } from './SingleUser.props';
import ButtonScrollUp from '@/ui/ButtonScrollUp/ButtonScrollUp';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import SingleUserTitle from './SingleUserTitle/SingleUserTitle';
import SingleUserAwards from './SingleUserAwards/SingleUserAwards';
import SingleUserNominee from './SingleUserNominee/SingleUserNominee';
import ModalWindowWithAddAwards from '../ModalWindowWithAddAwards/ModalWindowWithAddAwards';
import Spinner from '@/ui/Spinner/Spinner';
import ModalWindowWithAddEvent from '@/ui/ModalWindowWithAddEvent/ModalWindowWithAddEvent';
import { useSingleUser } from './useSingleUser';
import { memo, use } from 'react';
import EditImagesComponent from '@/ui/EditImagesComponent/EditImagesComponent';
import { useUserEditPhoto } from '../../edit/_components/UserEdit/useUserEditPhoto';
import SingleUserEvent from './SingleUserEvent/SingleUserEvent';
import SingleUserGifts from './SingleUserGifts/SingleUserGifts';
import NoAccessError from '@/ui/ErrorPages/NoAccessError/NoAccessError';

const SingleUser = ({
  id,
  className,
  children,
  ...props
}: SingleUserProps): JSX.Element => {
  const {
    visibleModal,
    setVisibleModal,
    ref,
    refOpen,
    visibleModalEvent,
    setVisibleModalEvent,
    user,
    isLoadingSingleUser,
    page,
    setPage,
    setSearchValue,
    searchValue,
    nextPage,
    prevPage,
    back,
    searchHandleChange,
    userActiv,
    arrChoiceAward,
    setArrChoiceAward,
    awardsAvailableForRewardUserSimple,
    totalPage,
    moneyUser,
    typeOfUser,
  } = useSingleUser(id);

  const { imageNum, setImageNum, images, addPhoto, removePhoto } =
    useUserEditPhoto(user);

  if (isLoadingSingleUser) return <Spinner />;
  if (!user?.success) return <NoAccessError errors={user?.errors} />;

  return (
    <>
      <div className={cn(className)} {...props}>
        <ButtonCircleIcon
          onClick={back}
          classNameForIcon=''
          appearance='black'
          icon='down'
        >
          Вернуться назад
        </ButtonCircleIcon>

        <div className={styles.wrapper}>
          {user && (
            <div className={styles.imagesWrapper}>
              <EditImagesComponent
                imageNum={imageNum}
                setImageNum={setImageNum}
                images={images}
                addPhoto={addPhoto}
                removePhoto={removePhoto}
                className={styles.img}
                gallery='false'
                forWhat='user'
                userId={user.data?.user.id}
                editable={true}
              />
            </div>
          )}

          <div className={styles.content}>
            {userActiv && (
              <SingleUserTitle
                user={user.data}
                userActiv={userActiv.data}
                setVisibleModal={setVisibleModal}
                setVisibleModalEvent={setVisibleModalEvent}
                refOpen={refOpen}
                moneyUser={moneyUser}
                id={id}
              />
            )}

            {typeOfUser?.id === Number(id) ||
            typeOfUser?.roles.includes('ADMIN') ? (
              <SingleUserGifts user={user.data} id={id} />
            ) : null}

            <SingleUserAwards user={user.data} id={id} />

            <SingleUserNominee user={user.data} id={id} />
          </div>
        </div>
        <SingleUserEvent id={id} />
        <ButtonScrollUp />
      </div>

      <ModalWindowWithAddAwards
        totalPage={totalPage}
        nextPage={() =>
          awardsAvailableForRewardUserSimple &&
          nextPage(awardsAvailableForRewardUserSimple)
        }
        prevPage={prevPage}
        page={page}
        setPage={setPage}
        setSearchValue={setSearchValue}
        arrChoiceAward={arrChoiceAward}
        setArrChoiceAward={setArrChoiceAward}
        searchHandleChange={searchHandleChange}
        awardState='AWARD'
        userId={user.data?.user.id}
        awards={awardsAvailableForRewardUserSimple?.data!}
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        textBtn='Наградить'
        ref={ref}
      />

      <ModalWindowWithAddEvent
        forWhat='User'
        id={id}
        visibleModal={visibleModalEvent}
        setVisibleModal={setVisibleModalEvent}
        textBtn='Создать событие'
      />
    </>
  );
};

export default memo(SingleUser);
