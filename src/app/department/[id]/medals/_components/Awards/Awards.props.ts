// import { ICompany } from '@/company/model/company.types';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export type AwardsProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
  // company: ICompany
};
