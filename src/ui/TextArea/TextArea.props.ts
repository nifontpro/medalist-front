import { DetailedHTMLProps, TextareaHTMLAttributes } from "react"
import { FieldError } from "react-hook-form"

export type TextAreaProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
    error?: FieldError
    placeholder: string | undefined
    title: string
}