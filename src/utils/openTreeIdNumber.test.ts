import { cookieOnStringArray, openTreeOnIdNumber } from './openTreeIdNumber';

describe('cookieOnStringArray', () => {
  test('Должен вернуть массив [1] если node = falsy или true', () => {
    expect(cookieOnStringArray(undefined)).toEqual(['1']);
    expect(cookieOnStringArray(null)).toEqual(['1']);
    expect(cookieOnStringArray(true)).toEqual(['1']);
  });

  test('Должен вернуть массив строк с элементами node', () => {
    expect(cookieOnStringArray('["1","2","3"]')).toEqual(['1', '2', '3']);
    expect(cookieOnStringArray('["a","b","c"]')).toEqual(['a', 'b', 'c']);
  });

  test('Должен удалить все лишние ковычки и опострафы в  node', () => {
    expect(cookieOnStringArray('[["1","2","3"]]')).toEqual(['1', '2', '3']);
    expect(cookieOnStringArray('[["a","b","c"]]')).toEqual(['a', 'b', 'c']);
  });
});
test;

describe('openTreeOnIdNumber', () => {
  test('should return an array with the number 1 if pathName is null', () => {
    const result = openTreeOnIdNumber(null);
    expect(result).toEqual(['1']);
  });

  test('Должен вернуть массив с числами от 1 до заданного id числа', () => {
    const result = openTreeOnIdNumber('path/1/2/3');
    expect(result).toEqual(['1', '2', '3']);
  });

  test('Должен вернуть массив с числами от 1 до заданного id числа, когда pathName число', () => {
    const result = openTreeOnIdNumber('path/5');
    expect(result).toEqual(['1', '2', '3', '4', '5']);
  });

  //   test('Должен вернуть пустой массив если numberId = 0', () => {
  //     const result = openTreeOnIdNumber('path/0');
  //     expect(result).toEqual(['-1']);
  //   });

  //   test('Должен вернуть пустой массив если numberId не число', () => {
  //     const result = openTreeOnIdNumber('path/abc');
  //     expect(result).toEqual([]);
  //   });
});
