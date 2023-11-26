import Modal from '@mui/material/Modal';
import styles from './ModalConfirm.module.scss';
import { ModalConfirmProps } from './ModalConfirm.props';
import Button from '../Button/Button';
import P from '../P/P';

const ModalConfirm = ({
  title,
  textBtn,
  text,
  openModalConfirm,
  setOpenModalConfirm,
  onConfirm,
  children,
}: ModalConfirmProps) => {
  const handleClose = () => {
    setOpenModalConfirm(false);
  };

  return (
    <Modal
      open={openModalConfirm}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div className={styles.wrapper}>
        <P size='xl' className={styles.text}>
          {title}
        </P>
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
            className={styles.cancel}
          >
            {textBtn}
          </Button>
          <Button
            onClick={handleClose}
            appearance='whiteBlack'
            size='l'
            className={styles.confirm}
          >
            Отменить
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
