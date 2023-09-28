import {FC} from 'react'

import styles from './SelectArtem.module.scss'
import {IOption, ISelect} from './SelectArtem.interface'
import ReactSelect, {OnChangeValue} from "react-select";
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated()

const SelectArtem: FC<ISelect> = (
	{
		placeholder,
		error,
		isMulti,
		options,
		field,
		isLoading,
	}) => {

	const onChange = (newValue: unknown | OnChangeValue<IOption, boolean>) => {
		field.onChange(
			isMulti
				? (newValue as IOption[]).map((item: IOption) => item.value)
				: (newValue as IOption).value
		)
	}

	const getValue = () => {
		if (field.value) {
			return isMulti
				? options.filter((option) => field.value.indexOf(option.value) >= 0)
				: options.find((option) => option.value === field.value)
		} else {
			return isMulti ? [] : ''
		}
	}

	return (
		<div className={styles.selectContainer}>
			<label className={styles.label}>
				<span>{placeholder}</span>
				<ReactSelect
					classNamePrefix="custom-select"
					placeholder={'Выберите...'}
					options={options}
					value={getValue()}
					onChange={onChange}
					isMulti={isMulti} // false
					components={animatedComponents}
					isLoading={isLoading}
					theme={(theme) => ({
						...theme,
						borderRadius: 5,
						colors: {
							...theme.colors,
							neutral80: '#101010'
						}
					})}
				/>
			</label>
			{error && <div className={styles.error}>{error.message}</div>}
		</div>
	)
}

export default SelectArtem