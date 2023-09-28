import { ActionType } from '@/types/award/Activity';
import { Award } from '@/types/award/Award';
import { MotionProps } from 'framer-motion';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  FormEvent,
  ReactNode,
  RefAttributes,
  SetStateAction,
} from 'react';

export type ModalWindowWithAddAwardsProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  MotionProps &
  RefAttributes<HTMLDivElement> & {
    visibleModal: boolean;
    setVisibleModal: Dispatch<SetStateAction<boolean>>;
    awards: Award[];
    userId: string;
    awardState: ActionType;
    textBtn: string;
    setPage: Dispatch<SetStateAction<number>>;
    page: number;
    prevPage: () => void;
    nextPage: () => void;
    totalPage: number | undefined;
    setSearchValue: Dispatch<SetStateAction<string>>;
    searchHandleChange: (event: FormEvent<HTMLInputElement>) => void;
  };
