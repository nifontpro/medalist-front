import styles from './InputFileExcelUsersBtns.module.scss';
import cn from 'classnames';
import { InputFileExcelUsersBtnsProps } from './InputFileExcelUsersBtns.props';
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  memo,
  MouseEvent,
  useCallback,
  useRef,
  useState,
} from 'react';
import { read, readFile, utils } from 'xlsx';
import ModalWindowExcelAddUsers from './ModalWindowExcelAddUsers/ModalWindowExcelAddUsers';
import { DataSheets } from './inputExls.types';
import ButtonCircleIcon from '../ButtonCircleIcon/ButtonCircleIcon';

const InputFileExcelUsersBtns = forwardRef(
  (
    { department, className, children, ...props }: InputFileExcelUsersBtnsProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);

    const [fileName, setFileName] = useState<string>('');
    const [data, setData] = useState<DataSheets[] | null>(null);

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

    //Ниже код для очистки input
    const inputFileRef = useRef<HTMLInputElement>(null);
    const handleClearInput = () => {
      if (inputFileRef.current) {
        inputFileRef.current.value = '';
      }
    };
    //__________

    return (
      <>
        <div className={cn(styles.inputWrapper, className)}>
          <input
            accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
            type='file'
            className={styles.inputFile}
            ref={inputFileRef}
            onChange={(e) => handleChange(e)}
            onClick={() => setVisibleModal(true)}
            {...props}
          />
          <label className={styles.fileButton}>
            <ButtonCircleIcon
              classNameForIcon='@apply w-[12px] h-[12px]'
              icon='plus'
              appearance='black'
            ></ButtonCircleIcon>
            <span className={styles.buttonText}>{children} </span>
          </label>
        </div>

        <ModalWindowExcelAddUsers
          department={department}
          data={data}
          setData={setData}
          fileName={fileName}
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          handleClearInput={handleClearInput}
          textBtn='Загрузить'
          // ref={ref}
        />
      </>
    );
  }
);

InputFileExcelUsersBtns.displayName = 'InputFileExcelUsersBtns';

export default memo(InputFileExcelUsersBtns);
