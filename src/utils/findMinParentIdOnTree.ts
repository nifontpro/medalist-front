import { Dept } from '@/domain/model/dept/dept';

export const findMinParentIdOnTree = (departments: Dept[]) => {
  let min: {
    index: null | number;
    parentId: null | number;
  } = {
    index: null,
    parentId: null,
  };
  departments.forEach((dept, index) => {
    if (min.index == null) {
      min.index = index;
      min.parentId = dept.parentId;
    } else if (min.parentId != null && dept.parentId < min.parentId) {
      min.index = index;
      min.parentId = dept.parentId;
    }
  });

  return min.index != null ? min.index : 0;
};
