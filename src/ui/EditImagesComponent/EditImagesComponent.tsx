'use client';

import ButtonEdit from '../ButtonEdit/ButtonEdit';
import ImagesCarousel from '../ImagesCarousel/ImagesCarousel';
import InputPhotoAdd from '../InputPhotoAdd/InputPhotoAdd';
import styles from './EditImagesComponent.module.scss';
import cn from 'classnames';
import { EditImagesComponentProps } from './EditImagesComponent.props';

const EditImagesComponent = ({
  imageNum,
  setImageNum,
  images,
  addPhoto,
  removePhoto,
  className,
  ...props
}: EditImagesComponentProps) => {
  return (
    <div
      className={cn('@apply flex justify-center items-center', className)}
      {...props}
    >
      <div
        className={cn(styles.field, styles.uploadField, styles.mediaVisible)}
      >
        {images && (
          <ImagesCarousel
            data={images}
            imageNum={imageNum}
            setImageNum={setImageNum}
            images={images}
            edit={true}
          />
        )}

        <div className={styles.editPanel}>
          <InputPhotoAdd onChange={addPhoto} className={styles.input}>
            <ButtonEdit icon='edit' />
          </InputPhotoAdd>
          {images && images.length > 0 && (
            <ButtonEdit icon='remove' onClick={(e) => removePhoto(e)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditImagesComponent;
