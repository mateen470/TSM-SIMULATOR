import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setStudent, setInstructor } from '../../redux/DataArray';
import DropDown from '../../utility/DropDown';
import '../../renderer/App.css';
import data from '../../data.json';

export default function SelectStudent() {
  const dispatch = useDispatch();
  const options = data.dropDownOptionsOfSelectStudent;
  const options2 = data.dropDownOptionsOfSelectInstructor;

  const [selectedStudent, setSelectedStudent] = useState(options[0]);
  const [selectedInstructor, setSelectedInstructor] = useState(options2[0]);

  const handleStudentSelect = (option) => {
    setSelectedStudent(option);
    dispatch(setStudent(option));
  };

  const handleInstructorSelect = (option) => {
    setSelectedInstructor(option);
    dispatch(setInstructor(option));
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
          <NavLink
            className="select_student_instructor_button"
            to="/select_student_instructor"
          >
            ADD STUDENT
          </NavLink>
          <NavLink
            className="select_student_instructor_button"
            to="/select_student_instructor"
          >
            ADD INSTRUCTOR
          </NavLink>
        </div>
      </div>
    </div>
  );
}
