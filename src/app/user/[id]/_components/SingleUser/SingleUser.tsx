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

const SingleUser = ({
  user,
  userActiv,
  className,
  children,
  ...props
}: SingleUserProps): JSX.Element => {
  const { back } = useRouter();

  const deptId = user?.user.dept.id;

  //Фильтр тех медалей, которыми не награжден еще
  const { awardsOnDepartment, isLoadingAwardsOnDept } = useAwardAdmin(deptId, {
    page: 0,
    pageSize: 1000000000,
  });

  let arrAwardRewarded: string[] = [];
  userActiv?.forEach((award) => {
    if (award.actionType == 'AWARD' && award.award) {
      arrAwardRewarded.push(award.award?.id.toString());
    }
  });
  let arrAwardNotRewarded: Award[] = [];
  awardsOnDepartment?.data?.forEach((award) => {
    if (award.state == 'FINISH') {
      if (
        arrAwardRewarded.find((item) => item == award.id.toString()) ==
        undefined
      ) {
        arrAwardNotRewarded.push(award);
      }
    }
  });

  console.log(arrAwardNotRewarded);

  //Закрытие модального окна нажатием вне его
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisibleModal(false);
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visibleModal);

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
              data={user?.user.images}
              edit={false}
              className={styles.img}
            />
          )}
          <div className={styles.content}>
            <SingleUserTitle
              user={user}
              userActiv={userActiv}
              setVisibleModal={setVisibleModal}
              refOpen={refOpen}
            />
            <SingleUserAwards user={user} userActiv={userActiv} />
            <SingleUserNominee user={user} userActiv={userActiv} />
          </div>
        </div>
        <ButtonScrollUp />
      </div>

      {/* <ModalWindowWithAddAwards
        awardState='AWARD'
        userId={user?.user.id}
        awards={arrAwardNotRewarded}
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        textBtn='Наградить'
        ref={ref}
      /> */}
    </>
  );
};

export default SingleUser;
