import {Dept} from "@/app/domain/model/dept/dept";

export interface User {
    id?: number
    dept?: Dept
    firstname: string
    lastname?: string
    patronymic?: string
    authEmail: string
    gender: Gender
    post?: string
    roles: RoleUser[]
}

export type Gender = "MALE" | "FEMALE" | "UNDEF"

export type RoleUser = "USER" | "ADMIN" | "OWNER"