import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '../base/base.api';
import { BaseResponse } from '@/domain/model/base/BaseResponse';
import { BaseImage } from '@/domain/model/base/image/baseImage';
import { CreateAwardRequest } from './request/CreateAwardRequest';
import { UpdateAwardRequest } from './request/UpdateAwardRequest';
import { AwardDetails } from '@/domain/model/award/AwardDetails';
import { Activity } from '@/domain/model/award/Activity';
import { SendActionRequest } from './request/SendActionRequest';
import { Award, AwardState } from '@/domain/model/award/Award';
import { BaseRequest } from '@/domain/model/base/BaseRequest';

export const awardUrl = (string: string = '') => `/client/award${string}`;

export const awardApi = createApi({
  reducerPath: 'AwardApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Award', 'Action'],
  endpoints: (build) => ({
    /**
     * Создание новой награды
     */
    create: build.mutation<BaseResponse<AwardDetails>, CreateAwardRequest>({
      query: (request) => {
        return {
          method: 'POST',
          url: awardUrl('/create'),
          body: request,
        };
      },
      invalidatesTags: ['Award'],
    }),

    /**
     * Удаление награды
     */
    delete: build.mutation<
      BaseResponse<AwardDetails>,
      { authId: number; awardId: number }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: awardUrl('/delete'),
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
          url: awardUrl('/update'),
          body: request,
        };
      },
      invalidatesTags: ['Award'],
    }),

    /**
     * Получение награды по id
     */
    getById: build.query<
      BaseResponse<AwardDetails>,
      { authId: number; awardId: number }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: awardUrl('/get_id'),
          body: request,
        };
      },
      providesTags: ['Award'],
    }),

    /**
     * Получение наград из отдела [deptId]
     * [state] - фильтрация по состоянию (необязательна)
     * [baseRequest]:
     *  Допустимые поля для сортировки [orders]: "name", "type", "startDate", "endDate"
     *  Пагинация.
     *  filter - фильтрация по названию (name)
     */
    getByDept: build.query<
      BaseResponse<Award[]>,
      {
        authId: number;
        deptId: number;
        state: AwardState | undefined;
        baseRequest: BaseRequest | undefined;
      }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: awardUrl('/get_dept'),
          body: request,
        };
      },
      providesTags: ['Award'],
    }),

    /**
     * Добавление изображения
     * @param: formData: [file]:file, [authId], [awardId]
     */
    imageAdd: build.mutation<BaseResponse<BaseImage>, FormData>({
      query: (formData) => ({
        method: 'POST',
        url: awardUrl('/img_add'),
        body: formData,
      }),
      invalidatesTags: ['Award'],
    }),

    /**
     * Добавление изображения из системной галереи
     * @param: [authId], [awardId],
     * [itemId] - id объекта системной галереи
     */
    galleryImageAdd: build.mutation<
      BaseResponse<BaseImage>,
      { authId: number; awardId: number; itemId: number }
    >({
      query: (request) => ({
        method: 'POST',
        url: awardUrl('/img_gal'),
        body: request,
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
        url: awardUrl('/img_delete'),
        body: body,
      }),
      invalidatesTags: ['Award'],
    }),

    /**
     * Отправить действие [actionType] с определенно наградой [awardId]
     * для сотрудника [userId]
     */
    sendAction: build.mutation<BaseResponse<Activity>, SendActionRequest>({
      query: (body) => ({
        method: 'POST',
        url: awardUrl('/action'),
        body: body,
      }),
      invalidatesTags: ['Action'],
    }),

    /**
     * Получить активные награждения сотрудника [userId]
     * [baseRequest]:
     * Допустимые поля для сортировки:
     *      "date",
     * 			"actionType",
     * 			"award.name",
     * 			"award.type"
     */
    getActivAwardByUser: build.query<
      BaseResponse<Activity[]>,
      {
        authId: number;
        userId: number;
        baseRequest: BaseRequest | undefined;
      }
    >({
      query: (body) => ({
        method: 'POST',
        url: awardUrl('/act_user'),
        body: body,
      }),
      providesTags: ['Action'],
    }),

    /**
     * Получить активные награждения в отделе [deptId]
     * [baseRequest]:
     * Параметры пагинации [page], [pageSize] - необязательны, по умолчанию 0 и 100 соответственно
     * Допустимые поля для сортировки:
     *      "date",
     * 			"actionType",
     * 			"user.firstname",
     * 			"user.lastname",
     * 			"user.patronymic",
     * 			"user.post",
     * 			"award.name",
     * 			"award.type"
     * minDate, maxDate - ограничения по дате событий, необязательны
     */
    getActivAwardByDept: build.query<
      BaseResponse<Activity[]>,
      {
        authId: number;
        deptId: number;
        baseRequest: BaseRequest | undefined;
      }
    >({
      query: (body) => ({
        method: 'POST',
        url: awardUrl('/act_dept'),
        body: body,
      }),
      providesTags: ['Action'],
    }),

    /**
     * Получить сотрудников, награжденных наградой [awardId]
     * [baseRequest]:
     * Допустимые поля для сортировки:
     *      "date",
     * 			"actionType",
     * 			"user.firstname",
     * 			"user.lastname",
     * 			"user.patronymic",
     * 			"user.post",
     */
    getUsersByActivAward: build.query<
      BaseResponse<Activity[]>,
      {
        authId: number;
        awardId: number;
        baseRequest: BaseRequest | undefined;
      }
    >({
      query: (body) => ({
        method: 'POST',
        url: awardUrl('/act_award'),
        body: body,
      }),
      providesTags: ['Action'],
    }),

    /**
     * Получение наград доступных для награждения сотрудников текущим админом
     * отделы наград берутся из поддерева отделов авторизованного пользователя
     * Для наград типа AwardType.PERIOD - выводятся только попадающие в период номинации (state=NOMINEE)
     * [baseRequest]:
     * filter - фильтрация по имени награды (необязателен)
     *  Параметры пагинации [page], [pageSize] - необязательны, по умолчанию 0 и 100 соответственно
     *  minDate <= award.startDate (отсутствует - без min ограничения)
     *  maxDate >= award.endDate (отсутствует - без max ограничения)
     *  Допустимые поля для сортировки:
     *  			"name",
     *  			"type",
     *  			"startDate",
     *  			"endDate",
     *  			"dept.name",
     *  			"dept.classname"
     */
    getAvailableBySubDepts: build.query<
      BaseResponse<Award[]>,
      {
        authId: number;
        deptId: number;
        baseRequest: BaseRequest | undefined;
      }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: awardUrl('/get_dept'),
          body: request,
        };
      },
      providesTags: ['Award'],
    }),
  }),
});
