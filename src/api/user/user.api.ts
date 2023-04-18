import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '../base/base.api';
import { BaseResponse } from '@/domain/model/base/baseResponse';
import { User } from '@/domain/model/user/user';
import { UserDetails } from '@/domain/model/user/userDetails';
import { CreateOwnerRequest } from './request/CreateOwnerRequest';

export const userApi = createApi({
  reducerPath: 'UserApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (build) => ({
    getTestData: build.query<{ res: string }, void>({
      query: () => {
        return {
          method: 'POST',
          url: '/user/data',
          body: { res: 'Test Body from Front' },
        };
      },
      providesTags: ['User'],
    }),

    /**
     * Возвращает профили вошедшего в систему пользователя
     */
    getProfiles: build.query<BaseResponse<User[]>, void>({
      query: () => {
        return {
          method: 'POST',
          url: '/user/profiles',
          body: {},
        };
      },
      providesTags: ['User'],
    }),

    createOwner: build.mutation<BaseResponse<UserDetails>, CreateOwnerRequest>({
      query: (request) => {
        return {
          method: 'POST',
          url: '/user/create_owner',
          body: request,
        };
      },
      invalidatesTags: ['User'],
    }),

    /**
     * Получение сотрудников отдела
     */
    getUsersByDept: build.query<
      BaseResponse<User[]>,
      { authId: number; deptId: number }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: '/user/get_by_dept',
          body: request,
        };
      },
      providesTags: ['User'],
    }),

    delete: build.mutation<
      BaseResponse<UserDetails>,
      { authId: number; userId: number }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: '/user/delete',
          body: request,
        };
      },
      invalidatesTags: ['User'],
    }),
  }),
});
