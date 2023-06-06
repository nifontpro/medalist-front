import { MotionProps } from 'framer-motion';
import { DetailedHTMLProps, HTMLAttributes, RefAttributes } from 'react';

export type SpinnerFetchingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  MotionProps &
  RefAttributes<HTMLDivElement> & {
    main?: boolean;
  };
