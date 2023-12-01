import { NavLink } from 'react-router-dom';
import '../renderer/App.css';
import mainMenu from '../TSM-img/main_menu.svg';

export default function Simulation() {
  const menuItemArray = [
    { name: 'SELECT STUDENT' },
    { name: 'SELECT MAP' },
    { name: 'WEATHER' },
    { name: 'DIFFICULTY' },
    { name: 'VERIFY' },
  ];

  return (
    <div
      className="simulation_main_class"
      style={{ backgroundImage: `url(${mainMenu})` }}
    >
      <div className="side_bar">
        <NavLink className="navigation_button" to="/">
          <span id="first_span_navigation_button" className="underline">
            {' '}
            SIMULATION /
          </span>
          <span id="second_span_navigation_button" className="underline">
            {' '}
            SETTINGS
          </span>
        </NavLink>
        <div className="menu_side_bar">
          {menuItemArray.map((data, index) => {
            return (
              <div key={index} className="menu_side_bar_items underline">
                {data.name}
              </div>
            );
          })}
        </div>
        <div className="simulation_footer">
          <div className="simulation_footer_first_box">
            <span className="underline">BACK</span>
            <span className="underline">HELP</span>
          </div>
          <div className="simulation_footer_second_box">
            <span className="underline">TUTORIALS</span>
            <div id="simulation_footer_second_box_second_span">
              <span className="underline">CONTINUE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
