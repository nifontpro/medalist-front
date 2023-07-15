import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '../base/base.api';
import { BaseResponse } from '@/types/base/BaseResponse';
import { User } from '@/types/user/user';
import { UserDetails } from '@/types/user/userDetails';
import { CreateOwnerRequest } from './request/CreateOwnerRequest';
import { CreateUserRequest } from './request/CreateUserRequest';
import { UpdateUserRequest } from './request/UpdateUserRequest';
import { BaseImage } from '@/types/base/image/baseImage';
import { BaseRequest } from '@/types/base/BaseRequest';
import { GenderCount } from '@/types/user/genderCount';
import { UserSettings, UserSettingsRequest } from '@/types/user/userSettings';
import { checkSameIdInArrays } from '@/utils/checkSameIdInArrays';

export const userUrl = (string: string = '') => `/client/user${string}`;

export const userApi = createApi({
  reducerPath: 'UserApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Settings'],
  endpoints: (build) => ({
    getTestData: build.query<{ res: string }, void>({
      query: () => {
        return {
          method: 'POST',
          url: userUrl('/data'),
          body: { res: 'Test Body from Front' },
        };
      },
      providesTags: ['User'],
    }),

    /**
     * Возвращает профили вошедшего в систему пользователя
     */
    getProfiles: build.query<BaseResponse<User[]>, void>({
      query: () => {
        return {
          method: 'POST',
          url: userUrl('/profiles'),
          body: {},
        };
      },
      providesTags: ['User'],
    }),

    /**
     * Создание владельца
     */
    createOwner: build.mutation<BaseResponse<UserDetails>, CreateOwnerRequest>({
      query: (request) => {
        return {
          method: 'POST',
          url: userUrl('/create_owner'),
          body: request,
        };
      },
      invalidatesTags: ['User'],
    }),

    /**
     * Создание пользователя
     */
    createUser: build.mutation<BaseResponse<UserDetails>, CreateUserRequest>({
      query: (request) => {
        return {
          method: 'POST',
          url: userUrl('/create'),
          body: request,
        };
      },
      invalidatesTags: ['User'],
    }),

    /**
     * Обновление профиля сотрудника
     */
    update: build.mutation<BaseResponse<UserDetails>, UpdateUserRequest>({
      query: (request) => {
        return {
          method: 'POST',
          url: userUrl('/update'),
          body: request,
        };
      },
      invalidatesTags: (result) => [
        { type: 'User', id: result?.data?.user.id },
      ],
    }),

    /**
     * Получение сотрудников отдела [deptId]
     * [baseRequest]:
     *    Параметры пагинации [page], [pageSize]
     *    Параметр [filter] - фильтрация по Фамилии сотрудника
     *    Допустимые поля для сортировки:
     *          "firstname",
     *    			"patronymic",
     *    			"lastname",
     *    			"authEmail",
     *    			"post",
     */
    getUsersByDept: build.query<
      BaseResponse<User[]>,
      { authId: number; deptId: number; baseRequest: BaseRequest | undefined }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: userUrl(`/get_by_dept`),
          body: request,
        };
      },
      serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
        const searchValue = queryArgs.baseRequest?.filter;
        const orders = queryArgs.baseRequest?.orders;
        // This can return a string, an object, a number, or a boolean.
        // If it returns an object, number or boolean, that value
        // will be serialized automatically via `defaultSerializeQueryArgs`
        return { searchValue, orders }; // omit `client` from the cache key
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, otherArgs) => {
        if (!checkSameIdInArrays<User>(currentCache?.data, newItems?.data)) {
          currentCache?.data?.push(...newItems?.data!);
        } else {
          currentCache.data = newItems.data;
        }
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ['User'],
    }),

    /**
     * Получение сотрудников всех подотделов вместе с текущим [deptId]
     * [baseRequest]:
     *    Параметры пагинации [page], [pageSize]
     *    Параметр [filter] - фильтрация по Фамилии сотрудника
     *    Допустимые поля для сортировки:
     *          "firstname",
     *    			"patronymic",
     *    			"lastname",
     *    			"authEmail",
     *    			"post",
     *    			"dept.name", - Первым рекомендую его установить
     *    			"dept.classname",
     */
    getUsersBySubDept: build.query<
      BaseResponse<User[]>,
      { authId: number; deptId: number; baseRequest: BaseRequest | undefined }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: userUrl('/get_by_subdepts'),
          body: request,
        };
      },
      providesTags: ['User'],
    }),

    /**
     * Получение сотрудника по id
     */
    getById: build.query<
      BaseResponse<UserDetails>,
      { authId: number; userId: number }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: userUrl('/get_id'),
          body: request,
        };
      },
      providesTags: ['User'],
    }),

    /**
     * Удаление сотрудника по id
     */
    delete: build.mutation<
      BaseResponse<UserDetails>,
      { authId: number; userId: number }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: userUrl('/delete'),
          body: request,
        };
      },
      invalidatesTags: ['User'],
      // invalidatesTags: (result) => [{type: 'User', id: result?.data?.user.id}]
    }),

    /**
     * Добавление изображения
     * @param: formData: [file]:file, [userId]
     */
    imageAdd: build.mutation<BaseResponse<BaseImage>, FormData>({
      query: (body) => ({
        method: 'POST',
        url: userUrl('/img_add'),
        body: body,
      }),
      invalidatesTags: ['User'],
    }),

    /**
     * Обновление изображения
     * @param: formData: [file]:file, [userId], [imageId]
     */
    imageUpdate: build.mutation<BaseResponse<BaseImage>, FormData>({
      query: (formData) => ({
        method: 'POST',
        url: userUrl('/img_update'),
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),

    /**
     * Удаление изображения
     * @param: userId, imageId
     */
    imageDelete: build.mutation<
      BaseResponse<BaseImage>,
      { userId: number; imageId: number }
    >({
      query: (body) => ({
        method: 'POST',
        url: userUrl('/img_delete'),
        body: body,
      }),
      invalidatesTags: ['User'],
    }),

    /**
     * Получить количество сотрудников по полам
     * [baseRequest]:
     *  subdepts = true - включая все подотделы [deptId]
     *           = false - только этот отдел [deptId]
     */
    getGenderCountByDept: build.query<
      BaseResponse<GenderCount>,
      { authId: number; deptId: number; baseRequest: BaseRequest }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: userUrl('/gender_count'),
          body: request,
        };
      },
      providesTags: ['User'],
    }),

    // /**
    //  * Получить сотрудников отдела/подотделов с наградами (через активность типа AWARD)
    //  */
    // getUsersWithAwards: build.query<
    //   BaseResponse<User[]>,
    //   { authId: number; deptId: number; baseRequest: BaseRequest | undefined }
    // >({
    //   query: (request) => {
    //     return {
    //       method: 'POST',
    //       url: userUrl('/get_awards'),
    //       body: request,
    //     };
    //   },
    //   providesTags: ['User'],
    // }),

    /**
     * Получить сотрудников с количеством награждений
     * [baseRequest]:
     *  subdepts - отдел или все подотделы
     *  Параметры пагинации [page], [pageSize] - необязательны, по умолчанию 0 и 100 соответственно
     *  minDate <= activity.startDate (отсутствует - без min ограничения)
     *  maxDate >= activity.endDate (отсутствует - без max ограничения) - для подсчета наград за период
     *  Допустимые поля для сортировки:
     *      "firstname",
     *      "patronymic",
     *      "lastname",
     *      "post",
     *      "(awardCount)",
     *      "(deptName)",
     *      "(classname)",
     */
    getUsersWithAwardCount: build.query<
      BaseResponse<User[]>,
      { authId: number; deptId: number; baseRequest: BaseRequest | undefined }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: userUrl('/get_award_count'),
          body: request,
        };
      },
      providesTags: ['User'],
    }),

    /**
     * Сохранение настроек сотрудника
     */
    saveSettings: build.mutation<
      BaseResponse<UserSettings>,
      UserSettingsRequest
    >({
      query: (request) => ({
        method: 'POST',
        url: userUrl('/save_settings'),
        body: request,
      }),
      invalidatesTags: ['Settings'],
    }),

    /**
     * Получение настроек сотрудника
     */
    getSettings: build.query<BaseResponse<UserSettings>, { userId: number }>({
      query: (request) => ({
        method: 'POST',
        url: userUrl('/get_settings'),
        body: request,
      }),
      providesTags: ['Settings'],
    }),
  }),
});
