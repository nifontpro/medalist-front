import { DetailedHTMLProps, HTMLAttributes } from "react"

export type SearchProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    placeholder: string
    button: boolean
    search: boolean
    color: 'gray' | 'white'
}