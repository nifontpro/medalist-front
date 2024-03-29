import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '../base/base.api';
import { BaseResponse } from '@/types/base/BaseResponse';
import { BaseImage } from '@/types/base/image/baseImage';
import { CreateAwardRequest } from './request/CreateAwardRequest';
import { UpdateAwardRequest } from './request/UpdateAwardRequest';
import { AwardDetails } from '@/types/award/AwardDetails';
import { ActionType, Activity } from '@/types/award/Activity';
import { SendActionRequest } from './request/SendActionRequest';
import { Award, AwardState, AwardType } from '@/types/award/Award';
import { BaseRequest } from '@/types/base/BaseRequest';
import { AwardCount } from '@/types/award/AwardCount';
import { AwardStateCount } from '@/types/award/AwardStateCount';
import { WWAwardCount } from '@/types/award/WWAwardCount';
import { checkSameIdInArrays } from '@/utils/checkSameIdInArrays';
import { userApi } from '../user/user.api';
import { messageApi } from '../msg/message.api';

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
     * Получение наград из отдела [deptId] или всех его подотделов
     * [state] - фильтрация по состоянию (необязательна)
     * withUsers: Boolean - Включать ли информацию о награжденных (по умолчанию false),
     *                      использовать при крайней необходимости.
     * [baseRequest]:
     *  subdepts - включать подотделы (true / false)
     *  filter - фильтрация по имени награды (необязателен)
     *  Параметры пагинации [page], [pageSize] - необязательны, по умолчанию 0 и 100 соответственно
     *  minDate <= award.startDate (отсутствует - без min ограничения)
     *  maxDate >= award.endDate (отсутствует - без max ограничения)
     *  Допустимые поля для сортировки:
     *        "name",
     *        "type",
     *        "startDate",
     *        "endDate",
     *        "dept.name", - при subdepts = true - делать первым в списке для сортировки по отделам
     *        "dept.classname"
     */
    getByDept: build.query<
      BaseResponse<Award[]>,
      {
        authId: number;
        deptId: number;
        state: AwardState | undefined;
        withUsers: boolean;
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
      serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
        const state = queryArgs.state;
        const orders = queryArgs.baseRequest?.orders;
        const switcher = queryArgs.baseRequest?.subdepts;
        const users = queryArgs.withUsers;
        // This can return a string, an object, a number, or a boolean.
        // If it returns an object, number or boolean, that value
        // will be serialized automatically via `defaultSerializeQueryArgs`
        return { state, orders, switcher, users }; // omit `client` from the cache key
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, otherArgs) => {
        if (!checkSameIdInArrays<Award>(currentCache?.data, newItems?.data)) {
          currentCache?.data?.push(...newItems?.data!);
        } else {
          currentCache.data = newItems.data;
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
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
      invalidatesTags: ['Action', 'Award'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.util.invalidateTags(['Action']));
          await dispatch(messageApi.util.invalidateTags(['Message']));
        } catch (error) {
          console.error(`Error award user!`, error);
        }
      },
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
        awardType: AwardType | undefined;
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
        awardState: AwardState | undefined;
        baseRequest: BaseRequest | undefined;
      }
    >({
      query: (body) => ({
        method: 'POST',
        url: awardUrl('/act_dept'),
        body: body,
      }),
      serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
        const searchValue = queryArgs.baseRequest?.filter;
        const awardState = queryArgs.awardState;
        const orders = queryArgs.baseRequest?.orders;
        const switcher = queryArgs.baseRequest?.subdepts;
        // This can return a string, an object, a number, or a boolean.
        // If it returns an object, number or boolean, that value
        // will be serialized automatically via `defaultSerializeQueryArgs`
        return { awardState, orders, searchValue, switcher }; // omit `client` from the cache key
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, otherArgs) => {
        if (
          !checkSameIdInArrays<Activity>(currentCache?.data, newItems?.data)
        ) {
          currentCache?.data?.push(...newItems?.data!);
        } else {
          currentCache.data = newItems.data;
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
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
        actionType: ActionType | undefined;
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
          url: awardUrl('/get_subdepts'),
          body: request,
        };
      },
      providesTags: ['Award'],
    }),

    /**
     * Получение наград доступных для награждения сотрудника текущим админом
     * отделы наград берутся из поддерева отделов авторизованного пользователя
     * награды типа SIMPLE.
     * [baseRequest]:
     *  filter - фильтрация по имени награды (необязателен)
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
    getAvailableAwardsForRewardBySubDepts: build.query<
      BaseResponse<Award[]>,
      {
        authId: number;
        userId: number;
        baseRequest: BaseRequest | undefined;
      }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: awardUrl('/get_simple'),
          body: request,
        };
      },
      providesTags: ['Award'],
    }),

    /**
     * Получение количества наград в компании
     * [baseRequest]:
     *  subdepts - true: включаются все подотделы
     *             false: только указанный отдел
     */
    getAwardCount: build.query<
      BaseResponse<AwardStateCount>,
      {
        authId: number;
        deptId: number;
        baseRequest: BaseRequest | undefined;
      }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: awardUrl('/count_dep'),
          body: request,
        };
      },
      providesTags: ['Award'],
    }),

    /**
     * Получение количества активных награждений (наград у пользователей) разных типов в компании
     * [baseRequest]:
     *  Параметры пагинации [page], [pageSize] - необязательны, по умолчанию 0 и 100 соответственно
     *  subdepts - true: включаются все подотделы
     *             false: включаются только ближайшие подотделы (у которых parentId=deptId)
     *  minDate, maxDate - необязательны ограничения по дате события (только для подсчета количества наград)
     *  Допустимые поля для сортировки:
     *      !!! В круглых скобках, т.к. используется нативный запрос к БД
     *      (deptName),
     *      (awardCount),
     *      (nomineeCount)
     */
    getActivCount: build.query<
      BaseResponse<AwardCount[]>,
      {
        authId: number;
        deptId: number;
        baseRequest: BaseRequest | undefined;
      }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: awardUrl('/count_activ'),
          body: request,
        };
      },
      providesTags: ['Action'],
    }),

    /**
     * С КОРНЕВОГО ОТДЕЛА ! ! !
     * [baseRequest]:
     *  Параметры пагинации [page], [pageSize] - необязательны, по умолчанию 0 и 100 соответственно
     *  subdepts - true: включаются все подотделы
     *             false: включаются только ближайшие подотделы (у которых parentId=deptId)
     *  minDate, maxDate - необязательны ограничения по дате события (только для подсчета количества наград)
     *  Допустимые поля для сортировки:
     *      !!! В круглых скобках, т.к. используется нативный запрос к БД
     *      (deptName),
     *      (awardCount),
     *      (nomineeCount)
     */
    getActivCountRoot: build.query<
      BaseResponse<AwardCount[]>,
      {
        authId: number;
        deptId: number;
        baseRequest: BaseRequest | undefined;
      }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: awardUrl('/count_activ_root'),
          body: request,
        };
      },
      providesTags: ['Action'],
    }),

    /**
     * Получение количества сотрудников с наградами и без них в отделе(ах)
     * deptId - корневой отдел
     * baseRequest:
     *  subdepts - true: включаются все подотделы
     *             false: включаются только указанный отдел
     *  minDate, maxDate - (необязательны) ограничения по дате события для подсчета количества наград
     */
    getUserAwardWWCountOnDept: build.query<
      BaseResponse<WWAwardCount>,
      {
        authId: number;
        deptId: number;
        baseRequest: BaseRequest | undefined;
      }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: awardUrl('/count_user_ww'),
          body: request,
        };
      },
      providesTags: ['Action'],
    }),
  }),
});
