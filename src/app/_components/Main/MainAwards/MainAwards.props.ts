import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type MainAwardsProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    // awards: IAward[]
    // users: IUserAwards[]
    // awardsOnCompanyGroupDep: IUserAwardsCountDep[]
}