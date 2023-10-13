import { FC, memo } from 'react';
import { ImageProps, StaticImageData } from 'next/dist/client/image';
import Image from 'next/image';
import ImageDefaultUser from './imageDefaultUser.png';
import ImageDefaultAward from './imageDefaultAward.png';
import ImageDefaultCompany from './imageDefaultCompany.png';
import ImageDefaultDept from './imageDefaultDept.png';
import cn from 'classnames';

const icons = {
  user: ImageDefaultUser,
  award: ImageDefaultAward,
  company: ImageDefaultCompany,
  dept: ImageDefaultDept,
};

type ImageDefaultProps = Omit<ImageProps, 'src'> & {
  src?: string | StaticImageData;
  forWhat: 'user' | 'award' | 'company' | 'dept';
};

const ImageDefault: FC<ImageDefaultProps> = ({
  src,
  alt,
  draggable,
  priority = true,
  width,
  height,
  forWhat,
  className,
  ...props
}) => {
  return src ? (
    <Image
      className={cn(`@apply h-[100%] w-[100%] object-cover`, className)}
      src={src}
      alt={alt ? alt : ''}
      width={width}
      height={height}
      draggable={draggable}
      priority={priority}
      {...props}
    />
  ) : (
    <Image
      className={className}
      src={icons[forWhat]}
      alt={alt ? alt : ''}
      width={width}
      height={height}
      draggable={draggable}
      priority={priority}
      {...props}
    />
  );
};

export default memo(ImageDefault);
