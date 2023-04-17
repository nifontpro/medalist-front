import {createApi} from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '../base/base.api';
import { Dept } from '@/domain/model/dept/dept';
import { DeptDetails } from '@/domain/model/dept/deptDetails';
import { CreateDeptRequest } from './request/createDeptRequest';
import { UserDetails } from '@/domain/model/user/userDetails';
import { CreateOwnerRequest } from '../user/request/CreateOwnerRequest';

export const deptApi = createApi({
    reducerPath: 'DeptApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Dept'],
    endpoints: (build) => ({

        /**
         * Получение поддерева отделов текущего пользователя
         */
        getAuthSubtree: build.query<Dept[], void>({
            query: () => {
                return {
                    method: 'POST',
                    url: '/dept/auth_subtree',
                }
            },
            providesTags: ['Dept']
        }),

        /**
         * Создание нового отдела
         */
        getProfiles: build.mutation<DeptDetails, CreateDeptRequest>({
            query: () => {
                return {
                    method: 'POST',
                    url: '/dept/create',
                }
            },
            invalidatesTags: ['Dept']
        }),

        createOwner: build.mutation<UserDetails, CreateOwnerRequest>({
            query: (request) => {
                return {
                    method: 'POST',
                    url: '/user/create_owner',
                    body: request
                }
            },
            invalidatesTags: ['Dept']
        }),

    })
})