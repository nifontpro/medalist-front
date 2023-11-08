export interface Dept {
  id?: number;
  parentId: number;
  name: string;
  classname?: string;
  /**
   * topLevel - Признак того, что отдел является верхним по видимости в дереве отделов для сотрудников,
   * Обычно признак устанавливается для компании
   */
  topLevel: boolean;
  /**
   * Уровень отдела:
   *  0 - корень системы
   *  1 - корневой владелец
   *  2 - компания, например
   *  > 2 - отделы
   *  По умолчанию при создании отдела при level < 3 устанавливается topLevel в значение true,
   *  в дальнейшем этот флаг можно обновлять в true для более низких уровней 
   *  (ограничивать верхнюю видимость отделов)
   */
  level: number;
  type: DeptType;
  mainImg?: string;
}

export type DeptType = 'ROOT' | 'USER_OWNER' | 'SIMPLE' | 'UNDEF';
