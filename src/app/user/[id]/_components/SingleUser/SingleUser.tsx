'use client';

import styles from './SingleUser.module.scss';
import cn from 'classnames';
import { SingleUserProps } from './SingleUser.props';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import ButtonScrollUp from '@/ui/ButtonScrollUp/ButtonScrollUp';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import ImagesCarousel from '@/ui/ImagesCarousel/ImagesCarousel';
import SingleUserTitle from './SingleUserTitle/SingleUserTitle';
import SingleUserAwards from './SingleUserAwards/SingleUserAwards';
import SingleUserNominee from './SingleUserNominee/SingleUserNominee';
import { useAwardAdmin } from '@/app/award/useAwardAdmin';
import { Award } from '@/domain/model/award/Award';
import ModalWindowWithAddAwards from '../ModalWindowWithAddAwards/ModalWindowWithAddAwards';
import { useFetchParams } from '@/hooks/useFetchParams';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import { useUserAdmin } from '@/app/user/useUserAdmin';

const SingleUser = ({
  id,
  className,
  children,
  ...props
}: SingleUserProps): JSX.Element => {
  const { back } = useRouter();

  const { singleUser: user, isLoadingSingleUser } = useUserAdmin(id);
  const { singleActivAwardUser: userActiv } = useAwardAdmin(id);

  const {
    page,
    setPage,
    searchValue,
    setSearchValue,
    state,
    setState,
    nextPage,
    prevPage,
  } = useFetchParams();

  const deptId = user?.data?.user.dept.id;

  //Фильтр тех медалей, которыми не награжден еще
  const {
    awardsAvailableForRewardUser,
    isLoadingAwardsAvailableForRewardUser,
  } = useAwardAdmin(deptId, {
    page: page,
    pageSize: 100,
    filter: searchValue,
  });

  const totalPage = awardsAvailableForRewardUser?.pageInfo?.totalPages;

  let arrAwardRewarded: string[] = []; // Массив id медалей, которыми награжден
  userActiv?.data?.forEach((award) => {
    if (award.award?.type == 'SIMPLE' && award.award) {
      arrAwardRewarded.push(award.award?.id.toString());
    }
  });
  let arrAwardNotRewarded: Award[] = []; // Массив медалей, которыми может быть награжден и не был награжден до этого
  awardsAvailableForRewardUser?.data?.forEach((award) => {
    if (award.state == 'FINISH') {
      if (
        arrAwardRewarded.find((item) => item == award.id.toString()) ==
        undefined
      ) {
        arrAwardNotRewarded.push(award);
      }
    }
  });

  //Закрытие модального окна нажатием вне его
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisibleModal(false);
    setSearchValue('');
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visibleModal);

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
                refOpen={refOpen}
              />
            )}
            {userActiv && (
              <SingleUserAwards user={user.data} userActiv={userActiv.data} />
            )}
            {userActiv && (
              <SingleUserNominee user={user.data} userActiv={userActiv.data} />
            )}
          </div>
        </div>
        <ButtonScrollUp />
      </div>

      <ModalWindowWithAddAwards
        totalPage={totalPage}
        nextPage={() =>
          awardsAvailableForRewardUser && nextPage(awardsAvailableForRewardUser)
        }
        prevPage={prevPage}
        page={page}
        setPage={setPage}
        setSearchValue={setSearchValue}
        awardState='AWARD'
        userId={user.data?.user.id}
        awards={arrAwardNotRewarded}
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        textBtn='Наградить'
        ref={ref}
      />
    </>
  );
};

export default SingleUser;
