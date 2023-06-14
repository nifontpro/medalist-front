'use client';

import styles from './AwardWasAwarded.module.scss';
import { AwardWasAwardedProps } from './AwardWasAwarded.props';
import cn from 'classnames';
import uniqid from 'uniqid';
import { useRef, useState } from 'react';
import ButtonCircleIcon from '@/ui/ButtonCircleIcon/ButtonCircleIcon';
import AuthComponent from '@/store/providers/AuthComponent';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';
import useOutsideClick from '@/hooks/useOutsideClick';
import CardUserAwarded from './CardUserAwarded/CardUserAwarded';
import { User } from '@/domain/model/user/user';
import { useUserAdmin } from '@/api/user/useUserAdmin';
import ModalWindowWithAddUsers from '../../ModalWindowWithAddUsers/ModalWindowWithAddUsers';
import { useFetchParams } from '@/hooks/useFetchParams';

const AwardWasAwarded = ({
  award,
  awardActiv,
  className,
  ...props
}: AwardWasAwardedProps): JSX.Element => {
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

  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  //Закрытие модального окна нажатием вне его
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisibleModal(false); 
    setSearchValue('');
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visibleModal);

  //Фильтр тех кто еще не участвует в номинации
  let arrIdUserRewarded: string[] = [];
  awardActiv!.forEach((user) => {
    if (user.actionType == 'AWARD' && user && user.user && user.user.id)
      arrIdUserRewarded.push(user.user.id.toString());
  });
  let arrUserNotAwarded: User[] = [];
  usersOnSubDepartment &&
    usersOnSubDepartment.data?.forEach((user) => {
      if (
        arrIdUserRewarded.find((item) => item == user.id?.toString()) ==
        undefined
      ) {
        arrUserNotAwarded.push(user);
      }
    });

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Htag tag='h3' className={styles.headerTitle}>
            Награжденные
            <P className={styles.rewardedLength}>
              {awardActiv?.filter((user) => user.actionType == 'AWARD').length}
            </P>
          </Htag>
          <AuthComponent minRole={'ADMIN'}>
            <ButtonCircleIcon
              onClick={() => setVisibleModal(true)}
              classNameForIcon='@apply w-[12px] h-[12px]'
              appearance='black'
              icon='plus'
              className='font-bold'
              ref={refOpen}
            >
              Наградить еще
            </ButtonCircleIcon>
          </AuthComponent>
        </div>
        {awardActiv &&
        awardActiv.findIndex((item) => item.actionType === 'AWARD') >= 0 ? (
          <div className={styles.usersAwarded}>
            {awardActiv.map((item) => {
              if (item.actionType === 'AWARD') {
                return (
                  <CardUserAwarded award={award} user={item} key={uniqid()} />
                );
              }
            })}
          </div>
        ) : (
          <P className={styles.none} fontstyle='thin' size='m'>
            Нет награжденных
          </P>
        )}
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
          awardState='AWARD'
          awardId={award.award.id.toString()}
          users={arrUserNotAwarded}
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          textBtn='Выдать награду'
          ref={ref}
        />
      )}
    </div>
  );
};

export default AwardWasAwarded;
