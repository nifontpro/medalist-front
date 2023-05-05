
import { User } from '@/domain/model/user/user'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, SetStateAction } from "react"

export type FilterCreateAwardProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    arrChoiceUser: string[]
    users: User[]
    setArrChoiceUser: Dispatch<SetStateAction<string[]>>
}