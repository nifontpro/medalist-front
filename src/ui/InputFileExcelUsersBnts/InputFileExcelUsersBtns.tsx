import styles from './InputFileExcelUsersBtns.module.scss';
import cn from 'classnames';
import { InputFileExcelUsersBtnsProps } from './InputFileExcelUsersBtns.props';
import { ForwardedRef, forwardRef, memo } from 'react';
import ButtonCircleIcon from '../ButtonCircleIcon/ButtonCircleIcon';
import ModalConfirm from '../ModalConfirm/ModalConfirm';
import { useInputFileExcelUsersBtns } from './useInputFileExcelUsersBtns';
import FileExcelUsersModalContent from './FileExcelUsersModalContent/FileExcelUsersModalContent';

const InputFileExcelUsersBtns = forwardRef(
  (
    { department, className, children, ...props }: InputFileExcelUsersBtnsProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    const {
      inputFileRef,
      handleChange,
      visibleModal,
      setVisibleModal,
      handleCloseModal,
      data,
    } = useInputFileExcelUsersBtns(department);

    return (
      <>
        <div className={cn(styles.inputWrapper, className)}>
          <input
            type='file'
            className={styles.inputFile}
            ref={inputFileRef}
            onChange={(e) => handleChange(e)}
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

        <ModalConfirm
          textBtn={'Продолжить'}
          openModalConfirm={visibleModal}
          setOpenModalConfirm={setVisibleModal}
          onConfirm={handleCloseModal}
          confirmOnly={true}
          onClose={handleCloseModal}
        >
          <FileExcelUsersModalContent data={data} />
        </ModalConfirm>
      </>
    );
  }
);

InputFileExcelUsersBtns.displayName = 'InputFileExcelUsersBtns';

export default memo(InputFileExcelUsersBtns);
