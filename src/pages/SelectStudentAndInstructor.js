import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../renderer/App.css';
import mainMenu from '../TSM-img/main_menu.svg';
import backButton from '../TSM-img/back_button.svg';
import Footer from '../utility/Footer';

export default function SelectStudentAndInstructor() {
  const [toggle, setToggle] = useState(false);
  const [studentDetails, setStudentDetails] = useState({
    student: '',
    pNo: '',
    rank: '',
    unit: '',
  });
  const [instructorDetails, setInstructorDetails] = useState({
    instructor: '',
    pNo: '',
    rank: '',
    unit: '',
  });

  const handleInputChange = (field, value, isStudent) => {
    if (isStudent) {
      setStudentDetails((prev) => ({ ...prev, [field]: value }));
    } else {
      setInstructorDetails((prev) => ({ ...prev, [field]: value }));
    }
  };

  const studentTabStyle = {
    opacity: !toggle ? 1 : 0,
    maxHeight: !toggle ? '100%' : '0',
    overflow: 'hidden',
    transition: 'opacity 0.4s ease-in-out',
  };

  const instructorTabStyle = {
    opacity: toggle ? 1 : 0,
    maxHeight: toggle ? '100%' : '0',
    overflow: 'hidden',
    transition: 'opacity 0.4s ease-in-out',
  };

  return (
    <div
      className="select_student_instructor_main_class"
      style={{ backgroundImage: `url(${mainMenu})` }}
    >
      <NavLink className="navigation_button_with_bigger_width" to="/simulation">
        <span id="first_span_navigation_button">
          <img src={backButton} alt="back" /> SIMULATION /
        </span>
        <span id="second_span_navigation_button">EXERCISE TYPE</span>
      </NavLink>

      <div className="select_student_instructor_main_content_container">
        <div className="select_student_instructor_main_content">
          <div className="select_student_instructor_tabs_button">
            <div
              className="select_student_instructor_tab_button"
              onClick={() => setToggle(false)}
              style={{
                background: !toggle && 'rgba(255, 255, 255, 0.2)',
                fontWeight: !toggle ? '700' : '500',
                transition: 'background 0.2s ease-in-out',
              }}
            >
              STUDENT
            </div>
            <div
              className="select_student_instructor_tab_button"
              onClick={() => setToggle(true)}
              style={{
                background: toggle && 'rgba(255, 255, 255, 0.2)',
                fontWeight: toggle ? '700' : '500',
                transition: 'background 0.2s ease-in-out',
              }}
            >
              INSTRUCTOR
            </div>
          </div>

          <div
            className="select_student_instructor__tab_content"
            style={studentTabStyle}
          >
            {Object.keys(studentDetails).map((key) => (
              <div
                key={key}
                className="select_student_instructot_tab_input_container"
              >
                <span>{key.toUpperCase()}</span>
                <input
                  value={studentDetails[key]}
                  onChange={(e) => handleInputChange(key, e.target.value, true)}
                />
              </div>
            ))}
          </div>

          <div
            className="select_student_instructor__tab_content"
            style={instructorTabStyle}
          >
            {Object.keys(instructorDetails).map((key) => (
              <div
                key={key}
                className="select_student_instructot_tab_input_container"
              >
                <span>{key.toUpperCase()}</span>
                <input
                  value={instructorDetails[key]}
                  onChange={(e) =>
                    handleInputChange(key, e.target.value, false)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
