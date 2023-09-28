import { convertCorrectDataForUnix } from './convertCorrectDataForUnix';

describe('convertCorrectDataForUnix', () => {
  test('Форматирование из даты DD.MM.YYYY в дату YYYY.MM.DD', () => {
    const input = '05.06.2021';
    const expectedOutput = '2021.06.05';

    const result = convertCorrectDataForUnix(input);

    expect(result).toEqual(expectedOutput);
  });

  test('Форматирование из даты DD.MM.YYYY в дату YYYY.MM.DD', () => {
    const input = '29.12.2024';
    const expectedOutput = '2024.12.29';

    const result = convertCorrectDataForUnix(input);

    expect(result).toEqual(expectedOutput);
  });

  test('Форматирование из даты DD.MM.YYYY в дату YYYY.MM.DD', () => {
    const input = '01.02.2023';
    const expectedOutput = '2023.02.01';

    const result = convertCorrectDataForUnix(input);

    expect(result).toEqual(expectedOutput);
  });
});
