'use client';

import { useAppSelector } from '@/store/hooks/hooks';
import { RootState } from '@/store/storage/store';
import { checkRole } from '@/utils/checkRole';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { memo } from 'react';
import ButtonEdit from '../ButtonEdit/ButtonEdit';
import EditPanelImgBtn from '../EditPanelImgBtn/EditPanelImgBtn';
import ImagesCarousel from '../ImagesCarousel/ImagesCarousel';
import styles from './EditImagesComponent.module.scss';
import { EditImagesComponentProps } from './EditImagesComponent.props';

const EditImagesComponent = ({
  imageNum,
  setImageNum,
  images,
  addPhoto,
  removePhoto,
  gallery,
  forWhat,
  userId,
  editable,
  className,
  forSecondImg = false,
  ...props
}: EditImagesComponentProps) => {
  const { typeOfUser } = useAppSelector(
    (state: RootState) => state.userSelection
  );
  let edit = false;

  const pathname = usePathname();

  if (editable) {
    if (userId && !checkRole(typeOfUser, 'ADMIN')) {
      edit = typeOfUser?.id === Number(userId);
    } else {
      edit = checkRole(typeOfUser, 'ADMIN');
    }
  } else {
    edit = false;
  }

  return (
    <div
      className={cn('@apply flex justify-center items-center', className)}
      {...props}
    >
      <div
        className={cn(styles.field, styles.uploadField, styles.mediaVisible, {
          [styles.wrapperSecondImages]: forSecondImg,
        })}
      >
        {images && (
          <ImagesCarousel
            forWhat={forWhat}
            data={images}
            imageNum={imageNum}
            setImageNum={setImageNum}
            images={images}
            edit={true}
            forSecondImg={forSecondImg}
          />
        )}

        {edit && (
          <div
            className={cn(styles.editPanel, {
              [styles.editPanelMt]: images && images.length == 0,
            })}
          >
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
        )}
      </div>
    </div>
  );
};

export default memo(EditImagesComponent);
