import { DetailedHTMLProps, InputHTMLAttributes } from "react"
import { FieldError } from "react-hook-form"

export type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    error?: FieldError
    search?: boolean
    color: string
}