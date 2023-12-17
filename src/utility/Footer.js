import { NavLink } from 'react-router-dom';
import '../renderer/App.css';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer_first_box">
        <NavLink className="underline" to="/report">
          BACK
        </NavLink>
        <NavLink className="underline" to="/help">
          HELP
        </NavLink>
      </div>
      <div className="footer_second_box">
        <NavLink className="underline" to="/tutorials">
          TUTORIALS
        </NavLink>
        <div id="footer_second_box_second_span">
          <span className="underline">CONTINUE</span>
        </div>
      </div>
    </div>
  );
}
