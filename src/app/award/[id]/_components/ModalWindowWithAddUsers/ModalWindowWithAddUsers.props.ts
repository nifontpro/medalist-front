import { ActionType } from '@/types/award/Activity';
import { User } from '@/types/user/user';
import { MotionProps } from 'framer-motion';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  FormEvent,
  RefAttributes,
  SetStateAction,
} from 'react';

export type ModalWindowWithAddUsersProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  MotionProps &
  RefAttributes<HTMLDivElement> & {
    visibleModal: boolean;
    setVisibleModal: Dispatch<SetStateAction<boolean>>;
    setSearchValue: Dispatch<SetStateAction<string>>;
    addUsersSearchHandleChange: (event: FormEvent<HTMLInputElement>) => void;
    users: User[];
    awardId: string;
    awardState: ActionType;
    textBtn: string;
    setPage: Dispatch<SetStateAction<number>>;
    page: number;
    prevPage: () => void;
    nextPage: () => void;
    totalPage: number | undefined;
  };
