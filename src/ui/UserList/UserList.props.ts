
import { User } from '@/types/user/user';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type UserListProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    user: User
}