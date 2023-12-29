import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  setMapArea,
  setExerciseTime,
  setTerrain,
  setApfsds,
  setHe,
  setHeat,
  setMg762,
} from '../../redux/DataArray';
import mainMenu from '../../TSM-img/main_menu.svg';
import backButton from '../../TSM-img/back_button.svg';
import DropDown from '../../utility/DropDown';
import Increment from '../../TSM-img/increment.svg';
import Decrement from '../../TSM-img/decrement.svg';
import SelectObjectCarousel from '../../utility/SelectObjectCarousel';
import GridCanvas from './GridCanvas';
import data from '../../data.json';

export default function CreateMap() {
  const dispatch = useDispatch();
  const [mapArea, setMapAreas] = useState(50);
  const [apfsds, setApfsdsAmmo] = useState(0);
  const [he, setHeAmmo] = useState(0);
  const [heat, setHeatAmmo] = useState(0);
  const [mg762, setMg762Ammo] = useState(0);

  const options = data.dropDownOptionsOfExcersieTime;
  const options1 = data.dropDownOptionsOfSelectTerrain;
  const initialAmmosTitleArray = data.initialAmmoTitleArray;

  const [exerciseTime, setExerciseTimes] = useState(options[0]);
  const [terrain, setTerain] = useState(options1[0]);

  const inputArray = ['INITIAL QTY. :', apfsds, he, heat, mg762];

  const parameters = useSelector((state) => state.dataArray.parameters);
  const initialAmmo = useSelector((state) => state.dataArray.initialAmmo);
  const mapData = useSelector((state) => state.dataArray.mapData);

  const handleMapAreaChange = (event) => {
    const value = Number(event.target.value);
    setMapAreas(value);
    dispatch(setMapArea(value));
  };

  const handleExerciseTime = (option) => {
    setExerciseTimes(option);
    dispatch(setExerciseTime(option));
  };
  const handleTerrain = (option) => {
    setTerain(option);
    dispatch(setTerrain(option));
  };

  const handleIncrement = (inputNumber) => {
    if (inputNumber === 1) {
      const newValue = apfsds + 1;
      setApfsdsAmmo(newValue);
      dispatch(setApfsds(newValue));
    } else if (inputNumber === 2) {
      const newValue = he + 1;
      setHeAmmo(newValue);
      dispatch(setHe(newValue));
    } else if (inputNumber === 3) {
      const newValue = heat + 1;
      setHeatAmmo(newValue);
      dispatch(setHeat(newValue));
    } else if (inputNumber === 4) {
      const newValue = mg762 + 50;
      setMg762Ammo(newValue);
      dispatch(setMg762(newValue));
    }
  };

  const handleDecrement = (inputNumber) => {
    if (inputNumber === 1 && apfsds > 0) {
      const newValue = apfsds - 1;
      setApfsdsAmmo(newValue);
      dispatch(setApfsds(newValue));
    } else if (inputNumber === 2 && he > 0) {
      const newValue = he - 1;
      setHeAmmo(newValue);
      dispatch(setHe(newValue));
    } else if (inputNumber === 3 && heat > 0) {
      const newValue = heat - 1;
      setHeatAmmo(newValue);
      dispatch(setHeat(newValue));
    } else if (inputNumber === 4 && mg762 >= 50) {
      const newValue = mg762 - 50;
      setMg762Ammo(newValue);
      dispatch(setMg762(newValue));
    }
  };

  const handleInputChange = (index, newValue) => {
    newValue = Number(newValue);

    if (newValue < 0) return;

    switch (index) {
      case 1:
        setApfsdsAmmo(newValue);
        dispatch(setApfsds(newValue));
        break;
      case 2:
        setHeAmmo(newValue);
        dispatch(setHe(newValue));
        break;
      case 3:
        setHeatAmmo(newValue);
        dispatch(setHeat(newValue));
        break;
      case 4:
        setMg762Ammo(newValue);
        dispatch(setMg762(newValue));
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    console.log('Parameters: ', parameters);
    console.log('Initial Ammo: ', initialAmmo);
    console.log('Map Data: ', mapData);
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

      <div className="create_map_save_button">
        <button onClick={handleSave}>SAVE</button>
      </div>

      <div className="create_map_grid_container">
        <GridCanvas stylingBox={1} />
      </div>

      <div className="parameters_create_map_main_container">
        <div className="parameter_create_map_content_section">
          <div className="parameter_heading_create_map">PARAMETERS</div>

          <div className="map_area_main_class">
            <span>MAP AREA</span>
            <div className="progress_bar_and_value_main_container">
              <div className="progress_bar_container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={mapArea}
                  className="progress_bar"
                  onChange={handleMapAreaChange}
                />
              </div>
              <div className="progress_bar_value_box">
                <input
                  type="number"
                  value={mapArea}
                  onChange={handleMapAreaChange}
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
                {initialAmmosTitleArray.map((value, index) => {
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
          <div className="select_your_tank">
            <SelectObjectCarousel carouselObjectType={5} />
          </div>
        </div>
      </div>
    </div>
  );
}
