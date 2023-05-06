import {BaseOrder} from "@/domain/model/base/sort/BaseOrder";

export interface BaseRequest {
	orders?: BaseOrder[]
	minDate?: number
	maxDate?: number
}