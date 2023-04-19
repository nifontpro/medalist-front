import { MotionProps } from 'framer-motion';
import { DetailedHTMLProps, HTMLAttributes, ReactNode, RefAttributes } from "react"

export type EditPanelAuthBtnProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & MotionProps & RefAttributes<HTMLDivElement> & {
    children?: ReactNode;
    handleRemove: (id: number) => void
    id: string
    getUrlEdit: (string?: string) => string
    getUrlCreate: (string?: string) => string
    onlyRemove: boolean
    color?: 'white' | 'transparent'
}