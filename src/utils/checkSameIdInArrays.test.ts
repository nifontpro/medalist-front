import { checkSameIdInArrays } from './checkSameIdInArrays';

describe('checkSameIdInArrays', () => {
  test('Вернет false если arr1 = undefined', () => {
    const arr1 = undefined;
    const arr2 = [{ id: 1 }, { id: 2 }];

    const result = checkSameIdInArrays(arr1, arr2);

    expect(result).toBe(false);
  });

  test('Вернет false если arr2 = undefined', () => {
    const arr1 = [{ id: 1 }, { id: 2 }];
    const arr2 = undefined;

    const result = checkSameIdInArrays(arr1, arr2);

    expect(result).toBe(false);
  });

  test('Вернет false если оба массива = undefined', () => {
    const arr1 = undefined;
    const arr2 = undefined;

    const result = checkSameIdInArrays(arr1, arr2);

    expect(result).toBe(false);
  });

  test('Вернет false если arr1 и arr2 имеют разные ids', () => {
    const arr1 = [{ id: 1 }, { id: 2 }];
    const arr2 = [{ id: 3 }, { id: 4 }];

    const result = checkSameIdInArrays(arr1, arr2);

    expect(result).toBe(false);
  });

  test('Вернет true если arr1 и arr2 имеют общий id', () => {
    const arr1 = [{ id: 1 }, { id: 2 }];
    const arr2 = [{ id: 2 }, { id: 3 }];

    const result = checkSameIdInArrays(arr1, arr2);

    expect(result).toBe(true);
  });
});
