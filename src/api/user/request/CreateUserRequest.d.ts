import {CreateOwnerRequest} from "@/api/user/request/CreateOwnerRequest";

export interface CreateUserRequest extends CreateOwnerRequest {
    authId: number
    deptId: number
    authEmail?: string // Почта по которой будет входить новый сотрудник
}