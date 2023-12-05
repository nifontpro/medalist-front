import styles from './FileExcelUsersModalContent.module.scss';
import cn from 'classnames';
import { FileExcelUsersModalContentProps } from './FileExcelUsersModalContent.props';
import { memo } from 'react';
import Htag from '@/ui/Htag/Htag';
import P from '@/ui/P/P';
import uniqid from 'uniqid';
import WarningIcon from '@/icons/warning.svg';
import ErrorIcon from '@/icons/warningError.svg';

const FileExcelUsersModalContent = ({
  data,
  ...props
}: FileExcelUsersModalContentProps): JSX.Element => {
  if (!data?.success) {
    return (
      <div className={styles.wrapper} {...props}>
        <Htag tag='h1' className='text-center'>
          Произошла&nbsp;ошибка!
        </Htag>
        <P size='m' fontstyle='thin' className='text-center'>
          В процессе обработки файла Excel произошла ошибка
        </P>
        <ul className={styles.errors}>
          {data?.errors.map((error) => (
            <li key={uniqid()} className={styles.error}>
              {error.message}{' '}
            </li>
          ))}
        </ul>
        <P size='m' fontstyle='thin' className='text-center'>
          Убедитесь, что файл Excel соответствует предложенному шаблону, внесите
          необходимые корректировки и попробуйте провести импорт заново
        </P>
      </div>
    );
  } else {
    let hasErrors = data.data?.addReport.some(
      (report) => report.errors.length > 0
    );

    return (
      <div className={styles.wrapper} {...props}>
        {hasErrors ? (
          <Htag tag='h1' className='text-center'>
            Есть&nbsp;проблемы!
          </Htag>
        ) : (
          <Htag tag='h1' className='text-center'>
            Успешно!
          </Htag>
        )}

        {hasErrors ? (
          <P size='m' fontstyle='thin' className='text-center'>
            Файл Excel был импортирован с ошибками и/или предупреждениями
          </P>
        ) : (
          <P size='m' fontstyle='thin' className='text-center'>
            Список сотрудников успешно импортирован из файла Excel
          </P>
        )}

        <div className={styles.success}>
          {hasErrors && (
            <ul className={styles.successInfoTable}>
              {data.data?.addReport.map((report) => {
                if (report.errors.length > 0) {
                  return report.errors.map((item) => (
                    <li key={uniqid()} className={styles.successInfoItem}>
                      <div className={styles.icon}>
                        {item.level === 'WARNING' ? (
                          <WarningIcon />
                        ) : (
                          <ErrorIcon />
                        )}
                      </div>
                      <P size='s' fontstyle='thin' className={styles.fio}>
                        {report.userDetails.user.dept.name} /{' '}
                        {report.userDetails.user.firstname}{' '}
                        {report.userDetails.user.lastname}
                      </P>
                      <span className={styles.ellipsis}>
                        ............................................................................................................................................................
                      </span>
                      <P size='s' fontstyle='thin' className={styles.message}>
                        {item.message}
                      </P>
                    </li>
                  ));
                }
                return null;
              })}
            </ul>
          )}
          <ul className={styles.successInfo}>
            <li className={styles.successInfoItem}>
              <span>Создано</span>
              <span className={styles.dots}>
                ............................................................................................................................................................
              </span>
              <span>
                {data.data?.createdDeptCount}{' '}
                <span className={styles.grayColor}>отд.</span>
              </span>
            </li>
            <li className={styles.successInfoItem}>
              <span>Добавлено</span>
              <span className={styles.dots}>
                ............................................................................................................................................................
              </span>
              <span>
                {data.data?.createdUserCount}{' '}
                <span className={styles.grayColor}>чел.</span>
              </span>
            </li>
            <li className={styles.successInfoItem}>
              <span>Обновлено</span>
              <span className={styles.dots}>
                ............................................................................................................................................................
              </span>
              <span>
                {data.data?.updatedUserCount}{' '}
                <span className={styles.grayColor}>чел.</span>
              </span>
            </li>
          </ul>
        </div>

        {hasErrors ? (
          <P size='m' fontstyle='thin' className='text-center'>
            Сотрудники с ошибками не были внесены в компанию. Сотрудники с
            предупреждениями внесены, но необходимо скорректировать их данные.
            Вы можете внести изменения в файл Excel и повторно импортировать его
            - данные сотрудников будут обновлены
          </P>
        ) : (
          <P size='m' fontstyle='thin' className='text-center'>
            Рекомендуем проверить корректность загруженных данных. При
            необходимости, Вы можете внести изменения в файл Excel и повторно
            импортировать его - данные сотрудников будут обновлены
          </P>
        )}
      </div>
    );
  }
};

FileExcelUsersModalContent.displayName = 'FileExcelUsersModalContent';

export default memo(FileExcelUsersModalContent);
