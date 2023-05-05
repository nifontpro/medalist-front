
import { MotionProps } from 'framer-motion'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, ReactNode, RefAttributes, SetStateAction } from "react"
import { IMessage } from '../Notification.props'

export type NotificationModalWindowProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & MotionProps & RefAttributes<HTMLDivElement> & {
    visibleModal: boolean
    setVisibleModal: Dispatch<SetStateAction<boolean>>
    message: IMessage[] | undefined
}