import { MotionProps } from 'framer-motion';
import { DetailedHTMLProps, HTMLAttributes, ReactNode, RefAttributes } from "react"

export type EditPanelProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & MotionProps & RefAttributes<HTMLDivElement> & {
    children?: ReactNode;
    visible: boolean
    // deleteAsync:(id: string) => void
    getUrl?: (string?: string) => string
    onlyRemove?: boolean
}