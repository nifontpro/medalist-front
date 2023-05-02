import { Award } from '@/domain/model/award/Award';

export interface AwardDetails {
  award: Award;
  description?: string;
  criteria?: string;
  createdAt?: number;
}
