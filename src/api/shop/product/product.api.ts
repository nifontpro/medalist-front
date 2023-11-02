export const productUrl = (string: string = '') => `/shop/product${string}`;

import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { BaseResponse } from '@/types/base/BaseResponse';
import { baseQueryWithReauth } from '@/api/base/base.api';
import { ProductDetails } from '@/types/shop/product/ProductDetails';
import { CreateProductRequest } from './request/CreateProductRequest';
import { UpdateProductRequest } from './request/UpdateProductRequest';
import { Product } from '@/types/shop/product/Product';
import { BaseImage } from '@/types/base/image/baseImage';

export const productApi = createApi({
  reducerPath: 'ProductApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Product'],
  endpoints: (build) => ({
    /**
     * Создание приза
     */
    create: build.mutation<BaseResponse<ProductDetails>, CreateProductRequest>({
      query: (request) => {
        return {
          method: 'POST',
          url: productUrl('/create'),
          body: request,
        };
      },
      invalidatesTags: ['Product'],
    }),

    /**
     * Обновление приза
     */
    update: build.mutation<BaseResponse<ProductDetails>, UpdateProductRequest>({
      query: (request) => {
        return {
          method: 'POST',
          url: productUrl('/update'),
          body: request,
        };
      },
      invalidatesTags: ['Product'],
    }),

    /**
     * Удаление приза
     */
    delete: build.mutation<
      BaseResponse<ProductDetails>,
      { authId: number; productId: number }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: productUrl('/delete'),
          body: request,
        };
      },
      invalidatesTags: ['Product'],
    }),

    getById: build.query<
      BaseResponse<ProductDetails>,
      {
        authId: number;
        productId: number;
      }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: productUrl('/get_id'),
          body: request,
        };
      },
      providesTags: ['Product'],
    }),

    /**
     * Получение списка призов.
     * [deptId] - необходимо заполнить для Владельца, для определения конкретной компании.
     * Может быть указан любой отдел компании, бэк сам определит id компании.
     * Для всех остальных пользователей поле игнорируется (определяется автоматически).
     */
    getByDept: build.query<
      BaseResponse<Product[]>,
      {
        authId: number;
        deptId: number;
      }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: productUrl('/get_company'),
          body: request,
        };
      },
      providesTags: ['Product'],
    }),

    /**
     * Добавление изображения
     * @param: formData: [file]:file, [authId], [productId]
     */
    imageAdd: build.mutation<BaseResponse<BaseImage>, FormData>({
      query: (body) => ({
        method: 'POST',
        url: productUrl('/img_add'),
        body: body,
      }),
      invalidatesTags: ['Product'],
    }),

    /**
     * Удаление изображения
     * @param: authId, userId, imageId
     */
    imageDelete: build.mutation<
      BaseResponse<BaseImage>,
      { authId: number; productId: number; imageId: number }
    >({
      query: (body) => ({
        method: 'POST',
        url: productUrl('/img_delete'),
        body: body,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});
