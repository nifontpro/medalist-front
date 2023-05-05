import { DetailedHTMLProps, Dispatch, HTMLAttributes, ReactNode, SetStateAction } from "react"
import check from './check.svg'

export const icons = {
    check
}

export type IconName = keyof typeof icons

export type CheckboxProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    icon: IconName
    children?: ReactNode
    visibleCheckbox: boolean
    setVisibleCheckbox: Dispatch<SetStateAction<boolean>>
}