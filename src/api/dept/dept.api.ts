import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '../base/base.api';
import { Dept } from '@/types/dept/dept';
import { DeptDetails } from '@/types/dept/deptDetails';
import { CreateDeptRequest } from './request/createDeptRequest';
import { BaseResponse } from '@/types/base/BaseResponse';
import { BaseImage } from '@/types/base/image/baseImage';
import { UpdateDeptRequest } from './request/updateDeptRequest';
import { BaseRequest } from '@/types/base/BaseRequest';

export const deptUrl = (string: string = '') => `/client/dept${string}`;

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
          url: deptUrl('/auth_subtree'),
          body: authId,
        };
      },
      providesTags: ['Dept'],
    }),

    /**
     * Получение поддерева отделов с верхнего доступного уровня просмотра,
     * т. е. с ближайшего верхнего отдела сотрудника, помеченного top-level.
     * [baseRequest]:
     * orders: массив полей для сортировки в заданном направлении
     * допустимые поля для сортировки: "parentId", "name", "classname"
     */
    getAuthTopLevelTree: build.query<
      BaseResponse<Dept[]>,
      { authId: number; baseRequest: BaseRequest | undefined }
    >({
      query: (authId) => {
        return {
          method: 'POST',
          url: deptUrl('/top_level_tree'),
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
          url: deptUrl('/create'),
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
          url: deptUrl('/update'),
          body: request,
        };
      },
      // invalidatesTags: (result) => [
      //   { type: 'Dept', id: result?.data?.dept.id },
      // ], //Для инвалидации только данного отдела (почему то работает только после рефреша)
      invalidatesTags: ['Dept'],
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
          url: deptUrl('/get_id'),
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
          url: deptUrl('/delete'),
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
        url: deptUrl('/img_add'),
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
        url: deptUrl('/img_update'),
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
        url: deptUrl('/img_delete'),
        body: body,
      }),
      invalidatesTags: ['Dept'],
    }),
  }),
});
