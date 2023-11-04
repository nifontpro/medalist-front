import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { BaseRequest } from '@/types/base/BaseRequest';
import { Folder } from '@/types/gallery/folder';
import { GalleryItem } from '@/types/gallery/item';
import { BaseResponse } from '@/types/base/BaseResponse';
import { baseQuery, baseQueryWithReauth } from '../base/base.api';

export const folderUrl = (string: string = '') => `/gallery/folder${string}`;
export const itemUrl = (string: string = '') => `/gallery/item${string}`;

export const galleryApi = createApi({
  reducerPath: 'GalleryApi',
  baseQuery: baseQuery,
  tagTypes: ['Folder', 'Item'],
  endpoints: (build) => ({
    /**
     * Получить все дерево папок галереи
     * [baseRequest]:
     *    Допустимые поля для сортировки:
     *          "parentId",
     *          "name",
     *          "createdAt",
     */
    getAllFolder: build.query<
      BaseResponse<Folder[]>,
      { baseRequest: BaseRequest | undefined }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: folderUrl('/get_all'),
          body: request,
        };
      },
      providesTags: ['Folder'],
    }),

    /**
     * Получение объектов из папки галереи
     * baseRequest:
     *  Параметры пагинации page, pageSize - необязательны, по умолчанию 0 и 100 соответственно
     *  Допустимые поля для сортировки:
     *            "name",
     *            "createdAt",
     */
    getItemsByFolder: build.query<
      BaseResponse<GalleryItem[]>,
      { folderId: number; baseRequest: BaseRequest | undefined }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: itemUrl('/get_folder'),
          body: request,
        };
      },
      providesTags: ['Folder'],
    }),
  }),
});
