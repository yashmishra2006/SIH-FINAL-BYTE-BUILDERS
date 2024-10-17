// LineChartComponent.js
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the components you need
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartComponent = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Tickets Sold',
        data: [400, 450, 300, 500, 600, 700, 800, 850, 900, 950, 1000, 1100], // Example data
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2, // Adjust the border width to make the line thinner
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Allow the chart to resize based on the container's size
    scales: {
      x: {
        type: 'category',
        ticks: {
          maxTicksLimit: 6, // Limit the number of ticks to make it more compact
          font: {
            size: 10, // Adjust font size for the x-axis
          },
        },
      },
      y: {
        type: 'linear',
        beginAtZero: true,
        ticks: {
          font: {
            size: 10, // Adjust font size for the y-axis
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 10, // Adjust the size of the legend box
          font: {
            size: 10, // Adjust font size for legend
          },
        },
      },
      title: {
        display: false, // Hide the title to save space
      },
      tooltip: {
        bodyFont: {
          size: 10, // Adjust font size for tooltips
        },
      },
    },
    layout: {
      padding: {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5,
      },
    },
  };

  return (
    <div style={{ width: '60%', height: '300px' }}> {/* Set the height to make it more compact */}
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartComponent;
