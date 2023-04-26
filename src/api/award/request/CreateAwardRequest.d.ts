import {AwardType} from "@/domain/model/award/Award";

export interface CreateAwardRequest {
    authId: number
    deptId: number

    name: string
    type: AwardType
    startDate: number
    endDate: number

    description?: string
    criteria?: string
}