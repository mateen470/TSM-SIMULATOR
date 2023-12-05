import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';

// Registering ChartJS components and the zoom plugin
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);






const LineChart = () => {
  // Data for the chart
  const data = {
    labels: [/* Your labels here */],
    datasets: [
      {
        label: 'Your Dataset',
        data: [/* Your data here */],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };
  

  // Chart options
  const options = {
    scales: {
      x: {
        grid: {
          display: true, // Enables horizontal grid lines
          color: 'white', // Adjust the color and opacity of grid lines
        },
      },
      y: {
        grid: {
          display: true, // Enables vertical grid lines
          color: 'white', // Adjust the color and opacity of grid lines
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
        pan: {
          enabled: true,
          mode: 'xy',
        },
      },
    },
  };
  

  return <Line data={data} options={options} />;
};

export default LineChart;
