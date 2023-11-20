import {UserEvent} from "@/types/user/userEvent";
import {ResponseError} from "@/types/base/BaseResponse";

interface AddUserReport {
  userDetails: UserDetails
  success: boolean
  isUpdate: boolean
  events: UserEvent[]
  errors: ResponseError[]
}