/**
 * Общий интерфейс для сортировки данных по полям в нужном направлении
 */
export interface BaseOrder {
  field: string;
  direction?: 'ASC' | 'DESC'; // По умолчанию ASC
}
