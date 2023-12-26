import { useState } from 'react';
import '../../renderer/App.css';

export default function AdjustSimulation() {
  const [ammoType, setAmmoType] = useState('');

  const adjustSimulation = [
    { title: 'AZIMUTH CALLIBRATION' },
    { title: 'BORE SIGHTING' },
  ];
  const faults = [
    { title: 'FCC FAILURE' },
    { title: 'JOYSTICK FAILURE' },
    { title: 'LASER FAILURE' },
  ];
  const ammo = [
    { title: 'APFSDS' },
    { title: 'HEAT' },
    { title: 'HESH' },
    { title: '7.62' },
  ];

  return (
    <div className="adjust_simulation_main_class">
      <div className="adjust_simulation_box">
        <div className="adjust_simulation_box_heading">ADJUST SIMULATION</div>
        <div className="adjust_simulation_box_content">
          {adjustSimulation.map((data, index) => {
            return (
              <div
                className="adjust_simulation_box_content_category"
                key={index}
              >
                {data.title}
              </div>
            );
          })}
        </div>
      </div>

      <div className="faults_box">
        <div className="faults_box_heading">FAULTS</div>
        <div className="faults_box_content">
          {faults.map((data, index) => {
            return (
              <div className="faults_box_content_category" key={index}>
                {data.title}
              </div>
            );
          })}
        </div>
      </div>

      <div className="ammo_box">
        <div className="ammo_box_heading">CHANGE AMMO</div>
        <div className="ammo_box_content">
          {ammo.map((data, index) => {
            return (
              <div
                className="ammo_box_ammo"
                key={index}
                style={{
                  borderTopLeftRadius: index === 0 ? '10px' : '0px',
                  borderBottomLeftRadius: index === 0 ? '10px' : '0px',
                  borderTopRightRadius: index === 3 ? '10px' : '0px',
                  borderBottomRightRadius: index === 3 ? '10px' : '0px',
                  backdropFilter:
                    data.title === ammoType ? 'blur(10px)' : 'none',
                }}
                onClick={() => setAmmoType(data.title)}
              >
                {data.title}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
