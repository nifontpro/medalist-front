'use client';

import styles from './AwardNominee.module.scss';
import { AwardNomineeProps } from './AwardNominee.props';
import cn from 'classnames';
import uniqid from 'uniqid';
import { useRef, useState } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import Htag from '@/ui/Htag/Htag';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import P from '@/ui/P/P';
import { useUserAdmin } from '@/api/user/useUserAdmin';
import { User } from '@/types/user/user';
import AuthComponent from '@/store/providers/AuthComponent';
import CardNominee from './CardNominee/CardNominee';
import ModalWindowWithAddUsers from '../../ModalWindowWithAddUsers/ModalWindowWithAddUsers';
import { useFetchParams } from '@/hooks/useFetchParams';

const AwardNominee = ({
  award,
  awardActiv,
  className,
  ...props
}: AwardNomineeProps): JSX.Element => {
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

  const { usersOnSubDepartment } = useUserAdmin(
    award?.award.dept.id?.toString(),
    {
      page: page,
      pageSize: 100,
      filter: searchValue,
      orders: [{ field: 'lastname', direction: state }],
    }
  );
  const totalPage = usersOnSubDepartment?.pageInfo?.totalPages;

  //Закрытие модального окна нажатием вне его
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisibleModal(false);
    setSearchValue('');
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visibleModal);

  //Фильтр тех кто еще не участвует в номинации
  let arrIdUserNominee: string[] = []; // Id тех кто наминирован
  awardActiv!.forEach((user) => {
    // if (user.actionType == 'NOMINEE' && user && user.user && user.user.id)
    //   arrIdUserNominee.push(user.user.id.toString());
    if (user && user.user && user.user.id) {
      if (user.actionType == 'NOMINEE' || user.actionType == 'AWARD')
        arrIdUserNominee.push(user.user.id.toString());
    }
  });

  let arrUserNotNominee: User[] = []; // Те кто не наминирован
  usersOnSubDepartment &&
    usersOnSubDepartment.data?.forEach((user) => {
      if (
        arrIdUserNominee.find((item) => item == user.id?.toString()) ==
        undefined
      ) {
        arrUserNotNominee.push(user);
      }
    });

  let arrUserNominee: User[] = []; // Те кто номинирован
  awardActiv!.forEach((user) => {
    if (user.actionType == 'NOMINEE' && user && user.user && user.user.id)
      arrUserNominee.push(user.user);
  });

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Htag tag='h3' className={styles.headerTitle}>
            Кто участвует
            <P className={styles.rewardedLength}>{arrIdUserNominee.length}</P>
          </Htag>

          <AuthComponent minRole='ADMIN'>
            <ButtonCircleIcon
              classNameForIcon='@apply w-[12px] h-[12px]'
              onClick={() => setVisibleModal(true)}
              appearance='black'
              icon='plus'
              ref={refOpen}
            >
              Добавить участников
            </ButtonCircleIcon>
          </AuthComponent>
        </div>

        <div
          className={cn(styles.usersAwarded, {
            [styles.hidden]: awardActiv?.length == 0,
          })}
        >
          {awardActiv?.map((item) => {
            if (item.actionType === 'NOMINEE' || item.actionType === 'AWARD') {
              return (
                <CardNominee
                  awardId={award!.award?.id}
                  user={item}
                  key={uniqid()}
                />
              );
            }
          })}
        </div>

        {awardActiv!.length == 0 ? (
          <P className={styles.none} fontstyle='thin' size='m'>
            Нет участников
          </P>
        ) : null}
      </div>

      {award?.award.id && (
        <ModalWindowWithAddUsers
          totalPage={totalPage}
          nextPage={() =>
            usersOnSubDepartment && nextPage(usersOnSubDepartment)
          }
          prevPage={prevPage}
          page={page}
          setPage={setPage}
          setSearchValue={setSearchValue}
          awardState='NOMINEE'
          awardId={award.award.id.toString()}
          users={arrUserNotNominee}
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          textBtn='Номинировать'
          ref={ref}
        />
      )}
    </div>
  );
};

export default AwardNominee;
