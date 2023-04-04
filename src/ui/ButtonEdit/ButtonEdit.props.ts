import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"
import edit from './edit.svg'
import remove from './remove.svg'
import refresh from './refresh.svg'

export const icons = {
    edit,
    remove,
    refresh
}

export type IconName = keyof typeof icons

export type ButtonEditProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    icon: IconName
    children?: ReactNode
}