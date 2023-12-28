import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../renderer/App.css';
import mainMenu from '../TSM-img/main_menu.svg';
import backButton from '../TSM-img/back_button.svg';
import Footer from '../utility/Footer';
import Difficulty from '../components/simulation-components/Difficulty';
import SelectMap from '../components/simulation-components/SelectMap';
import SelectStudent from '../components/simulation-components/SelectStudent';
import Verify from '../components/simulation-components/Verify';
import Weather from '../components/simulation-components/Weather';
import data from '../data.json';

export default function Simulation() {
  const [activeMenuItem, setActiveMenuItem] = useState('SELECT STUDENT');

  const menuItemArray = data.simulationMenuItemArray;

  const handleMenuItemClick = (name) => {
    setActiveMenuItem(name);
  };

  return (
    <div
      className="simulation_main_class"
      style={{ backgroundImage: `url(${mainMenu})` }}
    >
      <div className="side_bar">
        <NavLink className="navigation_button" to="/">
          <span id="first_span_navigation_button">
            <img src={backButton} alt="back" /> SIMULATION /
          </span>
          <span id="second_span_navigation_button">SETTINGS</span>
        </NavLink>
        <div className="menu_side_bar">
          {menuItemArray.map((data, index) => {
            return (
              <div
                key={index}
                className={`menu_side_bar_items underline ${
                  activeMenuItem === data.name ? 'active' : ''
                }`}
                onClick={() => handleMenuItemClick(data.name)}
                style={{
                  fontSize: activeMenuItem === data.name ? '2rem' : '1.8rem',
                  fontWeight: activeMenuItem === data.name ? '600' : '500',
                  color: activeMenuItem === data.name ? '#ffffff' : '#8E959E',
                  transition: 'all 0.1s ease-in-out',
                }}
              >
                {data.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className="simulation_sections">
        {activeMenuItem === 'SELECT STUDENT' ? (
          <SelectStudent />
        ) : activeMenuItem === 'SELECT MAP' ? (
          <SelectMap />
        ) : activeMenuItem === 'WEATHER' ? (
          <Weather />
        ) : activeMenuItem === 'DIFFICULTY' ? (
          <Difficulty />
        ) : activeMenuItem === 'VERIFY' ? (
          <Verify />
        ) : (
          'PAGE NOT FOUND!'
        )}
      </div>
      <Footer />
    </div>
  );
}
