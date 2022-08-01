import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


interface Props {
    data: any;
    title: string;
}

const PieChart: React.FC<Props> = ({data, title}) => {

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: title,
          },
        },
      };

    return (
        <div className="chart-width">
            <Pie options={options} data={data} />
        </div>
    );
}

export default PieChart;