import { GalleryItem } from '@/domain/model/gallery/item';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  SetStateAction,
} from 'react';

export type ChoiceImgCreateProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
  images: GalleryItem | undefined;
  setImagesGallery: Dispatch<SetStateAction<GalleryItem | undefined>>;
  setImagesFile: Dispatch<SetStateAction<File | undefined>>;
};
