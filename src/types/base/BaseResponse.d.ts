export interface BaseResponse<T> {
  data?: T;
  success: boolean;
  errors: ResponseError[];
  pageInfo?: PageInfo;
}

export interface ResponseError {
  code: string;
  group: string;
  field: string;
  message: string;
  level: Levels;
}

export type Levels = 'ERROR' | 'WARNING' | 'INFO' | 'UNAUTHORIZED';

export interface PageInfo {
  pageSize: number;
  pageNumber: number;
  numberOfElements: number; // Количество элементов на текущей странице
  totalPages: number;
  totalElements: number;
}
