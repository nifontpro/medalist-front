import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
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
import { awardApi } from '@/api/award/award.api';
import { themeSlice } from '../features/theme/theme.slice';
import { galleryApi } from '@/api/gallery/gallery.api';
import { visibleModalWindowGalleryAwardsSlice } from '../features/visibleModalWindowGalleryAwards/visibleModalWindowGalleryAwards.slice';
import { eventApi } from '@/api/event/event.api';
import { messageApi } from '@/api/msg/message.api';
// import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { switchDepartmentOnCompanySlice } from '../features/switchDepartmentOnCompany/switchDepartmentOnCompany.slice';
import { treeDeptsSlice } from '../features/treeDepts/treeDepts.slice';
import { productApi } from '@/api/shop/product/product.api';
import { authMiddleware } from './auth-middleware';

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
  whitelist: [
    'auth',
    'sidebarTree',
    'userSelection',
    'header',
    'theme',
    'treeDepts',
    'switcher',
    'dataCreateAward',
    'visibleModalWindowGalleryAwards',
  ], // только это хотим сохрать в localstorage, остальное нам не нужно сохранять
  blacklist: [
    userApi.reducerPath,
    deptApi.reducerPath,
    awardApi.reducerPath,
    galleryApi.reducerPath,
    eventApi.reducerPath,
    messageApi.reducerPath,
    productApi.reducerPath,
  ], // то что не хотим сохранять в localstorage
};

const rootReducer = combineReducers({
  sidebarTree: sidebarTreeSlice.reducer,
  userSelection: userSelectionSlice.reducer,
  header: headerSlice.reducer,
  auth: authSlice.reducer,
  theme: themeSlice.reducer,
  treeDepts: treeDeptsSlice.reducer,
  switcher: switchDepartmentOnCompanySlice.reducer,
  visibleModalWindowGalleryAwards: visibleModalWindowGalleryAwardsSlice.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [deptApi.reducerPath]: deptApi.reducer,
  [awardApi.reducerPath]: awardApi.reducer,
  [galleryApi.reducerPath]: galleryApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [messageApi.reducerPath]: messageApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
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
    }).concat(
      userApi.middleware,
      deptApi.middleware,
      awardApi.middleware,
      galleryApi.middleware,
      eventApi.middleware,
      messageApi.middleware,
      productApi.middleware,
      authMiddleware
    ),
});

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<TypeRootState> =
  useSelector;

// setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
