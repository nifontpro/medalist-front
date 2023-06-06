
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type MainProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
}