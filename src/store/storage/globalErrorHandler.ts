import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
// import { addNotification } from './notifications-slice';

/**
 * Тут перехватываются все ошибки. Нужно добавить обработку ошибок, которые не должны перехватываться.
 */
export const globalErrorHandler: Middleware =
  ({ dispatch }: MiddlewareAPI) =>
  (next) =>
  (action) => {
    // RTK Query uses createAsyncThunk from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      if (action?.payload?.status === 401) {
        // Проверяем, пытались ли мы уже обновить токен
        const attemptedTokenRefresh = sessionStorage.getItem(
          'attemptedTokenRefresh'
        );

        if (!attemptedTokenRefresh) {
          // Устанавливаем флаг попытки обновления токена
          sessionStorage.setItem('attemptedTokenRefresh', 'true');
          // Перезагружаем страницу для попытки обновления токена
          window.location.reload();
        } else {
          // Если попытка обновления токена уже была, не делаем ничего,
          // чтобы избежать бесконечной перезагрузки
          console.error('Authentication error: Token refresh failed.');
        }

        return next(action);
      }
      //   dispatch(
      //     addNotification({
      //       title: Ошибка #${action?.payload?.status},
      //       text: action?.payload?.data?.errorMessage,
      //       id: action?.payload?.data?.errorMessage,
      //       badge: 'negative',
      //       delay: 5000,
      //     }),
      //   );
    }

    return next(action);
  };
