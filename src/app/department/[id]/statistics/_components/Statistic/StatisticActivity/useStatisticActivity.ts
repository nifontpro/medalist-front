import { useActivity } from '@/activity/presenter/useActivity';
import { timeConverterMonth } from '@/core/utils/timeConverterMonths';
import { DateMonth } from './StatisticActivity.types';

export const useStatisticActivity = (yearActivity: string) => {
  let startDateProps = 0
  let endDateProps = 0

  if (yearActivity == '2022') {
    startDateProps = 1640995200000
    endDateProps = 1672531199000
  } else if (yearActivity == '2023') {
    startDateProps = 1672531200000
    endDateProps = 1704067199000
  }
  
  const { activity } = useActivity('', -1, startDateProps, endDateProps);

  let objNominees: DateMonth = {
    Январь: 0,
    Февраль: 0,
    Март: 0,
    Апрель: 0,
    Май: 0,
    Июнь: 0,
    Июль: 0,
    Август: 0,
    Сентябрь: 0,
    Октябрь: 0,
    Ноябрь: 0,
    Декабрь: 0,
  };
  let objAwards: DateMonth = {
    Январь: 0,
    Февраль: 0,
    Март: 0,
    Апрель: 0,
    Май: 0,
    Июнь: 0,
    Июль: 0,
    Август: 0,
    Сентябрь: 0,
    Октябрь: 0,
    Ноябрь: 0,
    Декабрь: 0,
  };

  // Выбираем по state связано это с номинацией или с наградой + сразу же преобразуем дату в корректный месяц
  activity?.forEach((item) => {
    if (
      item.state == 'AWARD_USER' ||
      item.state == 'DELETE_AWARD' ||
      item.state == 'DELETE_AWARD_USER'
    ) {
      if (timeConverterMonth(item.date) == 'Январь') {
        objAwards.Январь++;
      }
      if (timeConverterMonth(item.date) == 'Февраль') {
        objAwards.Февраль++;
      }
      if (timeConverterMonth(item.date) == 'Март') {
        objAwards.Март++;
      }
      if (timeConverterMonth(item.date) == 'Апрель') {
        objAwards.Апрель++;
      }
      if (timeConverterMonth(item.date) == 'Май') {
        objAwards.Май++;
      }
      if (timeConverterMonth(item.date) == 'Июнь') {
        objAwards.Июнь++;
      }
      if (timeConverterMonth(item.date) == 'Июль') {
        objAwards.Июль++;
      }
      if (timeConverterMonth(item.date) == 'Август') {
        objAwards.Август++;
      }
      if (timeConverterMonth(item.date) == 'Сентябрь') {
        objAwards.Сентябрь++;
      }
      if (timeConverterMonth(item.date) == 'Октябрь') {
        objAwards.Октябрь++;
      }
      if (timeConverterMonth(item.date) == 'Ноябрь') {
        objAwards.Ноябрь++;
      }
      if (timeConverterMonth(item.date) == 'Декабрь') {
        objAwards.Декабрь++;
      }
    }
    if (item.state == 'NOMINEE_USER') {
      if (timeConverterMonth(item.date) == 'Январь') {
        objNominees.Январь++;
      }
      if (timeConverterMonth(item.date) == 'Февраль') {
        objNominees.Февраль++;
      }
      if (timeConverterMonth(item.date) == 'Март') {
        objNominees.Март++;
      }
      if (timeConverterMonth(item.date) == 'Апрель') {
        objNominees.Апрель++;
      }
      if (timeConverterMonth(item.date) == 'Май') {
        objNominees.Май++;
      }
      if (timeConverterMonth(item.date) == 'Июнь') {
        objNominees.Июнь++;
      }
      if (timeConverterMonth(item.date) == 'Июль') {
        objNominees.Июль++;
      }
      if (timeConverterMonth(item.date) == 'Август') {
        objNominees.Август++;
      }
      if (timeConverterMonth(item.date) == 'Сентябрь') {
        objNominees.Сентябрь++;
      }
      if (timeConverterMonth(item.date) == 'Октябрь') {
        objNominees.Октябрь++;
      }
      if (timeConverterMonth(item.date) == 'Ноябрь') {
        objNominees.Ноябрь++;
      }
      if (timeConverterMonth(item.date) == 'Декабрь') {
        objNominees.Декабрь++;
      }
    }
  });

  return { objNominees, objAwards };
};
