import { VerticalBarChartProps } from './VerticalBarChart.props';
import cn from 'classnames';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useWindowSize } from '@/hooks/useWindowSize';

const VerticalBarChart = ({
  objNominees,
  objAwards,
  className,
  ...props
}: VerticalBarChartProps): JSX.Element => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const { windowSize } = useWindowSize();

  let alignPositionForLegend: 'start' | 'center' | 'end' | undefined = 'start';
  let indexAxis: 'y' | 'x' | undefined = windowSize.winWidth < 768 ? 'y' : 'x';
  let aspectRatio: number = windowSize.winWidth < 768 ? 0.75 : 2;

  const options = {
    indexAxis: indexAxis,
    responsive: true,
    aspectRatio: aspectRatio,
    plugins: {
      legend: {
        align: alignPositionForLegend,
        labels: {
          display: true,
          lineWidth: 100,
          color: 'rgba(16, 16, 16, 0.5)',
          font: {
            size: windowSize.winWidth < 768 ? 11 : 22,
          },
          usePointStyle: true,
          pointStyleWidth: windowSize.winWidth < 768 ? 16 : 32,
        },
      },
    },
  };

  const labels = Object.keys(objAwards);

  const data = {
    labels,
    datasets: [
      {
        label: 'Медали',
        data:
          windowSize.winWidth < 768
            ? Object.values(objNominees)
            : Object.values(objAwards),
        backgroundColor: '#E5F23B',
      },
      {
        label: 'Номинации',
        data:
          windowSize.winWidth < 768
            ? Object.values(objAwards)
            : Object.values(objNominees),
        backgroundColor: '#101010',
      },
    ],
  };

  return (
    <div
      className={cn(className)}
      style={{
        height: '100%',
        width:
          windowSize.winWidth < 768
            ? windowSize.winWidth - 100
            : windowSize.winWidth < 400
            ? windowSize.winWidth - 80
            : '100%',
      }}
      {...props}
    >
      <Bar data={data} options={options} />
    </div>
  );
};
export default VerticalBarChart;
