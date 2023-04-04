
import { IUser } from '@/app/user/_model/user';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type UserListProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    user: IUser
}