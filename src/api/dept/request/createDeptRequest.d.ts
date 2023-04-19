export interface CreateDeptRequest {
    authId: number
    parentId: number
    name: string
    classname?: string
    address?: string
    email?: string
    phone?: string
    description?: string
}