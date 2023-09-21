import { ControllerRenderProps, FieldError } from 'react-hook-form';

import { Options } from 'react-select';

export interface IFieldProps {
  placeholder?: string | undefined;
  error?: FieldError | undefined;
}

export interface IOption {
  label: string;
  value: number | undefined;
}

export interface ISelect extends IFieldProps {
  options: Options<IOption>;
  isMulti?: boolean;
  field: ControllerRenderProps<any, any>;
  isLoading?: boolean;
}
