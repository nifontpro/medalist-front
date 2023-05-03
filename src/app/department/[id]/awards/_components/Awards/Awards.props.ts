
import { AwardDetails } from '@/domain/model/award/AwardDetails';
import { User } from '@/domain/model/user/user';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type AwardsProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  awards: AwardDetails[]
  id: string
};
