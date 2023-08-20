import styles from './InputFileExcelUsers.module.scss';
import cn from 'classnames';
import { InputFileExcelUsersProps } from './InputFileExcelUsers.props';
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  memo,
  MouseEvent,
  useCallback,
  useState,
} from 'react';
import { read, readFile, utils } from 'xlsx';
import ModalWindowExcelAddUsers from './ModalWindowExcelAddUsers/ModalWindowExcelAddUsers';
import { DataSheets } from './inputExls.types';

const InputFileExcelUsers = forwardRef(
  (
    { department, className, children, ...props }: InputFileExcelUsersProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);

    const [fileName, setFileName] = useState<string>('');
    const [data, setData] = useState<DataSheets[]>();

    const handleChange = useCallback(
      async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
          if (e.currentTarget.files[0]) {
            setFileName(e.currentTarget.files[0].name);
            const data = await e.currentTarget.files[0].arrayBuffer();
            const workbook = read(data);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonDate = utils.sheet_to_json<DataSheets>(worksheet, {
              range: 4,
            });

            setData(jsonDate);
          }
        }
      },
      []
    );

    return (
      <>
        <div className={cn(styles.inputWrapper, className)}>
          <input
            accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
            type='file'
            className={styles.inputFile}
            ref={ref}
            onChange={(e) => handleChange(e)}
            onClick={() => setVisibleModal(true)}
            {...props}
          />
          <label className={styles.fileButton}>
            <span className={styles.buttonText}>
              {children}{' '}
              <a
                className={styles.link}
                href='https://storage.yandexcloud.net/medalist/doc/users.xlsx'
              >
                Скачать шаблон
              </a>
            </span>{' '}
          </label>
        </div>

        <ModalWindowExcelAddUsers
          department={department}
          data={data}
          fileName={fileName}
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          textBtn='Загрузить'
          ref={ref}
        />
      </>
    );
  }
);

InputFileExcelUsers.displayName = 'InputFileExcelUsers';

export default memo(InputFileExcelUsers);
