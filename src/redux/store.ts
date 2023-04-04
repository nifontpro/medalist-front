import { treeIdsSlice } from '@/redux/features/treeIdsArray/treeIdsArray.slice';
import { configureStore } from '@reduxjs/toolkit';
// ...

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    treeIds: treeIdsSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
