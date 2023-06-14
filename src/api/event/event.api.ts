import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '../base/base.api';
import { BaseResponse } from '@/domain/model/base/BaseResponse';
import { BaseEvent, ShortEvent } from '@/domain/model/event/BaseEvent';
import { AddUserEventRequest } from '@/api/event/request/AddUserEventRequest';
import { GetAllEventsRequest } from '@/api/event/request/GetAllEventsRequest';
import { AddDeptEventRequest } from './request/AddDeptEventRequest';

export const eventUrl = (string: string = '') => `/client/event${string}`;

export const eventApi = createApi({
  reducerPath: 'EventApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Event'],
  endpoints: (build) => ({
    /**
     * Добавить событие сотрудника
     */
    addUserEvent: build.mutation<BaseResponse<BaseEvent>, AddUserEventRequest>({
      query: (request) => {
        return {
          method: 'POST',
          url: eventUrl('/add_user'),
          body: request,
        };
      },
      invalidatesTags: ['Event'],
    }),

    /**
     * Получить события сотрудника
     */
    getByUser: build.query<
      BaseResponse<ShortEvent[]>,
      { authId: number; userId: number }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: eventUrl('/get_user'),
          body: request,
        };
      },
      providesTags: ['Event'],
    }),

    /**
     * Удалить событие сотрудника
     */
    deleteByUser: build.mutation<
      BaseResponse<BaseEvent>,
      { authId: number; eventId: number }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: eventUrl('/delete_user'),
          body: request,
        };
      },
      invalidatesTags: ['Event'],
    }),

    /**
     * Добавить событие отдела
     */
    addDeptEvent: build.mutation<BaseResponse<BaseEvent>, AddDeptEventRequest>({
      query: (request) => {
        return {
          method: 'POST',
          url: eventUrl('/add_dept'),
          body: request,
        };
      },
      invalidatesTags: ['Event'],
    }),

    /**
     * Получить события отдела
     */
    getByDept: build.query<
      BaseResponse<ShortEvent[]>,
      { authId: number; deptId: number }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: eventUrl('/get_dept'),
          body: request,
        };
      },
      providesTags: ['Event'],
    }),

    /**
     * Удалить событие отдела
     */
    deleteByDept: build.mutation<
      BaseResponse<BaseEvent>,
      { authId: number; eventId: number }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: eventUrl('/delete_dept'),
          body: request,
        };
      },
      invalidatesTags: ['Event'],
    }),

    /**
     * Получить все события сотрудников и отделов с текущего дня года по кругу.
     * Пагинация.
     * Сортировка внутренняя (По дню от текущего и названию сущности).
     */
    getAll: build.query<BaseResponse<BaseEvent[]>, GetAllEventsRequest>({
      query: (request) => {
        return {
          method: 'POST',
          url: eventUrl('/get_all'),
          body: request,
        };
      },
      providesTags: ['Event'],
    }),
  }),
});
