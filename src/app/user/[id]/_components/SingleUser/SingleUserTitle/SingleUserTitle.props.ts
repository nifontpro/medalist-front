import { Activity } from '@/domain/model/award/Activity';
import { UserDetails } from '@/domain/model/user/userDetails';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from 'react';

export type SingleUserTitleProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  user: UserDetails | undefined;
  userActiv: Activity[] | undefined;
  setVisibleModal: Dispatch<SetStateAction<boolean>>;
  refOpen: MutableRefObject<null>;
  setVisibleModalEvent: Dispatch<SetStateAction<boolean>>;
};
