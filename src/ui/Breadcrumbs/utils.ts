import { Dept } from '@/types/dept/dept';

export const convertString = (input: string): string => {
  const [segment1, segment2] = input.split(' ');
  return `${segment1}/${segment2}`;
};

export const checkSegments = (segment: string, tree: Dept[] | null): string => {
  if (segment === 'awards') {
    return 'Награды';
  }
  if (segment === 'users') {
    return 'Сотрудники';
  }
  if (segment === 'statistics') {
    return 'Статистика';
  }
  if (segment === 'edit') {
    return 'Редактирование';
  }
  if (segment === 'information') {
    return 'Информация';
  }
  if (segment === 'activity') {
    return 'Активность';
  }
  if (segment.split(' ').length >= 1) {
    // return `Отдел ${segment.split(' ')[1]}`; // Выводит только id, удалить в будущем
    //Ниже код для того чтобы в хлебных крошках выводилось название отдела, а не его id
    if (tree !== null) {
      let result = tree.find(
        (item) => item.id == Number(segment.split(' ')[1])
      );
      if (result) {
        localStorage.setItem('TreeName', result.name);
        return `${result.name}`;
      }
    }
    //___________________
  }
  return segment;
};
