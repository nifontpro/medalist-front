
import { Award } from '@/domain/model/award/Award'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, SetStateAction } from "react"
import { SortAwardsType } from '../useAwards'

export type FilterAwardsProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    state: "ASC" | "DESC"
    setState: Dispatch<SetStateAction<"ASC" | "DESC">>
    active: SortAwardsType
    setActive: Dispatch<SetStateAction<SortAwardsType>>
    allNominee: Award[] | undefined
    allAwards: Award[] | undefined
    awardsFull: Award[]
}