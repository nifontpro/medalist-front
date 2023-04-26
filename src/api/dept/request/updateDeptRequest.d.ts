import {CreateDeptRequest} from "@/api/dept/request/createDeptRequest";

export interface UpdateDeptRequest extends Omit<CreateDeptRequest, 'parentId'> {
    deptId: number
}