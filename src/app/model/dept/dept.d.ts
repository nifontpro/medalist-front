export interface IDept {
    id: number
    parent_id: number | null
    name: string
    code: string
    createdAt?: number
    class_id?: number
}