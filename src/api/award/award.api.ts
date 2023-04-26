import {createApi} from '@reduxjs/toolkit/dist/query/react';
import {baseQueryWithReauth} from '../base/base.api';
import {BaseResponse} from '@/domain/model/base/baseResponse';
import {AwardDetails} from "@/domain/model/award/AwardDetails";
import {CreateAwardRequest} from "@/api/award/request/CreateAwardRequest";

export const awardApi = createApi({
  reducerPath: 'AwardApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Award'],
  endpoints: (build) => ({


    /**
     * Создание новой награды
     */
    create: build.mutation<BaseResponse<AwardDetails>, CreateAwardRequest>({
      query: (request) => {
        return {
          method: 'POST',
          url: '/award/create',
          body: request,
        };
      },
      invalidatesTags: ['Award'],
    }),

  }),
});
