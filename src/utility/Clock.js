import React from 'react';
import '../renderer/App.css';

export default function Clock({ needleValue }) {
  const smallTicks = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23];

  const windDrectionValue = needleValue - 3;
  const needleRotationDegree = (windDrectionValue / 12) * 360;

  return (
    <div className="clock">
      {[...Array(24)].map((_, index) => {
        const isRedTick = [0, 6, 12, 18].includes(index);
        const isSmallTick = smallTicks.includes(index);

        return (
          <div
            key={index}
            className={`tick ${isRedTick ? 'tick_large_red' : ''} ${
              isSmallTick ? 'tick_small' : 'tick_large'
            }`}
          ></div>
        );
      })}
      <div className="center_dial">
        <div className="center_dial_number twelve">12</div>
        <div className="center_dial_number one">1</div>
        <div className="center_dial_number two">2</div>
        <div className="center_dial_number three">3</div>
        <div className="center_dial_number four">4</div>
        <div className="center_dial_number five">5</div>
        <div className="center_dial_number six">6</div>
        <div className="center_dial_number seven">7</div>
        <div className="center_dial_number eight">8</div>
        <div className="center_dial_number nine">9</div>
        <div className="center_dial_number ten">10</div>
        <div className="center_dial_number eleven">11</div>
      </div>
      <div
        className="dial_needle"
        style={{ transform: `rotate(${needleRotationDegree}deg)` }}
      ></div>
    </div>
  );
}
