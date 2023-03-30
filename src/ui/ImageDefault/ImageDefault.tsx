import { FC } from 'react';
import { ImageProps, StaticImageData } from 'next/dist/client/image';
import Image from 'next/image';

type ImageDefaultProps = Omit<ImageProps, 'src'> & {
  src?: string | StaticImageData;
};

export const ImageDefault: FC<ImageDefaultProps> = ({
  src,
  alt,
  layout,
  draggable,
  priority,
  width,
  height,
  objectFit,
  className,
}) => {
  return src ? (
    <Image
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
      layout={layout}
      draggable={draggable}
      priority={priority}
      objectFit={objectFit}
    />
  ) : null
};
