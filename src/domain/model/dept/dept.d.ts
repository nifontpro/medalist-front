export interface Dept {
  id?: number;
  parentId: number;
  name: string;
  classname?: string;
  type: DeptType;
  mainImg?: string;
}

export type DeptType = 'ROOT' | 'USER_OWNER' | 'SIMPLE' | 'UNDEF';
