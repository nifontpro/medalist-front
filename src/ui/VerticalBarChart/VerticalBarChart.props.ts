import { DateMonth } from '@/app/department/[id]/statistics/_components/Statistic/StatisticActivity/StatisticActivity.types'
import { DetailedHTMLProps, HTMLAttributes } from "react"

export type VerticalBarChartProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    objNominees: DateMonth
    objAwards: DateMonth
}