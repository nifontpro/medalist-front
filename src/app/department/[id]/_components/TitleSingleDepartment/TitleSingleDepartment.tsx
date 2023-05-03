import styles from './TitleSingleDepartment.module.scss';
import { TitleSingleDepartmentProps } from './TitleSingleDepartment.props';
import Htag from '@/ui/Htag/Htag';
import EditPanelAuthBtn from '@/ui/EditPanelDeptBtn/EditPanelDeptBtn';
import GpsIcon from './gps.svg';
import P from '@/ui/P/P';
import { useDepartmentAdmin } from '@/app/department/useDepartmentAdmin';
import {
  getDepartmentCreateUrl,
  getDepartmentEditUrl,
} from '@/config/api.config';
import ImagesCarousel from '@/ui/ImagesCarousel/ImagesCarousel';
import InputFileExcelUsers from '@/ui/InputFileExcelUsers/InputFileExcelUsers';

const TitleSingleDepartment = ({
  department,
  children,
  className,
  ...props
}: TitleSingleDepartmentProps): JSX.Element => {
  const { deleteDepartmentAsync } = useDepartmentAdmin();

  return (
    <div className={styles.titleCompany} {...props}>
      <ImagesCarousel
        data={department?.dept.images}
        edit={false}
        className={styles.img}
      />

      <div className={styles.companyDescription}>
        <EditPanelAuthBtn
          onlyRemove={false}
          handleRemove={deleteDepartmentAsync}
          id={department.dept.id}
          getUrlEdit={getDepartmentEditUrl}
          getUrlCreate={getDepartmentCreateUrl}
          className={styles.dots}
        />
        <div className={styles.title}>
          <Htag tag='h1' className={styles.header}>
            {department.dept.name}
          </Htag>
        </div>
        <div className={styles.address}>
          <GpsIcon className='mr-[10px]' />
          <P size='s' className={styles.description}>
            {department.address}
          </P>
        </div>

        <P size='s' className={styles.description}>
          {department.description}
        </P>
        <div className={styles.contacts}>
          <a href={`tel:${department.dept.phone}`}>
            Сотовый:{' '}
            {department.dept.phone
              ? department.dept.phone
              : 'Сотовый не указан'}
          </a>
          <a href={`mailto:${department.email}`}>Почта: {department.email}</a>
        </div>

        <InputFileExcelUsers department={department}>
          Добавить сотрудников из EXCEL
        </InputFileExcelUsers>

        {/* <div className={styles.colUsers}>
          <CountUsersPreview
            appearanceBtn='black'
            usersInDepartment={users}
            className={styles.default}
          />
        </div> */}
      </div>
    </div>
  );
};
export default TitleSingleDepartment;
