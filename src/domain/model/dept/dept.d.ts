export interface Dept {
    id? : number
    parentId: number
    name: string
    classname?: string
    type: DeptType
}

export type DeptType = "ROOT" | "USER_OWNER" | "SIMPLE" | "UNDEF"