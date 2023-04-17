import {createApi} from '@reduxjs/toolkit/dist/query/react';
import {baseQueryWithReauth} from "@/app/api/base/base.api";
import {UserDetails} from "@/app/domain/model/user/userDetails";
import {CreateOwnerRequest} from "@/app/api/user/request/CreateOwnerRequest";
import {Dept} from "@/app/domain/model/dept/dept";
import {DeptDetails} from "@/app/domain/model/dept/deptDetails";
import {CreateDeptRequest} from "@/app/api/dept/request/createDeptRequest";

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