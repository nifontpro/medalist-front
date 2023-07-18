import { FC, memo } from 'react';
import { ImageProps, StaticImageData } from 'next/dist/client/image';
import Image from 'next/image';
import DefaultImage from './imageDefault.png';

type ImageDefaultProps = Omit<ImageProps, 'src'> & {
  src?: string | StaticImageData;
};

const ImageDefault: FC<ImageDefaultProps> = ({
  src,
  alt,
  draggable,
  priority = true,
  width,
  height,
  className,
}) => {
  return src ? (
    <Image
      className={className}
      src={src}
      alt={alt ? alt : ''}
      width={width}
      height={height}
      draggable={draggable}
      priority={priority}
    />
  ) : (
    <Image
      className={className}
      src={DefaultImage}
      alt={alt ? alt : ''}
      width={width}
      height={height}
      draggable={draggable}
      priority={priority}
    />
  );
};

export default memo(ImageDefault);
