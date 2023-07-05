import {Dept} from "@/app/domain/model/dept/dept";

export interface DeptDetails {
    dept: Dept
    address?: string
    email?: string
    phone?: string
    description?: string
    createdAt?: number
}