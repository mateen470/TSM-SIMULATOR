import React, { useCallback, useRef, useState } from 'react';
import '../renderer/App.css';

export default function Clock() {
  const [needleValue, setNeedleValue] = useState(0);
  const clockRef = useRef(null);
  const smallTicks = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23];

  const getAngle = (clientX, clientY) => {
    const { left, top, width, height } =
      clockRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = clientX - centerX;
    const y = clientY - centerY;
    let deg = Math.atan2(y, x) * (180 / Math.PI) + 90;
    deg = deg < 0 ? 360 + deg : deg;
    return deg;
  };

  const updateNeedle = (clientX, clientY) => {
    const angle = getAngle(clientX, clientY);
    const value = Math.round(angle / 15) % 24;
    setNeedleValue(value);
  };

  const handleMouseDown = useCallback(() => {
    const moveListener = (e) => updateNeedle(e.clientX, e.clientY);

    const upListener = () => {
      window.removeEventListener('mousemove', moveListener);
      window.removeEventListener('mouseup', upListener);
    };

    window.addEventListener('mousemove', moveListener);
    window.addEventListener('mouseup', upListener);
  }, []);

  const handleClick = (e) => updateNeedle(e.clientX, e.clientY);

  const needleRotationDegree = needleValue * 15 - 90;
  return (
    <div className="clock" ref={clockRef} onClick={handleClick}>
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
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
}
