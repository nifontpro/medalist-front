
import { BaseImage } from '@/domain/model/base/image/baseImage';
import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from 'react';

export type ImagesCarouselProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  data: BaseImage[]
  imageNum: number | undefined
  setImageNum: Dispatch<SetStateAction<number>>
  images: BaseImage[] | undefined
};
