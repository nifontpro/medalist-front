import { AwardType } from '@/domain/model/award/Award';

export interface BaseAwardRequest {
  authId: number;

  name: string;
  type: AwardType;
  startDate: number;
  endDate: number;

  description?: string;
  criteria?: string;
}

export interface CreateAwardRequest extends BaseAwardRequest {
  deptId: number;
}
