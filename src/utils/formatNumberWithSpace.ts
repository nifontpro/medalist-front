export function formatNumberWithSpaces(number: number): string {
  return number.toLocaleString('ru-RU').replace(/,/g, ' ');
}
