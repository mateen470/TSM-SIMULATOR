import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import mainMenu from '../../TSM-img/main_menu.svg';
import backButton from '../../TSM-img/back_button.svg';
import DropDown from '../../utility/DropDown';
import Increment from '../../TSM-img/increment.svg';
import Decrement from '../../TSM-img/decrement.svg';
import SelectObjectCarousel from '../../utility/SelectObjectCarousel';
import GridCanvas from './GridCanvas';

export default function CreateMap() {
  const [mapArea, setMapArea] = useState(50);
  const [apfsds, setApfsds] = useState(0);
  const [he, setHe] = useState(0);
  const [heat, setHeat] = useState(0);
  const [mg762, setMg762] = useState(0);

  const options = ['Option 1', 'Option 2', 'Option 3'];
  const options1 = ['Option 4', 'Option 5', 'Option 6'];
  const [exerciseTime, setExerciseTime] = useState(options[0]);
  const [terrain, setTerrain] = useState(options1[0]);

  const initialAmmoTitleArray = [
    'AMMO TYPE :',
    'APFSDS',
    'HE',
    'HEAT',
    '7.62 (MG)',
  ];

  const inputArray = ['INITIAL QTY. :', apfsds, he, heat, mg762];

  const handleExerciseTime = (option) => {
    setExerciseTime(option);
  };
  const handleTerrain = (option) => {
    setTerrain(option);
  };

  const handleIncrement = (inputNumber) => {
    if (inputNumber === 1) setApfsds(apfsds + 1);
    else if (inputNumber === 2) setHe(he + 1);
    else if (inputNumber === 3) setHeat(heat + 1);
    else if (inputNumber === 4) setMg762(mg762 + 1);
  };

  const handleDecrement = (inputNumber) => {
    if (inputNumber === 1) setApfsds(apfsds - 1);
    else if (inputNumber === 2) setHe(he - 1);
    else if (inputNumber === 3) setHeat(heat - 1);
    else if (inputNumber === 4) setMg762(mg762 - 1);
  };

  const handleInputChange = (index, newValue) => {
    newValue = Number(newValue);
    switch (index) {
      case 1:
        setApfsds(newValue);
        break;
      case 2:
        setHe(newValue);
        break;
      case 3:
        setHeat(newValue);
        break;
      case 4:
        setMg762(newValue);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="create_map_main_class"
      style={{ backgroundImage: `url(${mainMenu})` }}
    >
      <NavLink className="navigation_button_create_map" to="/simulation">
        <span id="first_span_navigation_button">
          <img src={backButton} alt="back" /> CREATE MAP /
        </span>
        <span id="second_span_navigation_button">CREATE MAP</span>
      </NavLink>

      <div className="create_map_grid_container">
        <div className="create_map_grid_objects_info"></div>
        <div className="create_map_grid">
          <GridCanvas />
        </div>
      </div>

      <div className="parameters_create_map_main_container">
        <div className="parameter_create_map_content_section">
          <div className="parameter_heading_create_map">PARAMETERS</div>

          <div className="map_area_main_class">
            <span>MAP AREA</span>
            <div className="progress_bar_and_value_main_container">
              <div className="progress_bar_container">
                <div
                  className="progress_bar"
                  style={{ width: `${mapArea}%` }}
                ></div>
              </div>
              <div className="progress_bar_value_box">
                <input
                  type="number"
                  value={mapArea}
                  onChange={(e) => setMapArea(e.target.value)}
                />
                sq/m
              </div>
            </div>
          </div>

          <div className="select_exercise_time_dropdown" style={{ zIndex: 3 }}>
            <span>EXERCISE TIME</span>
            <DropDown
              options={options}
              selected={exerciseTime}
              onOptionSelect={handleExerciseTime}
            />
          </div>
          <div className="select_terrain_dropdown" style={{ zIndex: 2 }}>
            <span>SELECT TERRAIN</span>
            <DropDown
              options={options1}
              selected={terrain}
              onOptionSelect={handleTerrain}
            />
          </div>

          <div className="initial_ammo_main_container">
            <div className="initial_ammo_heading">INITIAL AMMO</div>
            <div className="initial_ammo_main_content_container">
              <div className="initial_ammo_title">
                {initialAmmoTitleArray.map((value, index) => {
                  return (
                    <div
                      key={index}
                      style={{ fontWeight: index === 0 ? 700 : 600 }}
                    >
                      {value}
                    </div>
                  );
                })}
              </div>
              <div className="initial_ammo_values">
                {inputArray.map((value, index) =>
                  index === 0 ? (
                    <div
                      key={index}
                      className="initial_ammo_value_first_heading"
                    >
                      {value}
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="initial_ammo_decrement_increment"
                    >
                      <div className="initia_ammo_increment_decrement_content">
                        <input
                          type="number"
                          value={value}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                        />
                        <div className="buttons_increment_decrement">
                          <button onClick={() => handleIncrement(index)}>
                            <img alt="decrement" src={Decrement} />
                          </button>
                          <button onClick={() => handleDecrement(index)}>
                            <img alt="increment" src={Increment} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="select_objects_main_container">
          <div className="select_enemy">
            <SelectObjectCarousel carouselObjectType={1} />
          </div>
          <div className="select_enemy_object">
            <SelectObjectCarousel carouselObjectType={2} />
          </div>
          <div className="select_buildings">
            <SelectObjectCarousel carouselObjectType={3} />
          </div>
          <div className="select_natural_objects">
            <SelectObjectCarousel carouselObjectType={4} />
          </div>
        </div>
      </div>
    </div>
  );
}
