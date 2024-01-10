import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setMapArea, setExerciseTime, setTerrain } from '../../redux/DataArray';
import mainMenu from '../../TSM-img/main_menu.svg';
import backButton from '../../TSM-img/back_button.svg';
import DropDown from '../../utility/DropDown';
import SelectObjectCarousel from '../../utility/SelectObjectCarousel';
import GridCanvas from './GridCanvas';
import data from '../../data.json';

export default function CreateMap() {
  const dispatch = useDispatch();
  const [mapArea, setMapAreas] = useState(50);

  const options = data.dropDownOptionsOfExcersieTime;
  const options1 = data.dropDownOptionsOfSelectTerrain;

  const enemy = useSelector((state) => state.dataArray.Enemy);
  const objects = useSelector((state) => state.dataArray.Items);

  const [exerciseTime, setExerciseTimes] = useState(options[0]);
  const [terrain, setTerain] = useState(options1[0]);

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

  const handleSave = () => {
    console.log('Save is clicked!', objects);
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
