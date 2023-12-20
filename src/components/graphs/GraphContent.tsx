import { FC } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartOptions, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BACKGROUND_COLOR, BORDER_COLOR } from '../../utils/constants';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

interface IGraphProps {
  dataset: number[],
}

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: ['#005500', '#007700', '#119900', '#339900', '#669900', '#999900', '#CC9900', '#FF9900', '#FF6600', '#FF3300', '#FF0000'],
        font: {
          weight: '900',
        }
      }
    },
  }
};

const GraphContent: FC<IGraphProps> = ({ dataset }) => {
  const data = {
    labels: ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0'],
    datasets: [
      {
        label: '',
        data: dataset,
        backgroundColor: BACKGROUND_COLOR,
        borderColor: BORDER_COLOR,
      }
    ]
  };

  return (
    <Bar data={data} options={options} />
  )
};

export default GraphContent;