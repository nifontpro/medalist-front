import { BaseImage } from '@/domain/model/base/image/baseImage';
import { ChangeEvent, DetailedHTMLProps, Dispatch, HTMLAttributes, MouseEvent, ReactNode, SetStateAction } from 'react';

export type EditImagesComponentProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
  imageNum: number
  setImageNum: Dispatch<SetStateAction<number>>
  images: BaseImage[] | undefined
  addPhoto: (event: ChangeEvent<HTMLInputElement>) => Promise<void>
  removePhoto: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => Promise<void>
};
