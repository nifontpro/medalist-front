import {CreateOwnerRequest} from "@/api/user/request/CreateOwnerRequest";
 import {RoleUser} from "@/domain/model/user/user";

 export interface CreateUserRequest extends CreateOwnerRequest {
     authId: number
     deptId: number
     authEmail?: string // Почта по которой будет входить новый сотрудник
     roles: RoleUser[] // допустимые роли: ADMIN, USER
 }