

import { User } from '@/domain/model/user/user'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, SetStateAction } from "react"

export type FilterCreateAwardProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    arrChoiceUser: string[]
    users: User[]
    setArrChoiceUser: Dispatch<SetStateAction<string[]>>
    setSearchValue: Dispatch<SetStateAction<string>>
    startPage: number
    endPage: number | undefined
    handleNextClick: () => void
    handlePrevClick: () => void
}