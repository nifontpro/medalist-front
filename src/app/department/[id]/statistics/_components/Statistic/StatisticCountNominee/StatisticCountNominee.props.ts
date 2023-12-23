import { AwardStateCount } from '@/types/award/AwardStateCount';
import { BaseResponse } from '@/types/base/BaseResponse';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export type StatisticCountNomineeProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: ReactNode;
  colNomineeOnDepartment?: BaseResponse<AwardStateCount>;
};
