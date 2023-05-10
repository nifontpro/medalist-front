import { BaseOrder } from '@/domain/model/base/sort/BaseOrder';

export interface BaseRequest {
  page?: number;
  pageSize?: number;
  filter?: string;
  minDate?: number;
  maxDate?: number;
  orders?: BaseOrder[];
}
