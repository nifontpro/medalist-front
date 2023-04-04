import { IDept } from '@/app/_model/dept/dept';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ name: 'hello' });
}

export const deptData: IDept[] = [
  // Корень
  { id: 1, parent_id: 0, name: 'ROOT', code: 'R' },

  // Уровень владельцев
  { id: 2, parent_id: 1, name: 'Denis', code: 'O' },
  { id: 3, parent_id: 1, name: 'Test', code: 'O' },

  // Компании Дениса
  { id: 4, parent_id: 2, name: 'Нектарин', code: 'D' },
  { id: 5, parent_id: 2, name: 'Медиа Сервис', code: 'D' },

  // Отделы Нектарин
  { id: 6, parent_id: 4, name: 'Маркетинг', code: 'D' },
  { id: 7, parent_id: 4, name: 'Продажи', code: 'D' },
  { id: 8, parent_id: 4, name: 'Программирование', code: 'D' },

  // Подотделы программирования
  { id: 9, parent_id: 8, name: 'Бэкенд', code: 'D' },
  { id: 10, parent_id: 8, name: 'Фронтенд', code: 'D' },
  { id: 11, parent_id: 8, name: 'Тестирование', code: 'D' },
  { id: 12, parent_id: 8, name: 'DevOps', code: 'D' },

  // Подотделы DevOps
  { id: 13, parent_id: 12, name: 'Dev', code: 'D' },
  { id: 14, parent_id: 12, name: 'Ops', code: 'D' },

  // Отделы Медиа Сервис
  { id: 15, parent_id: 5, name: 'Бухгалтерия', code: 'D' },
  { id: 16, parent_id: 5, name: 'Продажники', code: 'D' },
  { id: 17, parent_id: 5, name: 'Программирование', code: 'D' },

  // Подотделы программирования
  { id: 18, parent_id: 8, name: 'Бэкенд', code: 'D' },
  { id: 19, parent_id: 8, name: 'Фронтенд', code: 'D' },
  { id: 20, parent_id: 8, name: 'Дизайн', code: 'D' },
  { id: 21, parent_id: 8, name: 'DevOps', code: 'D' },

  // Подотделы DevOps
  { id: 22, parent_id: 12, name: 'Dev', code: 'D' },
  { id: 23, parent_id: 12, name: 'Ops', code: 'D' },
];
