
import { User } from '@/types/user/user'
import { ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent } from "react"

export type UserLogoProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    user: User | undefined
}