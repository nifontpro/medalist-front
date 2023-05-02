import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '../base/base.api';
import { BaseResponse } from '@/domain/model/base/baseResponse';
import { BaseImage } from '@/domain/model/base/image/baseImage';
import { CreateAwardRequest } from './request/CreateAwardRequest';
import { UpdateAwardRequest } from './request/UpdateAwardRequest';
import { AwardDetails } from '@/domain/model/award/AwardDetails';

export const awardApi = createApi({
  reducerPath: 'AwardApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Award'],
  endpoints: (build) => ({
    /**
     * Создание новой награды
     */
    create: build.mutation<BaseResponse<AwardDetails>, CreateAwardRequest>({
      query: (request) => {
        return {
          method: 'POST',
          url: '/award/create',
          body: request,
        };
      },
      invalidatesTags: ['Award'],
    }),

    /**
     * Обновление награды
     */
    update: build.mutation<BaseResponse<AwardDetails>, UpdateAwardRequest>({
      query: (request) => {
        return {
          method: 'POST',
          url: '/award/update',
          body: request,
        };
      },
      invalidatesTags: ['Award'],
    }),

    /**
     * Добавление изображения
     * @param: formData: [file]:file, [authId], [awardId]
     */
    imageAdd: build.mutation<BaseResponse<BaseImage>, FormData>({
      query: (formData) => ({
        method: 'POST',
        url: '/award/img_add',
        body: formData,
      }),
      invalidatesTags: ['Award'],
    }),

    /**
     * Удаление изображения
     * @param: authId, awardId, imageId
     */
    imageDelete: build.mutation<
      BaseResponse<BaseImage>,
      { authId: number; awardId: number; imageId: number }
    >({
      query: (body) => ({
        method: 'POST',
        url: '/award/img_delete',
        body: body,
      }),
      invalidatesTags: ['Award'],
    }),
  }),
});
