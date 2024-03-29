import { BaseOrder } from '@/types/base/sort/BaseOrder';

export interface BaseRequest {
  page?: number;
  pageSize?: number;
  filter?: string;
  minDate?: number;
  maxDate?: number;
  subdepts?: boolean;
  orders?: BaseOrder[];
}
