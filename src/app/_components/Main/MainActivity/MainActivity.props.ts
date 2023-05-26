
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type MainActivityProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
}