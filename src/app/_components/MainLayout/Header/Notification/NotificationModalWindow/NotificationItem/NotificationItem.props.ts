
import { IMessage } from 'message/model/message.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, ReactNode, SetStateAction } from "react"

export type NotificationItemProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLLIElement>, HTMLLIElement> & {
    notification: IMessage
}