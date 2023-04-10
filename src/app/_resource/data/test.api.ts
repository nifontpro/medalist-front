import { TypeRootState } from '@/redux/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const API_SERVER_URL = 'http://localhost:8080';

// refresh:
// https://stackoverflow.com/questions/73426775/how-to-handle-jwt-token-refresh-cycle-with-react-and-rtk-query-refetching-the-f

export const accessQuery = fetchBaseQuery({
  baseUrl: API_SERVER_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as TypeRootState).auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const testApi = createApi({
  reducerPath: 'Test',
  baseQuery: accessQuery,
  tagTypes: ['Test'],
  endpoints: (build) => ({
    getTestData: build.mutation<{ data: string }, void>({
      query: () => {
        return {
          method: 'GET',
          url: '/admin/info',
        };
      },
      invalidatesTags: ['Test'],
    }),
  }),
});
