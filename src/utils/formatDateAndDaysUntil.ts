import dayjs from 'dayjs';
import 'dayjs/locale/ru'; // импортируем русский язык
dayjs.locale('ru'); // используем русский язык

export const formatDateAndDaysUntil = (timestamp: number) => {
  // Конвертируем таймстемп в дату
  const eventDate = dayjs(timestamp);
  // Форматируем дату в строку "10 октября"
  const formattedBirthDate = eventDate.format('D MMMM');

  // Находим текущую дату
  const now = dayjs();

  // Устанавливаем событие на этот же день и месяц в текущем году
  let nextEventDate = eventDate.set('year', now.year());
  // Если событие уже прошло в этом году, устанавливаем его на следующий год
  if (now.isAfter(nextEventDate)) {
    nextEventDate = nextEventDate.add(1, 'year');
  }

  // Находим разницу в днях до следующего повторения события
  const daysUntil = nextEventDate.diff(now, 'day');

  //   `${formattedDate}, через ${daysUntil} дней`

  return { formattedBirthDate, daysUntil: Math.max(daysUntil, 0) };
};
