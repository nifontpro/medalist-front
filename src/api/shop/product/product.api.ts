export const productUrl = (string: string = '') => `/shop/product${string}`;

import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { BaseResponse } from '@/types/base/BaseResponse';

import { ProductDetails } from '@/types/shop/product/ProductDetails';
import { CreateProductRequest } from './request/CreateProductRequest';
import { UpdateProductRequest } from './request/UpdateProductRequest';
import { Product } from '@/types/shop/product/Product';
import { BaseImage } from '@/types/base/image/baseImage';
import { BaseRequest } from '@/types/base/BaseRequest';
import { baseQuery, baseQueryWithReauth } from '@/api/base/base.api';

export const productApi = createApi({
  reducerPath: 'ProductApi',
  // baseQuery: baseQuery,
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
     *
     * [maxPrice] - Фильтр по цене
     * [available] - Фильтр по доступности (true- только в наличии, по умолчанию - false)
     * [baseRequest]:
     *  [filter] - фильтрация по имени приза (необязателен)
     *  Параметры пагинации [page], [pageSize] - необязательны, по умолчанию 0 и 100 соответственно
     *  Допустимые поля для сортировки:
     *        "name",
     *        "price",
     *        "count",
     *        "description",
     */
    getByCompany: build.query<
      BaseResponse<Product[]>,
      {
        authId: number;
        deptId: number;
        maxPrice?: number;
        available: boolean;
        baseRequest?: BaseRequest;
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

    /**
     * Добавление вторичного изображения
     * @param: formData: [file]:file, [authId], [productId]
     */
    secondImageAdd: build.mutation<BaseResponse<BaseImage>, FormData>({
      query: (body) => ({
        method: 'POST',
        url: productUrl('/img_sec_add'),
        body: body,
      }),
      invalidatesTags: ['Product'],
    }),

    /**
     * Удаление вторичного изображения
     * @param: authId, userId, imageId
     */
    secondImageDelete: build.mutation<
      BaseResponse<BaseImage>,
      { authId: number; productId: number; imageId: number }
    >({
      query: (body) => ({
        method: 'POST',
        url: productUrl('/img_sec_del'),
        body: body,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});
