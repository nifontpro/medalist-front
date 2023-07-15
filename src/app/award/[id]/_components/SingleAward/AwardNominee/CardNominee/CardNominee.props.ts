import { ActionType, Activity } from '@/types/award/Activity';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type CardNomineeProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  user: Activity;
  awardId: number;
  userRewardAsync: (awardId: number, actionType: ActionType, userId: number) => Promise<void>
};
