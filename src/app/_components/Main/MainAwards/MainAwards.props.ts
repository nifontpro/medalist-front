import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, ReactNode, SetStateAction } from "react"

export type MainAwardsProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
}