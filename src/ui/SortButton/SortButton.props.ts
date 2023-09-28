import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type SortButtonProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    state: 'ASC' | 'DESC'
}