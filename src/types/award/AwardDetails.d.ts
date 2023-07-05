import { Award } from '@/types/award/Award';

export interface AwardDetails {
  award: Award;
  description?: string;
  criteria?: string;
  createdAt?: number;
}
