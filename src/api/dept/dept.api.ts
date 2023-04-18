import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '../base/base.api';
import { Dept } from '@/domain/model/dept/dept';
import { DeptDetails } from '@/domain/model/dept/deptDetails';
import { CreateDeptRequest } from './request/createDeptRequest';
import { BaseResponse } from '@/domain/model/base/baseResponse';

export const deptApi = createApi({
  reducerPath: 'DeptApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Dept'],
  endpoints: (build) => ({
    /**
     * Получение поддерева отделов текущего пользователя
     */
    getAuthSubtree: build.query<
      BaseResponse<Dept[]>,
      { authId: number | undefined }
    >({
      query: (authId) => {
        return {
          method: 'POST',
          url: '/dept/auth_subtree',
          body: authId,
        };
      },
      providesTags: ['Dept'],
    }),

    /**
     * Создание нового отдела
     */
    getProfiles: build.mutation<DeptDetails, CreateDeptRequest>({
      query: () => {
        return {
          method: 'POST',
          url: '/dept/create',
          body: {},
        };
      },
      invalidatesTags: ['Dept'],
    }),
  }),
});
