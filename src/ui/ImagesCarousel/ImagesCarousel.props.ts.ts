import { BaseResponse } from '@/domain/model/base/baseResponse';
import { BaseImage } from '@/domain/model/base/image/baseImage';
import { UserDetails } from '@/domain/model/user/userDetails';
import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from 'react';

export type ImagesCarouselProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  singleUser: BaseResponse<UserDetails>
  imageNum: number | undefined
  setImageNum: Dispatch<SetStateAction<number>>
  images: BaseImage[] | undefined
};
