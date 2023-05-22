
export interface IMessage {
    fromId?: string
    id: string
    toId: string
    type: MessageType
    theme?: string
    themeSlug?: string
    text: string
    read: boolean
    sendDate?: number
    readDate?: number
    imageUrl?: string
}

export type MessageType = "NONE" | "SYSTEM" | "USER"

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

export type NotificationProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    allMessage: IMessage[] | undefined
}