import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { useDispatch } from 'react-redux';
import { setStudent, setInstructor } from '../../redux/DataArray';
import DropDown from '../../utility/DropDown';
import '../../renderer/App.css';
import data from '../../data.json';

export default function SelectStudent() {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);
  

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
  useEffect(() => {
    ipcRenderer.send('fetch-students');
    ipcRenderer.send('fetch-instructors');

    ipcRenderer.on('fetch-students-response', (event, response) => {
      if (response.success) {
        setOptions(response.data);
      } else {
        console.error(response.message);
      }
    });

    ipcRenderer.on('fetch-instructors-response', (event, response) => {
      if (response.success) {
        setOptions2(response.data);
      } else {
        console.error(response.message);
      }
    });

    // Cleanup listeners
    return () => {
      ipcRenderer.removeAllListeners('fetch-students-response');
      ipcRenderer.removeAllListeners('fetch-instructors-response');
    };
  }, []);


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
