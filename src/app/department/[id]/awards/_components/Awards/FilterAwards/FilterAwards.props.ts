
import { Award } from '@/domain/model/award/Award'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, SetStateAction } from "react"
import { SortAwardsType } from '../useAwards'

export type FilterAwardsProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    state: 1 | -1
    setState: Dispatch<SetStateAction<1 | -1>>
    active: SortAwardsType
    setActive: Dispatch<SetStateAction<SortAwardsType>>
    allNominee: Award[]
    allAwards: Award[]
    awardsFull: Award[]
}