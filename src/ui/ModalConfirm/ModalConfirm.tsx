import Modal from '@mui/material/Modal';
import styles from './ModalConfirm.module.scss';
import { ModalConfirmProps } from './ModalConfirm.props';
import Button from '../Button/Button';
import P from '../P/P';
import cn from 'classnames';

const ModalConfirm = ({
  title,
  textBtn,
  text,
  openModalConfirm,
  setOpenModalConfirm,
  onConfirm,
  confirmOnly = false,
  onClose,
  children,
}: ModalConfirmProps) => {
  const handleClose = () => {
    setOpenModalConfirm(false);
    if (onClose) onClose();
  };

  return (
    <Modal
      open={openModalConfirm}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div className={styles.wrapper}>
        {title && (
          <P size='xl' className={styles.text}>
            {title}
          </P>
        )}
        <div>{children}</div>
        {text && (
          <P size='m' fontstyle='thin' className={styles.text}>
            {text}
          </P>
        )}

        <div className={styles.buttons}>
          <Button
            onClick={onConfirm}
            appearance='blackWhite'
            size='l'
            className={cn(styles.cancel, {
              [styles.onlyConfirmBtn]: confirmOnly,
            })}
          >
            {textBtn}
          </Button>

          {!confirmOnly && (
            <Button
              onClick={handleClose}
              appearance='whiteBlack'
              size='l'
              className={styles.confirm}
            >
              Отменить
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
