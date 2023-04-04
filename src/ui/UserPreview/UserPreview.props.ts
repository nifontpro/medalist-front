import { IUser } from '@/user/model/user.types'
import { DetailedHTMLProps, HTMLAttributes } from "react"

export type UserPreviewProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    user: IUser
    forWhat: string
}