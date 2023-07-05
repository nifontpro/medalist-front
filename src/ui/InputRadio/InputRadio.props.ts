import { Gender } from '@/types/user/user';
import {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
} from 'react';
import {
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';

export type InputRadioProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error?:
    | Merge<FieldError, FieldErrorsImpl<DeepRequired<FileList>>>
    | undefined;
  active: Gender;
  setActive: Dispatch<SetStateAction<Gender>>;
};
