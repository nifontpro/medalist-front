export interface BaseImage {
    id?: number
    imageUrl: string
    type: ImageType
    main: boolean
    createdAt: number
}

export type ImageType = "USER" | "SYSTEM" | "UNDEF"