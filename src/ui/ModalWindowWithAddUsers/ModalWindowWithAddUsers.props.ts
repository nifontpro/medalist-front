
import { ActionType } from '@/domain/model/award/Activity'
import { User } from '@/domain/model/user/user'
import { MotionProps } from 'framer-motion'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, RefAttributes, SetStateAction } from "react"

export type ModalWindowWithAddUsersProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & MotionProps & RefAttributes<HTMLDivElement> & {
    visibleModal: boolean
    setVisibleModal: Dispatch<SetStateAction<boolean>>
    users: User[]
    awardId: string
    awardState: ActionType
    textBtn: string
}