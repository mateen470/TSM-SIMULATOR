import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../renderer/App.css';
import mainMenu from '../TSM-img/main_menu.svg';
import backButton from '../TSM-img/back_button.svg';
import Footer from '../utility/Footer';
import data from '../data.json';

export default function TestMode() {
  const [active, setActive] = useState(false);

  const trainingArray = data.trainingArray;
  const recentArray = data.recentArray;

  const trainingStyle = {
    opacity: !active ? 1 : 0,
    height: active && '0px',
    overflow: 'hidden',
    transition: 'opacity 0.4s ease-in-out',
  };
  const recentStyle = {
    opacity: active ? 1 : 0,
    height: !active && '0px',
    overflow: 'hidden',
    transition: 'opacity 0.4s ease-in-out',
  };

  return (
    <div
      className="test_mode_main_class"
      style={{ backgroundImage: `url(${mainMenu})` }}
    >
      <NavLink className="navigation_button_with_bigger_width_3" to="/">
        <span id="first_span_navigation_button">
          <img src={backButton} alt="back" /> MAIN MENU /
        </span>
        <span id="second_span_navigation_button">
          TEST MODE AND DIAGNOSTICS
        </span>
      </NavLink>
      <div className="test_mode_main_content_container">
        <div className="test_mode_tab_heading__box">
          <div
            onClick={() => setActive(false)}
            style={{
              cursor: 'pointer',
              color: !active ? 'white' : '#9fa4a9',
              fontWeight: !active ? 700 : 600,
              fontSize: !active ? '1.5rem' : '1.4rem',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            SOFTWARE
          </div>
          <div
            onClick={() => setActive(true)}
            style={{
              cursor: 'pointer',
              color: active ? 'white' : '#9fa4a9',
              fontWeight: active ? 700 : 600,
              fontSize: active ? '1.5rem' : '1.4rem',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            HARDWARE
          </div>
        </div>

        <div className="test_mode_tab_table">
          <div className="test_mode_tab_table_heading_container">
            <div className="test_mode_tab_table_name_heading">NAME</div>
            <div className="test_mode_tab_table_name_heading">STATUS</div>
          </div>

          <div style={trainingStyle}>
            {trainingArray.map((data, index) => {
              return (
                <div className="test_mode_tab_table_data_container" key={index}>
                  <div className="test_mode_tab_table_data">{data.name}</div>
                  <div
                    className="test_mode_tab_table_data"
                    style={{
                      color:
                        data.status === 'Operational' ||
                        data.status === 'operational' ||
                        data.status === 'OPERATIONAL'
                          ? '#1AD336'
                          : data.status === 'down' ||
                            data.status === 'Down' ||
                            data.status === 'DOWN'
                          ? '#BF1413'
                          : '#FAFF1B',
                    }}
                  >
                    {data.status}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={recentStyle}>
            {recentArray.map((data, index) => {
              return (
                <div className="test_mode_tab_table_data_container" key={index}>
                  <div className="test_mode_tab_table_data">{data.name}</div>
                  <div
                    className="test_mode_tab_table_data"
                    style={{
                      color:
                        data.status === 'Operational' ||
                        data.status === 'operational' ||
                        data.status === 'OPERATIONAL'
                          ? '#1AD336'
                          : data.status === 'down' ||
                            data.status === 'Down' ||
                            data.status === 'DOWN'
                          ? '#BF1413'
                          : '#FAFF1B',
                    }}
                  >
                    {data.status}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
