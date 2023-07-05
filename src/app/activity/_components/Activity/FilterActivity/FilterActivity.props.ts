import { IActivity } from '@/activity/model/activity.types'
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, SetStateAction } from "react"

export type FilterActivityProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    state: 1 | -1
    setState: Dispatch<SetStateAction<1 | -1>>
    active: "" | "AWARD" | "NOMINEE" | "DELETE_USER"
    setActive: Dispatch<SetStateAction<"" | "AWARD" | "NOMINEE" | "DELETE_USER">>
    setStartDate: Dispatch<SetStateAction<number>>
    setEndDate: Dispatch<SetStateAction<number>>
    allActivityLength: number
    awardsLength: number
    nomineeLength: number
    otherLength: number
    startDate: number;
    endDate: number;
    setSizePage: Dispatch<SetStateAction<number>>
    setArr: Dispatch<SetStateAction<IActivity[]>>
}