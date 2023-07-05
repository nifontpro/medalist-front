
import { User } from '@/types/user/user'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, SetStateAction } from "react"

export type UsersPreviewCreateAwardProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    arrChoiceUser: string[]
    users: User[]
    setSearchValue: Dispatch<SetStateAction<string>>
    setArrChoiceUser: Dispatch<SetStateAction<string[]>>
    startPage: number
    endPage: number | undefined
    handleNextClick: () => void
    handlePrevClick: () => void
}   