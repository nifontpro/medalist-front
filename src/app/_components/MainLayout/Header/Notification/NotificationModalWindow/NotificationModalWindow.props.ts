
import { IUser } from '@/user/model/user.types'
import { MotionProps } from 'framer-motion'
import { IMessage } from 'message/model/message.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, ReactNode, RefAttributes, SetStateAction } from "react"

export type NotificationModalWindowProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & MotionProps & RefAttributes<HTMLDivElement> & {
    visibleModal: boolean
    setVisibleModal: Dispatch<SetStateAction<boolean>>
    message: IMessage[] | undefined
}