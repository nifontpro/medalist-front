import {Dept} from "@/app/domain/model/dept/dept";
import {BaseImage} from "@/types/base/image/baseImage";

export interface DeptDetails {
    dept: Dept
    address?: string
    email?: string
    phone?: string
    description?: string
    createdAt?: number
    images: BaseImage[]
}