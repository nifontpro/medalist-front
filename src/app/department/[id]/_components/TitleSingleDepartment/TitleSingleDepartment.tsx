'use client';

import styles from './TitleSingleDepartment.module.scss';
import { TitleSingleDepartmentProps } from './TitleSingleDepartment.props';
import Htag from '@/ui/Htag/Htag';
import GpsIconSvg from './gps.svg';
import P from '@/ui/P/P';
import { useDepartmentAdmin } from '@/api/dept/useDepartmentAdmin';
import {
  getDepartmentCreateUrl,
  getDepartmentEditUrl,
} from '@/config/api.config';
import ImagesCarousel from '@/ui/ImagesCarousel/ImagesCarousel';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import { memo, useCallback, useState } from 'react';
import ModalWindowWithAddEvent from '@/ui/ModalWindowWithAddEvent/ModalWindowWithAddEvent';
import Button from '@/ui/Button/Button';
import { useRouter } from 'next/navigation';
import EditPanelAuthBtn from '@/ui/EditPanelAuthBtn/EditPanelAuthBtn';
import AuthComponent from '@/store/providers/AuthComponent';
import { deptApi } from '@/api/dept/dept.api';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { userApi } from '@/api/user/user.api';
import CountUsersPreview from '@/ui/CountUsersPreview/CountUsersPreview';
import { declOfNum } from '@/utils/declOfNum';
import { ForWhat } from '@/ui/ImageDefault/ImageDefault';

const TitleSingleDepartment = ({
  id,
  children,
  className,
  ...props
}: TitleSingleDepartmentProps): JSX.Element => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const { push } = useRouter();

  const { data: department, isLoading: isLoadingByIdDept } =
    deptApi.useGetByIdQuery(
      {
        authId: typeOfUser?.id!,
        deptId: Number(id),
      },
      {
        skip: !id || !typeOfUser,
      }
    );

  const forWhat: ForWhat =
    department?.data?.dept.level <= 2
      ? ('company' as ForWhat)
      : ('dept' as ForWhat);

  // Получить сотрудников отдела/подотделов
  const { data: usersOnDepartment, isLoading: isLoadingUsersOnDepartment } =
    userApi.useGetUsersByDeptQuery(
      {
        authId: typeOfUser?.id!,
        deptId: Number(id),
        baseRequest: {
          // subdepts: switcher,
          subdepts: true,
          page: 0,
          pageSize: 4,
          orders: [{ field: 'lastname', direction: 'ASC' }],
        },
      },
      {
        skip: !id || !typeOfUser,
      }
    );

  const { deleteDepartmentAsync } = useDepartmentAdmin();

  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  const handleAddEvent = useCallback(() => {
    setVisibleModal(true);
  }, []);

  if (isLoadingByIdDept) return <Spinner />;
  if (!department?.success) {
    return <NoAccess button={false} />;
  }

  return (
    <div className={styles.titleCompany} {...props}>
      <ImagesCarousel
        data={department.data?.dept.images}
        edit={false}
        className={styles.img}
        forWhat={forWhat}
      />

      <div className={styles.companyDescription}>
        <EditPanelAuthBtn
          onlyRemove={false}
          handleRemove={deleteDepartmentAsync}
          id={department.data?.dept.id}
          getUrlEdit={getDepartmentEditUrl}
          className={styles.dots}
        />

        <div className={styles.title}>
          <Htag tag='h1' className={styles.header}>
            {department.data?.dept.name}
          </Htag>
        </div>

        {/* <div className={styles.address}>
          <GpsIcon />
          <P size='s' className={styles.description}>
            {department.data?.address}
          </P>
        </div> */}

        {department.data?.phone || department.data?.email ? (
          <div className={styles.contacts}>
            {department.data?.email ? (
              <a href={`mailto:${department.data?.email}`}>
                <P size='m'>{department.data?.email}</P>
              </a>
            ) : null}
            {department.data.phone ? (
              <a href={`tel:${department.data.phone}`} className='mt-[10px]'>
                <P size='m'>{department.data?.phone}</P>
              </a>
            ) : null}
          </div>
        ) : null}

        {usersOnDepartment?.data?.length &&
        usersOnDepartment?.data?.length > 0 ? (
          <div className={styles.countUsers}>
            <P size='xs' color='gray' fontstyle='thin'>
              {usersOnDepartment?.pageInfo?.totalElements}{' '}
              {declOfNum(usersOnDepartment?.pageInfo?.totalElements!, [
                'сотрудник',
                'сотрудника',
                'сотрудников',
              ])}
            </P>
            <CountUsersPreview
              appearanceBtn='black'
              users={usersOnDepartment?.data}
              className={styles.default}
              totalUsers={usersOnDepartment?.pageInfo?.totalElements}
            />
          </div>
        ) : null}

        <AuthComponent minRole='ADMIN'>
          <div className={styles.buttonsWrapper}>
            <Button
              onClick={() => push(getDepartmentCreateUrl(`?id=${id}`))}
              appearance='blackWhite'
              size='l'
              className={styles.excelBtn}
            >
              Добавить отдел
            </Button>
            <Button
              onClick={handleAddEvent}
              appearance='whiteBlack'
              size='l'
              className={styles.createEventBtn}
            >
              Добавить событие
            </Button>
          </div>
        </AuthComponent>

        {department.data?.description ? (
          <>
            <P size='s' className={styles.description}>
              {department.data.dept.level <= 2 ? 'О компании' : 'Об отделе'}:{' '}
            </P>
            <P size='m' fontstyle='thin'>
              {department.data?.description}
            </P>
          </>
        ) : null}
      </div>

      <ModalWindowWithAddEvent
        forWhat='Dept'
        id={id}
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        textBtn='Создать событие'
      />
    </div>
  );
};
export default memo(TitleSingleDepartment);

//Для мемоизации svg icon
const GpsIcon = memo(() => {
  return <GpsIconSvg className='mr-[10px]' />;
});
GpsIcon.displayName = 'GpsIcon';
//__________________
