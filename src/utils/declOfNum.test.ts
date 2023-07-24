import { declOfNum } from './declOfNum';

describe('declOfNum', () => {
  test('Проверка на корректность возвращяемого значения', () => {
    const titles: [string, string, string] = ['день', 'дня', 'дней'];

    expect(declOfNum(0, titles)).toBe('дней');
    expect(declOfNum(1, titles)).toBe('день');
    expect(declOfNum(2, titles)).toBe('дня');
    expect(declOfNum(3, titles)).toBe('дня');
    expect(declOfNum(4, titles)).toBe('дня');
    expect(declOfNum(5, titles)).toBe('дней');
    expect(declOfNum(10, titles)).toBe('дней');
    expect(declOfNum(11, titles)).toBe('дней');
    expect(declOfNum(12, titles)).toBe('дней');
    expect(declOfNum(20, titles)).toBe('дней');
    expect(declOfNum(21, titles)).toBe('день');
    expect(declOfNum(22, titles)).toBe('дня');
    expect(declOfNum(25, titles)).toBe('дней');
    expect(declOfNum(100, titles)).toBe('дней');
    expect(declOfNum(101, titles)).toBe('день');
    expect(declOfNum(102, titles)).toBe('дня');
    expect(declOfNum(105, titles)).toBe('дней');
  });
});
