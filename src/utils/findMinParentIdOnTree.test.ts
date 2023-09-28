import { Dept, DeptType } from '@/types/dept/dept';
import { findMinParentIdOnTree } from './findMinParentIdOnTree';

const type: DeptType = 'SIMPLE';

describe('findMinParentIdOnTree', () => {
  test('should return 0 if departments array is empty', () => {
    const result = findMinParentIdOnTree([]);
    expect(result).toBe(0);
  });

  test('should return 0 if all departments have null parentId', () => {
    const departments: Dept[] = [
      {
        parentId: 0,
        name: 'name',
        topLevel: false,
        type,
      },
      {
        parentId: 0,
        name: 'name',
        topLevel: false,
        type,
      },
      {
        parentId: 0,
        name: 'name',
        topLevel: false,
        type,
      },
    ];
    const result = findMinParentIdOnTree(departments);
    expect(result).toBe(0);
  });

  test('should return the index of the department with the smallest parentId', () => {
    const departments = [
      {
        parentId: 2,
        name: 'name',
        topLevel: false,
        type,
      },
      {
        parentId: 4,
        name: 'name',
        topLevel: false,
        type,
      },
      {
        parentId: 1,
        name: 'name',
        topLevel: false,
        type,
      },
      {
        parentId: 3,
        name: 'name',
        topLevel: false,
        type,
      },
    ];
    const result = findMinParentIdOnTree(departments);
    expect(result).toBe(2);
  });

  test('should return the index of the first department with the smallest parentId if multiple departments have the same parentId', () => {
    const departments = [
      {
        parentId: 4,
        name: 'name',
        topLevel: false,
        type,
      },
      {
        parentId: 1,
        name: 'name',
        topLevel: false,
        type,
      },
      {
        parentId: 7,
        name: 'name',
        topLevel: false,
        type,
      },
      {
        parentId: 10,
        name: 'name',
        topLevel: false,
        type,
      },
    ];
    const result = findMinParentIdOnTree(departments);
    expect(result).toBe(1);
  });
});
