import { BaseResponse } from '@/types/base/BaseResponse';
import { User } from '@/types/user/user';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type UserSelectionProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  rolesUser: BaseResponse<User[]> | undefined;
  isLoading: boolean;
  expandedIds: string[];
  selectedIds: string;
};
