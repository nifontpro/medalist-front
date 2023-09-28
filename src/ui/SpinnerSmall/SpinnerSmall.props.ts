import { DetailedHTMLProps, HTMLAttributes } from "react"

export type SpinnerSmallProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    position?: 'start' | 'center' | 'end'
}