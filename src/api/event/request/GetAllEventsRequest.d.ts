import { BaseRequest } from '@/types/base/BaseRequest';

export interface GetAllEventsRequest {
  authId: number;
  deptId: number;
  baseRequest?: BaseRequest;
}
