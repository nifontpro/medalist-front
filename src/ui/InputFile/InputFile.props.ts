import { GalleryItem } from '@/types/gallery/item';
import {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
} from 'react';

export type InputFileProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  children: ReactNode;
  setImagesGallery: Dispatch<SetStateAction<GalleryItem | undefined>>;
  setImagesFile: Dispatch<SetStateAction<File | undefined>>;
};
