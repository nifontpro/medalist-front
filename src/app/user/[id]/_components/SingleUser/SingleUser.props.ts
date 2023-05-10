
import { Activity } from '@/domain/model/award/Activity';
import { UserDetails } from '@/domain/model/user/userDetails';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type SingleUserProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    user: UserDetails | undefined
    userActiv: Activity[] | undefined
}