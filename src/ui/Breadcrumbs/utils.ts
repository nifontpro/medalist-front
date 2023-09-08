export const convertString = (input: string): string => {
  const [segment1, segment2] = input.split(' ');
  return `${segment1}/${segment2}`;
};

export const checkSegments = (segment: string): string => {
  if (segment === 'awards') {
    return 'Награды';
  }
  if (segment === 'users') {
    return 'Сотрудники';
  }
  if (segment === 'statistics') {
    return 'Статистика';
  }
  if (segment === 'reports') {
    return 'Дашборд';
  }
  if (segment.split(' ').length >= 1) {
    return `Отдел ${segment.split(' ')[1]}`;
  }
  return segment;
};
