import '../renderer/App.css';
import { NavLink } from 'react-router-dom';
import mainMenu from './TSM-img/main_menu.svg';

export default function MainMenu() {
  const buttonArray = [
    {
      name: 'TEST MODE',
      link: '/',
    },
    {
      name: 'TUTORIALS',
      link: '/',
    },
    {
      name: 'START SIMULATION',
      link: '/',
    },
    {
      name: 'ADD INTSRUCTORS ',
      link: '/',
    },
    {
      name: 'ADD STUDENTS ',
      link: '/',
    },
    {
      name: 'PAST SIMULATIONS',
      link: '/',
    },
  ];

  return (
    <div
      className=" mainMenu_main_class"
      style={{ backgroundImage: `url(${mainMenu})` }}
    >
      <div className="main_content">
        <div className="content_first_half">
          <div className="content_first_half_main_heading">
            <p>Good afternoon.</p>
            <span>TSM II</span>
            <span>SIMULATOR</span>
          </div>
        </div>
        <div className="content_second_half">
          <NavLink to="/">Home</NavLink>
          <div className="button_slider">
            {buttonArray.map((data) => {
              return (
                <NavLink to={data.link} className="button_slider_button">
                  <span>{data.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
