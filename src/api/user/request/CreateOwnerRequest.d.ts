import {Gender} from "@/app/domain/model/user/user";

export interface CreateOwnerRequest {
    firstname: string
    lastname?: string
    patronymic?: string
    post?: string
    gender: Gender
    phone?: string
    address?: string
    description?: string
}