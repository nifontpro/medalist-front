import { StatisticProps } from './Statistic.props';

const Statistic = ({ id }: StatisticProps) => {
  return (
    <div>
      Статистика отдела {id}
    </div>
  );
};

export default Statistic;
