import React, { useState } from 'react';
import DropDown from '../../utility/DropDown';
import '../../renderer/App.css';
import Clock from '../../utility/Clock';
import data from '../../data.json';

export default function Weather() {
  const options = data.dropDownOptionsOfSelectSeason;

  const [selectedWeather, setSelectedWeather] = useState(options[0]);
  const [temperature, setTemperature] = useState(60);
  const [windSpeed, setWindSpeed] = useState(40);
  const [windDirection, setWindDirection] = useState(12);

  const handleWeather = (option) => {
    setSelectedWeather(option);
  };

  return (
    <div className="select_weather_main_class">
      <div className="select_weather_main_heading">WEATHER</div>

      <div className="select_weather_main_content_container">
        <div className="temperature_wind_speed_main_class">
          <div className="temperature_main_class">
            <span>AMBIENT TEMPERATURE</span>
            <div className="progress_bar_and_value_main_container">
              <div className="progress_bar_container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={temperature}
                  className="progress_bar"
                  onChange={(e) => setTemperature(e.target.value)}
                />
              </div>
              <div className="progress_bar_value_box">
                <input
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                />
                {'\u00b0'}C
              </div>
            </div>
          </div>
          <div className="wind_speed_main_class">
            <span>WIND SPEED</span>
            <div className="progress_bar_and_value_main_container">
              <div className="progress_bar_container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={windSpeed}
                  className="progress_bar"
                  onChange={(e) => setWindSpeed(e.target.value)}
                />
              </div>
              <div className="progress_bar_value_box">
                <input
                  type="number"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(e.target.value)}
                />
                knots
              </div>
            </div>
          </div>
        </div>

        <div className="wind_direction_main_class">
          <div className="wind_direction_container">
            <span>WIND DIRECTION</span>
            <div className="clock_wind_direction">
              <Clock needleValue={windDirection} />
            </div>
          </div>
        </div>

        <div className="select_weather_dropdown_main_class">
          <div className="select_weather_dropdown" style={{ zIndex: 10 }}>
            <span>SEASON</span>
            <DropDown
              options={options}
              selected={selectedWeather}
              onOptionSelect={handleWeather}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
