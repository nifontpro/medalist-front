import { BaseImage } from '@/types/base/image/baseImage';
import {
  ChangeEvent,
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  SetStateAction,
} from 'react';
import { ForWhat } from '../ImageDefault/ImageDefault';

export type EditImagesComponentProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
  imageNum: number;
  setImageNum: Dispatch<SetStateAction<number>>;
  images: BaseImage[] | undefined;
  addPhoto: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  removePhoto: (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => Promise<void>;
  gallery: 'true' | 'false';
  forWhat: ForWhat;
  userId?: string;
  editable?: boolean;
};
