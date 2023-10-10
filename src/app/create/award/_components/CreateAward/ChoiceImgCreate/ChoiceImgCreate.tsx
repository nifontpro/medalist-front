import ImageDefault from '@/ui/ImageDefault/ImageDefault';
import styles from './ChoiceImgCreate.module.scss';
import { ChoiceImgCreateProps } from './ChoiceImgCreate.props';
import cn from 'classnames';
import { MouseEvent, memo, useCallback } from 'react';
import Button from '@/ui/Button/Button';
import { useAppDispatch } from '@/store/hooks/hooks';
import { setVisible } from '@/store/features/visibleModalWindowGalleryAwards/visibleModalWindowGalleryAwards.slice';
import InputFile from '@/ui/InputFile/InputFile';

const ChoiceImgCreate = ({
  setVisibleModal,
  images,
  className,
  setImagesGallery,
  setImagesFile,
  gallery = true,
  ...props
}: ChoiceImgCreateProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      e.preventDefault();
      dispatch(setVisible(true));
    },
    [dispatch]
  );

  return (
    <div
      className={cn(styles.uploadField, styles.mediaVisible, className)}
      {...props}
    >
      <div className={styles.images}>
        <ImageDefault
          src={images?.imageUrl}
          width={400}
          height={400}
          alt='preview image'
          // objectFit='cover'
          priority={true}
        />
      </div>

      <div className={styles.choiceImg}>
        <InputFile
          setImagesGallery={setImagesGallery}
          setImagesFile={setImagesFile}
        >
          Загрузить изображение
        </InputFile>
        {gallery ? (
          <Button
            // ref={refOpen}
            size='m'
            appearance='blackWhite'
            onClick={(e) => handleClick(e)}
            className={styles.button}
          >
            Выбрать из галлереи
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default memo(ChoiceImgCreate);
