import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '@/app/_resource/data/base.api';

export const resourceApi = createApi({
  reducerPath: 'Resource',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Resource'],
  endpoints: (build) => ({
    getTestData: build.query<{ res: string }, void>({
      query: () => {
        return {
          method: 'POST',
          url: '/user/data',
          body: { res: 'Test Body from Front' },
        };
      },
      providesTags: ['Resource'],
    }),

    // getTest: build.mutation<{ data: string }, void>({
    //     query: () => {
    //         return {
    //             method: 'GET',
    //             url: '/admin/test',
    //         }
    //     },
    //     invalidatesTags: ['Resource']
    // })
  }),
});
