import React, { useState } from 'react';
import DropDown from '../../utility/DropDown';
import '../../renderer/App.css';

export default function SelectStudent() {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const options2 = ['Option 4', 'Option 5', 'Option 6'];

  const [selectedStudent, setSelectedStudent] = useState(options[0]);
  const [selectedInstructor, setSelectedInstructor] = useState(options2[0]);

  const handleStudentSelect = (option) => {
    setSelectedStudent(option);
  };

  const handleInstructorSelect = (option) => {
    setSelectedInstructor(option);
  };

  return (
    <div className="select_student_main_class">
      <div className="select_student_main_heading">
        SELECT STUDENT / INSTRUCTOR
      </div>
      <div className="select_student_dropdown_main_class">
        <div className="select_student_dropdown" style={{ zIndex: 2 }}>
          <span>SELECT STUDENT</span>
          <DropDown
            options={options}
            selected={selectedStudent}
            onOptionSelect={handleStudentSelect}
          />
        </div>
        <div className="select_student_dropdown" style={{ zIndex: 1 }}>
          <span>SELECT INSTRUCTOR</span>
          <DropDown
            options={options2}
            selected={selectedInstructor}
            onOptionSelect={handleInstructorSelect}
          />
        </div>
      </div>

      <div className="select_student_instructor_button_group_main_class">
        <div className="select_student_instructor_button_group">
          <div className="select_student_instructor_button">ADD STUDENT</div>
          <div className="select_student_instructor_button">ADD INSTRUCTOR</div>
        </div>
      </div>
    </div>
  );
}
