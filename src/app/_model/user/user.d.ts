export type IGender = "MALE" | "FEMALE" | "UNDEF"

// export interface IUserDetails {
//     phone?: string
//     address?: string
//     post?: string
//     description?: string
// }

export interface IUser {
    id: number
    deptId: number
    email: string
    firstname: string
    patronymic?: string
    lastname?: string
    post?: string
    gender?: IGender
    // details?: IUserDetails
}