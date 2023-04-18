import {toast} from "react-toastify";

export interface IContextError {
	code: string
	group: string
	field: string
	message: string
}

export const listError = (error: any): string[] => {
	if (typeof error?.data === 'object' && error?.data?.type == "multiError") {
		const errors = error.data.errors as IContextError[]
		return errors.map((error) => (
			error.message
		))
	}
	return ["Неизвестная ошибка"]
}
export const toastError = (error: any, title?: string) => {

	const messages = listError(error)
	const ttl = title || 'Ошибка запроса'
	messages.map(message => {
			toast.error(`${ttl} ${message}`)
		}
	)
}

/*
export const toastError = (error: any, title?: string) => {
	const message = errorCatch(error)
	const ttl = title || 'Ошибка запроса'
	toast.error(`${ttl}: ${message}`)
	throw message
}
*/
