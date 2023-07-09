'use client';

import styles from './TitleSingleDepartment.module.scss';
import { TitleSingleDepartmentProps } from './TitleSingleDepartment.props';
import Htag from '@/ui/Htag/Htag';
import GpsIcon from './gps.svg';
import P from '@/ui/P/P';
import { useDepartmentAdmin } from '@/api/dept/useDepartmentAdmin';
import {
  getDepartmentCreateUrl,
  getDepartmentEditUrl,
} from '@/config/api.config';
import ImagesCarousel from '@/ui/ImagesCarousel/ImagesCarousel';
import InputFileExcelUsers from '@/ui/InputFileExcelUsers/InputFileExcelUsers';
import EditPanelDeptBtn from '@/ui/EditPanelDeptBtn/EditPanelDeptBtn';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import { useState } from 'react';
import ModalWindowWithAddEvent from '@/ui/ModalWindowWithAddEvent/ModalWindowWithAddEvent';
import Button from '@/ui/Button/Button';

const TitleSingleDepartment = ({
  id,
  children,
  className,
  ...props
}: TitleSingleDepartmentProps): JSX.Element => {
  const {
    deleteDepartmentAsync,
    singleDepartment: department,
    isLoadingByIdDept,
  } = useDepartmentAdmin(id);

  const [visibleModal, setVisibleModal] = useState<boolean>(false);

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
      />

      <div className={styles.companyDescription}>
        <EditPanelDeptBtn
          onlyRemove={false}
          handleRemove={deleteDepartmentAsync}
          id={department.data?.dept.id}
          getUrlEdit={getDepartmentEditUrl}
          getUrlCreate={getDepartmentCreateUrl}
          className={styles.dots}
        />

        <div className={styles.title}>
          <Htag tag='h1' className={styles.header}>
            {department.data?.dept.name}
          </Htag>
        </div>
        <div className={styles.address}>
          <GpsIcon className='mr-[10px]' />
          <P size='s' className={styles.description}>
            {department.data?.address}
          </P>
        </div>

        <P size='s' className={styles.description}>
          {department.data?.description}
        </P>
        <div className={styles.contacts}>
          <a href={`tel:${department.data?.dept.phone}`}>
            Сотовый:{' '}
            {department.data?.dept.phone
              ? department.data?.dept.phone
              : 'Сотовый не указан'}
          </a>
          <a href={`mailto:${department.data?.email}`}>
            Почта: {department.data?.email}
          </a>
        </div>
        <div className={styles.buttonsWrapper}>
          {department && department.data && (
            <InputFileExcelUsers
              department={department.data}
              className={styles.excelBtn}
            >
              Добавить сотрудников из EXCEL
            </InputFileExcelUsers>
          )}
          <Button
            onClick={() => setVisibleModal(true)}
            appearance='whiteBlack'
            size='l'
            className={styles.createEventBtn}
          >
            Создать событие
          </Button>
        </div>

        {/* <div className={styles.colUsers}>
          <CountUsersPreview
            appearanceBtn='black'
            usersInDepartment={users}
            className={styles.default}
          />
        </div> */}
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
export default TitleSingleDepartment;
