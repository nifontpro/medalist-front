import { User } from '@/types/user/user';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type UserPreviewProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  user: User;
  forWhat: string;
};
