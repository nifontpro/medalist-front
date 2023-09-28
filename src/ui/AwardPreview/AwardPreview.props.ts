import { Award } from '@/types/award/Award'
import { DetailedHTMLProps, HTMLAttributes } from "react"

export type AwardPreviewProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    award: Award
}