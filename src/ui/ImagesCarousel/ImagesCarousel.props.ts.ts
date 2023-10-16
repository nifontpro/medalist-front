import { BaseImage } from '@/types/base/image/baseImage';
import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from 'react';

export type ImagesCarouselProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  data: BaseImage[];
  imageNum?: number | undefined;
  setImageNum?: Dispatch<SetStateAction<number>>;
  images?: BaseImage[] | undefined;
  edit: boolean;
  forWhat: 'award' | 'user' | 'company' | 'dept';
};
