import { NavLink } from 'react-router-dom';
import '../../renderer/App.css';

export default function TopBar() {
  return (
    <div className="topBar_main_class">
      <div className="topBar_btn">RESTART</div>
      <div className="topBar_btn">RESPAWN</div>
      <div className="topBar_btn">PAUSE SIMULATION</div>
      <div className="topBar_btn">
        <NavLink to="/report">END SIMULATION</NavLink>
      </div>
    </div>
  );
}
