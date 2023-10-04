'use client';

import ButtonEdit from '../ButtonEdit/ButtonEdit';
import ImagesCarousel from '../ImagesCarousel/ImagesCarousel';
import styles from './EditImagesComponent.module.scss';
import cn from 'classnames';
import { EditImagesComponentProps } from './EditImagesComponent.props';
import EditPanelImgBtn from '../EditPanelImgBtn/EditPanelImgBtn';
import { memo } from 'react';
import { usePathname } from 'next/navigation';

const EditImagesComponent = ({
  imageNum,
  setImageNum,
  images,
  addPhoto,
  removePhoto,
  gallery,
  className,
  ...props
}: EditImagesComponentProps) => {
  const pathname = usePathname();

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
          {images && images.length < 1 && pathname.split('/')[1] === 'award' ? (
            <EditPanelImgBtn gallery={gallery} onChangeImages={addPhoto} />
          ) : pathname.split('/')[1] !== 'award' ? (
            <EditPanelImgBtn gallery={gallery} onChangeImages={addPhoto} />
          ) : null}
          {images && images.length > 0 && (
            <ButtonEdit
              icon='remove'
              onClick={(e) => removePhoto(e)}
              className={styles.removeBtn}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(EditImagesComponent);
