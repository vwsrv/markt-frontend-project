import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  PropsWithoutRef,
  RefAttributes
} from 'react';

interface typeInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  name: string;
  type?:
    | 'text'
    | 'email'
    | 'tel'
    | 'password'
    | 'url'
    | 'number'
    | 'date'
    | string;
}

export type InputProps = PropsWithoutRef<typeInputProps> &
  RefAttributes<HTMLInputElement>;
