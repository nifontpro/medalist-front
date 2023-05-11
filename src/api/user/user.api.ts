import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '../base/base.api';
import { BaseResponse } from '@/domain/model/base/BaseResponse';
import { User } from '@/domain/model/user/user';
import { UserDetails } from '@/domain/model/user/userDetails';
import { CreateOwnerRequest } from './request/CreateOwnerRequest';
import { CreateUserRequest } from './request/CreateUserRequest';
import { UpdateUserRequest } from './request/UpdateUserRequest';
import { BaseImage } from '@/domain/model/base/image/baseImage';
import { BaseRequest } from '@/domain/model/base/BaseRequest';

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

    /**
     * Создание владельца
     */
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
     * Создание пользователя
     */
    createUser: build.mutation<BaseResponse<UserDetails>, CreateUserRequest>({
      query: (request) => {
        return {
          method: 'POST',
          url: '/user/create',
          body: request,
        };
      },
      invalidatesTags: ['User'],
    }),

    /**
     * Обновление профиля сотрудника
     */
    update: build.mutation<BaseResponse<UserDetails>, UpdateUserRequest>({
      query: (request) => {
        return {
          method: 'POST',
          url: '/user/update',
          body: request,
        };
      },
      invalidatesTags: (result) => [
        { type: 'User', id: result?.data?.user.id },
      ],
    }),

    /**
     * Получение сотрудников отдела [deptId]
     * [baseRequest]:
     *    Параметры пагинации [page], [pageSize]
     *    Параметр [filter] - фильтрация по Фамилии сотрудника
     *    Допустимые поля для сортировки:
     *          "firstname",
     *    			"patronymic",
     *    			"lastname",
     *    			"authEmail",
     *    			"post",
     */
    getUsersByDept: build.query<
      BaseResponse<User[]>,
      { authId: number; deptId: number; baseRequest: BaseRequest | undefined }
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

    /**
     * Получение сотрудников всех подотделов вместе с текущим [deptId]
     * [baseRequest]:
     *    Параметры пагинации [page], [pageSize]
     *    Параметр [filter] - фильтрация по Фамилии сотрудника
     *    Допустимые поля для сортировки:
     *          "firstname",
     *    			"patronymic",
     *    			"lastname",
     *    			"authEmail",
     *    			"post",
     *    			"dept.name", - Первым рекомендую его установить
     *    			"dept.classname",
     */
    getUsersBySubDept: build.query<
      BaseResponse<User[]>,
      { authId: number; deptId: number; baseRequest: BaseRequest | undefined }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: '/user/get_by_subdepts',
          body: request,
        };
      },
      providesTags: ['User'],
    }),

    /**
     * Получение сотрудника по id
     */
    getById: build.query<
      BaseResponse<UserDetails>,
      { authId: number; userId: number }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: '/user/get_id',
          body: request,
        };
      },
      providesTags: ['User'],
    }),

    /**
     * Удаление сотрудника по id
     */
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
      // invalidatesTags: (result) => [{type: 'User', id: result?.data?.user.id}]
    }),

    /**
     * Добавление изображения
     * @param: formData: [file]:file, [userId]
     */
    imageAdd: build.mutation<BaseResponse<BaseImage>, FormData>({
      query: (body) => ({
        method: 'POST',
        url: '/user/img_add',
        body: body,
      }),
      invalidatesTags: ['User'],
    }),

    /**
     * Обновление изображения
     * @param: formData: [file]:file, [userId], [imageId]
     */
    imageUpdate: build.mutation<BaseResponse<BaseImage>, FormData>({
      query: (formData) => ({
        method: 'POST',
        url: '/user/img_update',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),

    /**
     * Удаление изображения
     * @param: userId, imageId
     */
    imageDelete: build.mutation<
      BaseResponse<BaseImage>,
      { userId: number; imageId: number }
    >({
      query: (body) => ({
        method: 'POST',
        url: '/user/img_delete',
        body: body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});
