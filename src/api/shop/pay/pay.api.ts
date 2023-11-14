import { UserPay } from '@/types/shop/pay/UserPay';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { BaseResponse } from '@/types/base/BaseResponse';
import { Product } from '@/types/shop/product/Product';
import { BaseRequest } from '@/types/base/BaseRequest';
import { baseQuery } from '@/api/base/base.api';
import { PayCode, PayData } from '@/types/shop/pay/PayData';
import userSelectionSlice, {
  setMoneyUser,
} from '@/store/features/userSelection/userSelection.slice';
import { productApi } from '../product/product.api';

export const payUrl = (string: string = '') => `/shop/pay${string}`;

export const payApi = createApi({
  reducerPath: 'PayApi',
  baseQuery: baseQuery,
  tagTypes: ['PayData', 'UserPay', 'Product'],
  endpoints: (build) => ({
    /**
     * Получение данных счета Сотрудника
     * [userId] - необходимо указать Администратору, счет какого Сотрудника нужно получить,
     *  если не указан, выводится собственный счет.
     *
     */
    getUserPay: build.query<
      BaseResponse<UserPay>,
      {
        authId: number;
        userId?: number;
      }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: payUrl('/get_user'),
          body: request,
        };
      },
      providesTags: ['UserPay'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          await dispatch(setMoneyUser(data.data?.balance));
        } catch (error) {
          console.error(`Error!`, error);
        }
      },
    }),

    /**
     * Покупка приза
     */
    payProduct: build.mutation<
      BaseResponse<PayData>,
      {
        authId: number;
        productId: number;
      }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: payUrl('/pay_product'),
          body: request,
        };
      },
      invalidatesTags: ['PayData', 'UserPay', 'Product'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(productApi.util.invalidateTags(['Product']));
        } catch (error) {
          console.error(`Error award user!`, error);
        }
      },
    }),

    /**
     * Выдать приз Сотруднику со склада Администратором.
     * [payDataId] - номер платежной операции при покупке приза
     */
    giveProductFromAdmin: build.mutation<
      BaseResponse<PayData>,
      {
        authId: number;
        payDataId: number;
      }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: payUrl('/give_admin'),
          body: request,
        };
      },
      invalidatesTags: ['PayData'],
    }),

    /**
     * Возврат уже выданного приза Сотрудником с возвратом ему средств на счет.
     * Операцию выполняет Администратор.
     * [payDataId] - номер платежной операции при выдаче приза
     */
    returnProductAdmin: build.mutation<
      BaseResponse<PayData>,
      {
        authId: number;
        payDataId: number;
      }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: payUrl('/return_admin'),
          body: request,
        };
      },
      invalidatesTags: ['PayData', 'UserPay', 'Product'],
    }),

    /**
     * Возврат еще не выданного приза Сотрудником с возвратом ему средств на счет.
     * Операцию выполняет сам Сотрудник.
     * [payDataId] - номер платежной операции при покупке приза
     */
    returnProductUser: build.mutation<
      BaseResponse<PayData>,
      {
        authId: number;
        payDataId: number;
      }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: payUrl('/return_user'),
          body: request,
        };
      },
      invalidatesTags: ['PayData', 'UserPay', 'Product'],
    }),

    /**
     * Получение списка платежных данных
     * [userId] - - необходимо указать Администратору, счет какого Сотрудника нужно получить,
     *    если не указан, выводится собственные платежные данные Сотрудника.
     * [deptId] - необходимо заполнить для Владельца, для определения конкретной компании.
     *    Может быть указан любой отдел компании, бэк сам определит id компании.
     *    Для всех остальных пользователей поле игнорируется (определяется автоматически).
     * [payCode] - Необязательный фильтр по типу операции
     * [isActive] - Необязательный фильтр по активному состоянию операции
     *
     * [baseRequest]:
     *  [minDate], [maxDate] - фильтрация по дате (необязателен)
     *  [filter] - фильтрация по названию приза (необязателен)
     *  Параметры пагинации [page], [pageSize] - необязательны, по умолчанию 0 и 100 соответственно
     *  Допустимые поля для сортировки:
     *      "id",
     *      "dateOp",
     *      "payCode",
     *      "price",
     *      "isActive",
     *      "userEntity.firstname",
     *      "userEntity.lastname",
     *      "userEntity.dept.name",
     *      "productEntity.name",
     *      "productEntity.price",
     *      "productEntity.count",
     */
    getByCompany: build.query<
      BaseResponse<PayData[]>,
      {
        authId: number;
        userId?: number;
        deptId?: number;
        payCode?: PayCode;
        isActive?: boolean;
        baseRequest?: BaseRequest;
      }
    >({
      query: (request) => {
        return {
          method: 'POST',
          url: payUrl('/get_pays'),
          body: request,
        };
      },
      providesTags: ['PayData'],
    }),
  }),
});
