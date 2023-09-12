import { Options } from 'react-select';
import { IFieldProps } from '../Field/Field.type';
import { Dispatch, SetStateAction } from 'react';

export interface IOptionInterval {
  label: string;
  value: number;
}

export interface ISelect extends IFieldProps {
  options: Options<IOptionInterval>;
  isMulti?: boolean;
  isLoading?: boolean;
  dataInterval: IOptionInterval | null;
  setDataInterval: Dispatch<SetStateAction<IOptionInterval | null>>;
}
