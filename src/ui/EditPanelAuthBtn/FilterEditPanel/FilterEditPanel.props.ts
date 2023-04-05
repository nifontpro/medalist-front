import { MotionProps } from 'framer-motion';
import { DetailedHTMLProps, Dispatch, HTMLAttributes, ReactNode, RefAttributes, SetStateAction } from "react"

export type FilterEditPanelProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & MotionProps & RefAttributes<HTMLDivElement> & {
    children?: ReactNode;
    visible: boolean
    // deleteAsync:(id: string) => void
    getUrl?: (string?: string) => string
    onlyRemove?: boolean 
    setVisible: Dispatch<SetStateAction<boolean>>
}