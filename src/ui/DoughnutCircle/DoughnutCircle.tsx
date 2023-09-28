import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { DoughnutCircleProps } from './DoughnutCircle.props';
import { useWindowSize } from '@/hooks/useWindowSize';
import { memo } from 'react';

const DoughnutCircle = ({
  dataOne,
  dataTwo,
  colorOne,
  colorTwo,
  className,
  ...props
}: DoughnutCircleProps): JSX.Element => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const { windowSize } = useWindowSize();

  const options = {
    responsive: true,
    plugins: {
      legend: {},
    },
  };

  const data = {
    datasets: [
      {
        data: [dataOne, dataTwo],
        backgroundColor: [`${colorOne}`, `${colorTwo}`],
        borderColor: [`${colorOne}`, `${colorTwo}`],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      className={className}
      style={{
        height: windowSize.winWidth < 768 ? '100%' : '',
        width: windowSize.winWidth < 768 ? windowSize.winWidth - 80 : '',
      }}
      {...props}
    >
      <Doughnut options={options} data={data} />
    </div>
  );
};
export default memo(DoughnutCircle);
