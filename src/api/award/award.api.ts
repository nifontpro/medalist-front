import {createApi} from '@reduxjs/toolkit/dist/query/react';
import {baseQueryWithReauth} from '../base/base.api';
import {BaseResponse} from '@/domain/model/base/baseResponse';
import {AwardDetails} from "@/domain/model/award/AwardDetails";
import {CreateAwardRequest} from "@/api/award/request/CreateAwardRequest";
import {UpdateAwardRequest} from "@/api/award/request/UpdateAwardRequest";
import {BaseImage} from "@/domain/model/base/image/baseImage";
import {BaseOrder} from "@/domain/model/base/sort/BaseOrder";
import {Activity} from "@/domain/model/award/Activity";
import {SendActionRequest} from "@/api/award/request/SendActionRequest";

export const awardApi = createApi({
	reducerPath: 'AwardApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['Award', 'Action'],
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

		delete: build.mutation<BaseResponse<AwardDetails>, { authId: number, awardId: number }>({
			query: (request) => {
				return {
					method: 'POST',
					url: '/award/delete',
					body: request,
				};
			},
			invalidatesTags: ['Award'],
		}),

		update: build.mutation<BaseResponse<AwardDetails>, UpdateAwardRequest>({
			query: (request) => {
				return {
					method: 'POST',
					url: '/award/update',
					body: request,
				};
			},
			invalidatesTags: ['Award'],
		}),

		getById: build.query<BaseResponse<AwardDetails>, { authId: number, awardId: number }>({
			query: (request) => {
				return {
					method: 'POST',
					url: '/award/get_id',
					body: request,
				};
			},
			providesTags: ['Award'],
		}),

		/**
		 * Получение наград из отдела [deptId]
		 * Допустимые поля для сортировки [orders]: "name", "type", "startDate", "endDate"
		 */
		getByDept: build.query<BaseResponse<AwardDetails>, {
			authId: number,
			deptId: number,
			orders: BaseOrder[] | undefined
		}>({
			query: (request) => {
				return {
					method: 'POST',
					url: '/award/get_dept',
					body: request,
				};
			},
			providesTags: ['Award'],
		}),

		/**
		 * Добавление изображения
		 * @param: formData: [file]:file, [authId], [awardId]
		 */
		imageAdd: build.mutation<BaseResponse<BaseImage>, FormData>({
			query: (formData) => ({
				method: 'POST',
				url: '/award/img_add',
				body: formData,
			}),
			invalidatesTags: ['Award'],
		}),

		/**
		 * Удаление изображения
		 * @param: authId, awardId, imageId
		 */
		imageDelete: build.mutation<BaseResponse<BaseImage>, { authId: number, awardId: number; imageId: number }>({
			query: (body) => ({
				method: 'POST',
				url: '/award/img_delete',
				body: body,
			}),
			invalidatesTags: ['Award'],
		}),

		/**
		 * Отправить действие [actionType] с определенно наградой [awardId]
		 * для сотрудника [userId]
		 */
		sendAction: build.mutation<BaseResponse<Activity>, SendActionRequest>({
			query: (body) => ({
				method: 'POST',
				url: '/award/action',
				body: body,
			}),
			invalidatesTags: ['Action'],
		}),

		/**
		 * Получить активные награждения сотрудника [userId]
		 * Допустимые поля для сортировки:
		 *      "date",
		 * 			"actionType",
		 * 			"award.name",
		 * 			"award.type"
		 */
		getActivAwardByUser: build.query<BaseResponse<Activity>, {
			authId: number,
			userId: number,
			orders: BaseOrder[] | undefined
		}>({
			query: (body) => ({
				method: 'POST',
				url: '/award/act_user',
				body: body,
			}),
			providesTags: ['Action'],
		}),

		/**
		 * Получить активные награждения в отделе [deptId]
		 * Допустимые поля для сортировки:
		 *      "date",
		 * 			"actionType",
		 * 			"user.firstname",
		 * 			"user.lastname",
		 * 			"user.patronymic",
		 * 			"user.post",
		 * 			"award.name",
		 * 			"award.type"
		 */
		getActivAwardByDept: build.query<BaseResponse<Activity>, {
			authId: number,
			deptId: number,
			orders: BaseOrder[] | undefined
		}>({
			query: (body) => ({
				method: 'POST',
				url: '/award/act_dept',
				body: body,
			}),
			providesTags: ['Action'],
		}),

	}),
});
