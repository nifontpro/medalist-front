import styles from './InputFile.module.scss';
import cn from 'classnames';
import { InputFileProps } from './InputFile.props';
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  memo,
  useCallback,
} from 'react';
import Button from '../Button/Button';
import { toast } from 'react-toastify';

const InputFile = forwardRef(
  (
    {
      setImagesGallery,
      setImagesFile,
      className,
      children,
      ...props
    }: InputFileProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    const handleChangeImages = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
          const file = event.target.files[0];
          const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

          if (file.size > 20971520) {
            toast.error('Размер фотографии должен быть меньше 1МБ');
          } else if (!allowedTypes.includes(file.type)) {
            toast.error('Формат фотографии должен быть PNG, JPEG или JPG');
          } else {
            setImagesFile(event.target.files[0]);
            setImagesGallery({
              id: -1,
              folderId: 123,
              name: 'xxx123',
              imageUrl: URL.createObjectURL(event.target.files[0]),
            });
          }
        }
      },
      [setImagesFile, setImagesGallery]
    );

    return (
      <div className={cn(styles.inputWrapper, className)}>
        <input
          onChange={handleChangeImages}
          type='file'
          className={styles.inputFile}
          ref={ref}
          {...props}
        />
        <Button
          // ref={refOpen}
          size='m'
          appearance='blackWhite'
          // onClick={(e) => handleClick(e)}
          className={styles.button}
        >
          {children}
        </Button>
      </div>
    );
  }
);

InputFile.displayName = 'file';

export default memo(InputFile);
