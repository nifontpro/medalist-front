import { DeptDetails } from '@/types/dept/deptDetails'
import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react"

export type InputFileExcelUsersProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    children: ReactNode
    department: DeptDetails
}