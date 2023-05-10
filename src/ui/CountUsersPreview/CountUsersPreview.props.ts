import { User } from '@/domain/model/user/user'
import { DetailedHTMLProps, HTMLAttributes } from "react"

export type CountUsersPreviewProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    usersInDepartment?: User[] | undefined
    usersAwards?: User[] | undefined
    listUserVisible?: boolean
    appearanceBtn: 'black' | 'white'
}