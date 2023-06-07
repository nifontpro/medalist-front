import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '../base/base.api';
import { BaseResponse } from '@/domain/model/base/BaseResponse';
import { BaseEvent } from '@/domain/model/event/BaseEvent';
import { AddUserEventRequest } from '@/api/event/request/AddUserEventRequest';
import { GetAllEventsRequest } from '@/api/event/request/GetAllEventsRequest';

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
     * Добавить событие отдела
     */
    addDeptEvent: build.mutation<BaseResponse<BaseEvent>, AddUserEventRequest>({
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
     * Получить все события сотрудников и отделов
     * с текущего дня года по кругу.
     * Пагинация.
     * Сортировка внутренняя (По дню от текущего и названию сущности).
     */
    createOwner: build.query<BaseResponse<BaseEvent[]>, GetAllEventsRequest>({
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
