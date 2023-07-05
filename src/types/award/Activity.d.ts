import { User } from '@/types/user/user';
import { Award } from '@/types/award/Award';

export interface Activity {
  id: number;
  date?: number;
  user?: User;
  award?: Award;
  actionType: ActionType;

  /**
   * Активность текущего действия (при просмотре истории)
   * Для одного и того сотрудника и одной и той же награды
   * только одно (обычно последнее) действие может быть активным.
   * Т. е., если в истории действий сначала выполняем номинацию, а
   * затем награждение сотрудника, то запись с награждением будет иметь флаг activ = true.
   * Действие удаление устанавливает этот флаг в false при сохранении истории действий.
   */
  activ: boolean;

  deptId: number;
  authId: number;
}

/**
 * Тип действия с наградой
 */
export type ActionType =
  | 'NOMINEE' // Номинация
  | 'AWARD' // Награждение
  | 'DELETE' // Удаление награждения или номинации
  | 'UNDEF';
