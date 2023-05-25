'use client';

import ButtonEdit from '../ButtonEdit/ButtonEdit';
import ImagesCarousel from '../ImagesCarousel/ImagesCarousel';
import InputPhotoAdd from '../InputPhotoAdd/InputPhotoAdd';
import styles from './EditImagesComponent.module.scss';
import cn from 'classnames';
import { EditImagesComponentProps } from './EditImagesComponent.props';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks/hooks';
import { setVisible } from '@/store/features/visibleModalWindowGalleryAwards/visibleModalWindowGalleryAwards.slice';

const EditImagesComponent = ({
  imageNum,
  setImageNum,
  images,
  addPhoto,
  removePhoto,
  className,
  ...props
}: EditImagesComponentProps) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

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
          {pathname.startsWith('/award') ||
          pathname.startsWith('/create/award') ? (
            <div
              className='@apply cursor-pointer flex items-center justify-center mr-[10px]'
              onClick={() => dispatch(setVisible(true))}
            >
              GAL
            </div>
          ) : null}
          {images && images.length > 0 && (
            <ButtonEdit icon='remove' onClick={(e) => removePhoto(e)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditImagesComponent;
