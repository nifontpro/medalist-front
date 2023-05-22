import { ActionType } from '@/domain/model/award/Activity';

export interface SendActionRequest {
  authId: number;
  awardId: number;
  userId: number;
  actionType: ActionType;
}
