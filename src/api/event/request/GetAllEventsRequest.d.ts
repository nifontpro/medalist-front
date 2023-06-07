import { BaseRequest } from '@/domain/model/base/BaseRequest';

export interface GetAllEventsRequest {
  authId: number;
  deptId: number;
  baseRequest?: BaseRequest;
}
