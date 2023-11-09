import {User} from "@/app/domain/model/user/user";
import {BaseImage} from "@/types/base/image/baseImage";

export interface UserDetails {
    user: User
    phone?: string
    address?: string
    description?: string
    createdAt?: number
    images: BaseImage[];
}