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
  type: DeptType;
  mainImg?: string;
}

export type DeptType = 'ROOT' | 'USER_OWNER' | 'SIMPLE' | 'UNDEF';
