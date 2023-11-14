import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type PProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
> & {
  children?: ReactNode;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  fontstyle?: 'thin' | 'bold';
  color?: 'gray' | 'white' | 'gray96' | 'black' | 'graySilver';
  type?: 'silverBtn' | 'limeBtn' | 'grayBtn';
};
