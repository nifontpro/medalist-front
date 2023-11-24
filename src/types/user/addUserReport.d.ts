import {UserEvent} from "@/types/user/userEvent";
import {ResponseError} from "@/types/base/BaseResponse";
import {UserDetails} from "@/types/user/userDetails";

interface AddUserReport {
  userDetails: UserDetails
  success: boolean
  isUpdate: boolean
  events: UserEvent[]
  errors: ResponseError[]
}

interface LoadReport {
  addReport: AddUserReport[]
  createdDeptCount: number
  createdUserCount: number
  updatedUserCount: number
}