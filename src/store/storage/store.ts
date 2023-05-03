import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { authApi } from '@/api/auth/auth.api';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
// import storage from 'redux-persist/lib/storage'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';
import { sidebarTreeSlice } from '@/store/features/sidebar/sidebarTree.slice';
import { authSlice } from '@/store/features/auth/auth.slice';
import { userSelectionSlice } from '../features/userSelection/userSelection.slice';
import { userApi } from '@/api/user/user.api';
import { deptApi } from '@/api/dept/dept.api';
import { headerSlice } from '../features/header/header.slice';

// Ниже код для исправления ошибки "redux-persist failed to create sync storage. falling back to noop storage"
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();
// Выше код для исправления ошибки "redux-persist failed to create sync storage. falling back to noop storage"

const persistConfig = {
  key: 'root',
  storage,
  // Если используем RTK-query нужно обзяательно включить в blacklist ! ! !
  whitelist: ['auth', 'sidebarTree', 'userSelection'], // только это хотим сохрать в localstorage, остальное нам не нужно сохранять
  blacklist: [authApi.reducerPath, userApi.reducerPath, deptApi.reducerPath], // то что не хотим сохранять в localstorage
};

const rootReducer = combineReducers({
  sidebarTree: sidebarTreeSlice.reducer,
  userSelection: userSelectionSlice.reducer,
  header: headerSlice.reducer,
  auth: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [deptApi.reducerPath]: deptApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, userApi.middleware, deptApi.middleware),
});

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<TypeRootState> =
  useSelector;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
