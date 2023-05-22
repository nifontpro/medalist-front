import { BaseAwardRequest } from '@/api/award/request/CreateAwardRequest';

export interface UpdateAwardRequest extends BaseAwardRequest {
  awardId: number;
}
