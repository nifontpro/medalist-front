import { MotionProps } from 'framer-motion';
import { ChangeEvent, DetailedHTMLProps, HTMLAttributes, ReactNode, RefAttributes } from "react"

export type EditPanelProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & MotionProps & RefAttributes<HTMLDivElement> & {
    children?: ReactNode;
    visible: boolean
    gallery: 'true' | 'false'
    onChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>
}