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
import EditPanelDeptBtn from '@/ui/EditPanelDeptBtn/EditPanelDeptBtn';
import Spinner from '@/ui/Spinner/Spinner';
import NoAccess from '@/ui/NoAccess/NoAccess';
import { memo, useCallback, useRef, useState } from 'react';
import ModalWindowWithAddEvent from '@/ui/ModalWindowWithAddEvent/ModalWindowWithAddEvent';
import Button from '@/ui/Button/Button';
import { useRouter } from 'next/navigation';
import useOutsideClick from '@/hooks/useOutsideClick';

const TitleSingleDepartment = ({
  id,
  children,
  className,
  ...props
}: TitleSingleDepartmentProps): JSX.Element => {
  const { push } = useRouter();

  const {
    deleteDepartmentAsync,
    singleDepartment: department,
    isLoadingByIdDept,
  } = useDepartmentAdmin(id);

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

        {/* <div className={styles.address}>
          <GpsIcon />
          <P size='s' className={styles.description}>
            {department.data?.address}
          </P>
        </div> */}

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
