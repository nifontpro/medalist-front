import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '@/api/base/base.api';
import { BaseRequest } from '@/domain/model/base/BaseRequest';
import { Folder } from '@/domain/model/gallery/folder';
import { GalleryItem } from '@/domain/model/gallery/item';
import { BaseResponse } from '@/domain/model/base/BaseResponse';

export const folderUrl = (string: string = '') => `/gallery/folder${string}`;
export const itemUrl = (string: string = '') => `/gallery/item${string}`;

export const galleryApi = createApi({
  reducerPath: 'GalleryApi',
  baseQuery: baseQueryWithReauth,
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
    getAllFolder: build.query<BaseResponse<Folder[]>, { baseRequest: BaseRequest | undefined }>({
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
