import React from 'react';
import '../../renderer/App.css';

export default function Status() {
  const studentStatus = [
    {
      title: 'STUDENT STATUS',
      'Total Enemies': 7,
      'Total Hits': 9,
      'Damage Taken': 9,
    },
  ];
  const simulationStatus = [
    {
      title: 'SIMULATION STATUS',
      'Elapsed Time': '00:23',
      'Time Left': '00:30',
      'Total Time': '00:53',
    },
  ];
  const ammoStatus = [
    {
      title: 'AMMO STATUS',
      Total: 1000,
      Fired: 300,
      Balancer: 100,
      'Total MG': 25,
      'MG Fired': 25,
      'MG Balancer': 50,
    },
  ];

  const allStatus = [studentStatus, simulationStatus, ammoStatus];

  return (
    <div className="status_main_class">
      <div className="status_main_heading">STATUS</div>
      {allStatus.map((statusArray, index) => (
        <div key={index} className="status_box">
          <div className="status_title">{statusArray[0].title}</div>
          {Object.entries(statusArray[0]).map(([key, value]) => {
            if (key !== 'title') {
              return (
                <div key={key} className="status_item">
                  <strong>{key}:</strong>
                  <p> {value}</p>
                </div>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
}
