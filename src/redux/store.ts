import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
// import {authApi} from '@/auth/data/auth.api';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
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
// import {resourceApi} from "@/app/resource/data/resource.api";
// import {testApi} from "@/app/resource/data/test.api";
// import {authSlice} from "@/auth/data/auth.slice";

import createWebStorage from 'redux-persist/es/storage/createWebStorage';
import { sidebarTreeSlice } from '@/app/_components/MainLayout/Sidebar/sidebarTree.slice';

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

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  // auth: authSlice.reducer,
  sidebarTree: sidebarTreeSlice.reducer,
  // [authApi.reducerPath]: authApi.reducer,
  // [resourceApi.reducerPath]: resourceApi.reducer,
  // [testApi.reducerPath]: testApi.reducer,
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
    })
      .concat

      // authApi.middleware,
      // resourceApi.middleware,
      // testApi.middleware,
      (),
});

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<TypeRootState> =
  useSelector;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
