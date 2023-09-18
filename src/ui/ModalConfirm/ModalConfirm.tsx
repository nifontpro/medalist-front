import Modal from '@mui/material/Modal';
import styles from './ModalConfirm.module.scss';
import { ModalConfirmProps } from './ModalConfirm.props';
import Button from '../Button/Button';
import P from '../P/P';

const ModalConfirm = ({
  text,
  openModalConfirm,
  setOpenModalConfirm,
  onConfirm,
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
        <P size='xs' fontstyle='thin' className={styles.text}>
          {text}
        </P>
        <div className={styles.buttons}>
          <Button
            onClick={onConfirm}
            appearance='blackWhite'
            size='l'
            className={styles.cancel}
          >
            Удалить
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
