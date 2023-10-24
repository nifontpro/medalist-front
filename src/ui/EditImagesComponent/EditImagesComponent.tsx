'use client';

import ButtonEdit from '../ButtonEdit/ButtonEdit';
import ImagesCarousel from '../ImagesCarousel/ImagesCarousel';
import styles from './EditImagesComponent.module.scss';
import cn from 'classnames';
import { EditImagesComponentProps } from './EditImagesComponent.props';
import EditPanelImgBtn from '../EditPanelImgBtn/EditPanelImgBtn';
import { memo } from 'react';
import { usePathname } from 'next/navigation';
import AuthComponent from '@/store/providers/AuthComponent';
import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';

const EditImagesComponent = ({
  imageNum,
  setImageNum,
  images,
  addPhoto,
  removePhoto,
  gallery,
  forWhat,
  id,
  className,
  ...props
}: EditImagesComponentProps) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );

  const pathname = usePathname();

  const editable = typeOfUser?.id === id;

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
            forWhat={forWhat}
            data={images}
            imageNum={imageNum}
            setImageNum={setImageNum}
            images={images}
            edit={true}
          />
        )}

        <AuthComponent minRole={editable ? 'USER' : 'ADMIN'}>
          <div className={styles.editPanel}>
            {images &&
            images.length < 1 &&
            pathname.split('/')[1] === 'award' ? (
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
        </AuthComponent>
      </div>
    </div>
  );
};

export default memo(EditImagesComponent);
