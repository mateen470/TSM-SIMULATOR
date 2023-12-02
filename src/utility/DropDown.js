import React, { useState, useEffect, useRef } from 'react';
import '../renderer/App.css';
import dropDown from '../TSM-img/dropDown.svg';

export default function DropDown({ options, selected, onOptionSelect }) {
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const handleOptionClick = (option) => {
    onOptionSelect(option);
    setIsActive(false);
  };

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsActive(false);
      }
    };
    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isActive]);

  return (
    <div
      className="custom_drop_down_main_class"
      ref={dropdownRef}
      onClick={toggleDropdown}
    >
      <div className={`custom_drop_down ${isActive ? 'active' : ''}`}>
        <div
          className="custom_drop_down_selected_option"
          onClick={toggleDropdown}
        >
          {selected}
        </div>
        <div className="custom_drop_down_menu">
          {options.map((option, index) => (
            <div
              className="custom_drop_down_option"
              key={index}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
        <div className="drop_down_arrow_button" onClick={toggleDropdown}>
          <img
            alt="dropdown"
            src={dropDown}
            className={isActive ? 'rotated' : ''}
          />
        </div>
      </div>
    </div>
  );
}
