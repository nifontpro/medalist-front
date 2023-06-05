import { DetailedHTMLProps, HTMLAttributes } from "react"

export type SpinnerFetchingProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    main?: boolean
}