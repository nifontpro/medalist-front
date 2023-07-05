import { ActionType } from '@/types/award/Activity';

export interface SendActionRequest {
  authId: number;
  awardId: number;
  userId: number;
  actionType: ActionType;
}
