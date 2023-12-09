import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/ru';
dayjs.locale('ru');
dayjs.extend(duration);

export const calculateWorkExperience = (startDateTimestamp: number) => {
  const startDate = dayjs(startDateTimestamp);
  const now = dayjs();
  const workDuration = dayjs.duration(now.diff(startDate));

  // Вычисляем полные года, месяцы и дни
  let years = now.diff(startDate, 'year');
  let months = now.diff(startDate.add(years, 'year'), 'month');
  let days = now.diff(startDate.add(years, 'year').add(months, 'month'), 'day');

  // Для вычисления дней до следующего года стажа
  const nextYearDate = startDate.add(years + 1, 'year');
  const daysUntilNextYear = nextYearDate.diff(now, 'day');

  // Форматируем строку с учетом склонения слов
  const yearsWord =
    years === 1 ? 'год' : years > 1 && years < 5 ? 'года' : 'лет';
  const monthsWord =
    months === 1 ? 'месяц' : months > 1 && months < 5 ? 'месяца' : 'месяцев';
  const daysWord = days === 1 ? 'день' : days > 1 && days < 5 ? 'дня' : 'дней';

  const experience = `${years} ${yearsWord} ${months} ${monthsWord} и ${days} ${daysWord}`;
  const nextAnniversaryString = `${years + 1} ${
    years > 0 ? 'лет' : 'год'
  } через ${daysUntilNextYear} дней`;

  // `${experience}, ${nextAnniversaryString}`
  return { experience, nextAnniversaryString, years, daysUntilNextYear };
};
