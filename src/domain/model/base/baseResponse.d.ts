export interface BaseResponse<T> {
    data: T | null
    success: boolean
    errors: ResponseError[]
}

export interface ResponseError {
    code: string
    group: string
    field: string
    message: string
    level: Levels
}

export type Levels = "ERROR" | "WARNING" | "INFO" | "UNAUTHORIZED"