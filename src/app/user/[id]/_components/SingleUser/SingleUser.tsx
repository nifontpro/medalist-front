'use client';

import styles from './SingleUser.module.scss';
import cn from 'classnames';
import { SingleUserProps } from './SingleUser.props';
import ButtonScrollUp from '@/ui/ButtonScrollUp/ButtonScrollUp';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import ImagesCarousel from '@/ui/ImagesCarousel/ImagesCarousel';
import SingleUserTitle from './SingleUserTitle/SingleUserTitle';
import SingleUserAwards from './SingleUserAwards/SingleUserAwards';
import SingleUserNominee from './SingleUserNominee/SingleUserNominee';
import ModalWindowWithAddAwards from '../ModalWindowWithAddAwards/ModalWindowWithAddAwards';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import EventSingleUser from './EventSingleUser/EventSingleUser';
import ModalWindowWithAddEvent from '@/ui/ModalWindowWithAddEvent/ModalWindowWithAddEvent';
import { useSingleUser } from './useSingleUser';
import { memo, useMemo } from 'react';
import { useAwardAdmin } from '@/api/award/useAwardAdmin';

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
  } = useSingleUser(id);

  const {
    awardsAvailableForRewardUserSimple,
    isLoadingAwardsAvailableForRewardUserSimple,
  } = useAwardAdmin(id, { filter: searchValue });

  const totalPage = useMemo(
    () => awardsAvailableForRewardUserSimple?.pageInfo?.totalPages,
    [awardsAvailableForRewardUserSimple]
  );

  if (isLoadingSingleUser) return <Spinner />;
  if (!user?.success) return <NoAccess />;

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
            <ImagesCarousel
              data={user.data?.user.images}
              edit={false}
              className={styles.img}
            />
          )}

          <div className={styles.content}>
            {userActiv && (
              <SingleUserTitle
                user={user.data}
                userActiv={userActiv.data}
                setVisibleModal={setVisibleModal}
                setVisibleModalEvent={setVisibleModalEvent}
                refOpen={refOpen}
              />
            )}

            <SingleUserAwards user={user.data} id={id} />

            <SingleUserNominee user={user.data} id={id} />
          </div>
        </div>
        <EventSingleUser id={id} />
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
