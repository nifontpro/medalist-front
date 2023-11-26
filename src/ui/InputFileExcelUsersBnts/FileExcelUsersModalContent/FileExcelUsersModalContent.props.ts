import { BaseResponse } from '@/types/base/BaseResponse';
import { LoadReport } from '@/types/user/addUserReport';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type FileExcelUsersModalContentProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  data: BaseResponse<LoadReport> | undefined;
};
