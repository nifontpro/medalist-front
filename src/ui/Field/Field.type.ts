import { InputHTMLAttributes } from 'react'
import {FieldError} from "react-hook-form";

export interface IFieldProps {
	placeholder?: string | undefined
	error?: FieldError | undefined
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps & {}

export interface IField extends TypeInputPropsField {

}