import {User} from "@/app/domain/model/user/user";

export interface UserDetails {
    user: User
    phone?: string
    address?: string
    description?: string
    createdAt?: number
}