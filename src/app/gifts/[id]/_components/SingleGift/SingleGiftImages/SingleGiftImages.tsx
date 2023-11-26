import styles from './SingleGiftImages.module.scss';
import { SingleGiftImagesProps } from './SingleGiftImages.props';
import cn from 'classnames';
import { memo } from 'react';
import EditImagesComponent from '@/ui/EditImagesComponent/EditImagesComponent';
import { useGiftEditPhoto } from '../../../edit/_components/GiftEdit/useGiftEditPhoto';

const SingleGiftImages = ({
  gift,
  className,
  ...props
}: SingleGiftImagesProps): JSX.Element => {
  const {
    addPhotoSecond,
    removePhotoSecond,
    imageNumSecond,
    setImageNumSecond,
    imagesSecond,
  } = useGiftEditPhoto(gift);

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div></div>
      <EditImagesComponent
        imageNum={imageNumSecond}
        setImageNum={setImageNumSecond}
        images={imagesSecond}
        addPhoto={addPhotoSecond}
        removePhoto={removePhotoSecond}
        className={styles.img}
        gallery='false'
        forWhat='gift'
        editable={true}
        forSecondImg={true}
      />
    </div>
  );
};

export default memo(SingleGiftImages);
