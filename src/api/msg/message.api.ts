import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '../base/base.api';
import { BaseResponse } from '@/types/base/BaseResponse';
import { UserMsg } from '@/types/msg/UserMsg';

export const msgUrl = (string: string = '') => `/client/msg${string}`;

export const messageApi = createApi({
  reducerPath: 'MessageApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Message'],
  endpoints: (build) => ({
    /**
     * Отправить сообщение.
     */
    sendMessage: build.mutation<
      BaseResponse<UserMsg>,
      {
        authId: number;
        userId: number; // Кому адресовано
        msg: string;
      }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: msgUrl('/send'),
          body: request,
        };
      },
      invalidatesTags: ['Message'],
    }),

    /**
     * Удалить сообщение.
     * Удалять может только тот кто отправил, и кому оно отправлено.
     */
    deleteMessage: build.mutation<
      BaseResponse<UserMsg>,
      {
        authId: number;
        messageId: number;
      }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: msgUrl('/delete'),
          body: request,
        };
      },
      invalidatesTags: ['Message'],
    }),

    /**
     * Получить свои сообщения
     */
    getMessages: build.query<BaseResponse<UserMsg[]>, { authId: number }>({
      query: (request) => {
        return {
          method: 'POST',
          url: msgUrl('/get_auth'),
          body: request,
        };
      },
      providesTags: ['Message'],
    }),

    /**
     * Изменить статус прочтения сообщения
     */
    setReadStatus: build.mutation<
      BaseResponse<UserMsg>,
      {
        authId: number;
        messageId: number;
        read: boolean; // По умолчанию = true
      }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: msgUrl('/set_read'),
          body: request,
        };
      },
      invalidatesTags: ['Message'],
    }),
  }),
});
