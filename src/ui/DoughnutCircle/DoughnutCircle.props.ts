import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type DoughnutCircleProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    dataOne: number | undefined
    dataTwo: number | undefined
    colorOne: string
    colorTwo: string
}