import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '../base/base.api';
import { Dept } from '@/domain/model/dept/dept';
import { DeptDetails } from '@/domain/model/dept/deptDetails';
import { CreateDeptRequest } from './request/createDeptRequest';
import { BaseResponse } from '@/domain/model/base/BaseResponse';
import { BaseImage } from '@/domain/model/base/image/baseImage';
import { UpdateDeptRequest } from './request/updateDeptRequest';
import { BaseRequest } from '@/domain/model/base/BaseRequest';

export const deptApi = createApi({
  reducerPath: 'DeptApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Dept'],
  endpoints: (build) => ({
    /**
     * Получение поддерева отделов текущего пользователя
     * [baseRequest]:
     * orders: массив полей для сортировки в заданном направлении
     * допустимые поля для сортировки: "parentId", "name", "classname"
     */
    getAuthSubtree: build.query<
      BaseResponse<Dept[]>,
      { authId: number; baseRequest: BaseRequest | undefined }
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
    getProfiles: build.mutation<BaseResponse<DeptDetails>, CreateDeptRequest>({
      query: (request: CreateDeptRequest) => {
        return {
          method: 'POST',
          url: '/dept/create',
          body: request,
        };
      },
      // invalidatesTags: ['Dept'],
      invalidatesTags: ['Dept'],
    }),

    /**
     * Обновление профиля отдела
     */
    update: build.mutation<BaseResponse<DeptDetails>, UpdateDeptRequest>({
      query: (request) => {
        return {
          method: 'POST',
          url: '/dept/update',
          body: request,
        };
      },
      invalidatesTags: (result) => [
        { type: 'Dept', id: result?.data?.dept.id },
      ],
    }),

    /**
     * Получение отдела по id
     */
    getById: build.query<
      BaseResponse<DeptDetails>,
      { authId: number; deptId: number }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: '/dept/get_id',
          body: request,
        };
      },
      providesTags: ['Dept'],
    }),

    /**
     * Удаление отдела по id
     */
    delete: build.mutation<
      BaseResponse<DeptDetails>,
      { authId: number; deptId: number }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: '/dept/delete',
          body: request,
        };
      },
      invalidatesTags: ['Dept'],
    }),

    /**
     * Добавление изображения
     * @param: formData: [file]:file, [authId], [deptId]
     */
    imageAdd: build.mutation<BaseResponse<BaseImage>, FormData>({
      query: (formData) => ({
        method: 'POST',
        url: '/dept/img_add',
        body: formData,
      }),
      invalidatesTags: ['Dept'],
    }),

    /**
     * Обновление изображения
     * @param: formData: [file]:file, [authId], [deptId], [imageId]
     */
    imageUpdate: build.mutation<BaseResponse<BaseImage>, FormData>({
      query: (formData) => ({
        method: 'POST',
        url: '/dept/img_update',
        body: formData,
      }),
      invalidatesTags: ['Dept'],
    }),

    /**
     * Удаление изображения
     * @param: authId, deptId, imageId
     */
    imageDelete: build.mutation<
      BaseResponse<BaseImage>,
      { authId: number; deptId: number; imageId: number }
    >({
      query: (body) => ({
        method: 'POST',
        url: '/dept/img_delete',
        body: body,
      }),
      invalidatesTags: ['Dept'],
    }),
  }),
});
