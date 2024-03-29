import { ActionType, Activity } from '@/types/award/Activity';
import { UserDetails } from '@/types/user/userDetails';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type CardUserAwardProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  award: Activity;
  user: UserDetails | undefined;
  userRewardAsync: (
    awardId: number,
    actionType: ActionType,
    userId: number
  ) => Promise<void>;
};
