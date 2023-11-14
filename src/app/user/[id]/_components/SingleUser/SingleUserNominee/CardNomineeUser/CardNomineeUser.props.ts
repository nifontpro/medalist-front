import { ActionType, Activity } from '@/types/award/Activity';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type CardNomineeUserProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  userId: string;
  award: Activity;
  userRewardAsync: (
    awardId: number,
    actionType: ActionType,
    userId: number
  ) => Promise<void>;
  disabled?: boolean;
};
