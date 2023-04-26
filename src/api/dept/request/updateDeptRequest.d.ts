import {BaseDeptRequest} from "@/api/dept/request/createDeptRequest";

 export interface UpdateDeptRequest extends BaseDeptRequest {
     deptId: number
 }