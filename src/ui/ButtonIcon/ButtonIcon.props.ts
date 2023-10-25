import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  children: ReactNode;
  appearance:
    | 'white'
    | 'black'
    | 'gray'
    | 'lightGray'
    | 'whiteBlack'
    | 'lime'
    | 'graySilver'
    | 'grayGifts';
};
