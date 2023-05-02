import { DeptDetails } from '@/domain/model/dept/deptDetails';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export type TitleSingleDepartmentProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
  department: DeptDetails;
};
