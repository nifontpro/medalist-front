
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type SingleUserProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    id: string
}