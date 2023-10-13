import Modal from '@mui/material/Modal';
import styles from './ModalPreviewImg.module.scss';
import { ModalPreviewImgProps } from './ModalPreviewImg.props';
import ImageDefault from '../ImageDefault/ImageDefault';

const ModalPreviewImg = ({
  srcImg,
  openModalConfirm,
  setOpenModalConfirm,
}: ModalPreviewImgProps) => {
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
        <ImageDefault
          src={srcImg}
          width={400}
          height={400}
          alt='preview image'
          forWhat='user'
        />
      </div>
    </Modal>
  );
};

export default ModalPreviewImg;
