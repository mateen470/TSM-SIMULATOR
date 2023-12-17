import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function ReportGraph({
  hitOnMoviongTank,
  hitOnMovingAPCs,
  hitOnStaticAPCs,
  hitOnStaticTanks,
  hitOnSoliders,
}) {
  const data = {
    labels: [
      'Moving Tanks',
      'Moving APCs',
      'Static Tank',
      'Static APCs',
      'Soliders',
    ],
    datasets: [
      {
        label: 'Sample Dataset',
        data: [
          hitOnMoviongTank,
          hitOnMovingAPCs,
          hitOnStaticTanks,
          hitOnStaticAPCs,
          hitOnSoliders,
        ],
        backgroundColor: 'black',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        grid: {
          display: true,
          drawBorder: false,
        },
        ticks: {
          beginAtZero: true,
          font: {
            size: 15,
            weight: 'bold',
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 15,
            weight: 'bold',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '380px', height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
}
