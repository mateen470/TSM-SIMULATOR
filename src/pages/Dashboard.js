import { useState } from 'react';
import AdjustSimulation from '../components/dashboard/AdjustSimulation';
import Control from '../components/dashboard/Control';
import FireControl from '../components/dashboard/FireControl';
import Status from '../components/dashboard/Status';
import GridCanvas from '../components/simulation-components/GridCanvas';
import '../renderer/App.css';
import mainMenu from '../TSM-img/main_menu.svg';
import dropDown from '../TSM-img/dropDown.svg';

export default function Dashboard() {
  const [toggleStatus, setToggleStatus] = useState(false);

  return (
    <div
      className="dashboard_main_class"
      style={{ backgroundImage: `url(${mainMenu})` }}
    >
      <div>
        <FireControl />
      </div>

      <div className="grid_dashboard">
        <GridCanvas stylingBox={2} />
      </div>

      <div className="adjust_simulation_main_container">
        <AdjustSimulation />
      </div>

      <div className="control_main_container">
        <Control />
      </div>

      <div
        className="status_main_container"
        style={{ right: toggleStatus ? '0px' : '-470px' }}
      >
        <div
          className="status_toggle_btn"
          onClick={() => setToggleStatus(!toggleStatus)}
          style={{ rotate: !toggleStatus ? '90deg' : '-90deg' }}
        >
          <img src={dropDown} alt="arrow" />
        </div>
        <Status />
      </div>
    </div>
  );
}
