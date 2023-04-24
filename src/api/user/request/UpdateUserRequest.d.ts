import {CreateOwnerRequest} from "@/api/user/request/CreateOwnerRequest";
 import {RoleUser} from "@/domain/model/user/user";

 export interface UpdateUserRequest extends CreateOwnerRequest {
     authId: number
     userId: number
     authEmail?: string // Почта по которой будет входить новый сотрудник
     roles: RoleUser[] // допустимые роли: ADMIN, USER
 }