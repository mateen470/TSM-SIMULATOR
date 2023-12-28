import React, { useState } from 'react';
import DropDown from '../../utility/DropDown';
import '../../renderer/App.css';
import data from '../../data.json';

export default function Difficulty() {
  const options = data.dropDownOptionsOfSelectDifficulty;

  const [selectedDifficultyLevel, setSelectedDifficultyLevel] = useState(
    options[0],
  );

  const handleDifficultyLevel = (option) => {
    setSelectedDifficultyLevel(option);
  };

  return (
    <div className="select_difficulty_main_class">
      <div className="select_difficulty_main_heading">DIFFICULTY</div>
      <div className="select_difficulty_dropdown_main_class">
        <div className="select_difficulty_dropdown" style={{ zIndex: 2 }}>
          <span>SELECT DIFFICULTY</span>
          <DropDown
            options={options}
            selected={selectedDifficultyLevel}
            onOptionSelect={handleDifficultyLevel}
          />
        </div>
      </div>
    </div>
  );
}
