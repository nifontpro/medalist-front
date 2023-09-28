
import { GalleryItem } from '@/types/gallery/item';
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, SetStateAction } from 'react';

export type ChoiceItemImgProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  itemImg: GalleryItem,
  imagesPreview: GalleryItem | undefined
  setImagesPreview: Dispatch<SetStateAction<GalleryItem | undefined>>
};
