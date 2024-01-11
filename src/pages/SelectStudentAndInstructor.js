import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../renderer/App.css';
import mainMenu from '../TSM-img/main_menu.svg';
import backButton from '../TSM-img/back_button.svg';
import Footer from '../utility/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { ipcRenderer } = window.require('electron');

export default function SelectStudentAndInstructor() {
  const [toggle, setToggle] = useState(false);
  const [studentDetails, setStudentDetails] = useState({
    PANo: '',
    rank: '',
    student: '',
    unit: '',
  });
  const [instructorDetails, setInstructorDetails] = useState({
    PANo: '',
    rank: '',
    instructor: '',
    unit: '',
  });

  const notify = (text) => toast(text);

  const handleInputChange = (field, value, isStudent) => {
    if (isStudent) {
      setStudentDetails((prev) => ({ ...prev, [field]: value }));
    } else {
      setInstructorDetails((prev) => ({ ...prev, [field]: value }));
    }
  };

  useEffect(() => {
    ipcRenderer.on('add-student-response', (event, response) => {
      if (response.success) {
        notify(response.message);
        // Additional logic on success (e.g., showing a success message)
      } else {
        notify(response.message);
        // Handle error (e.g., showing an error message)
      }
    });
  
    // Cleanup the listener
    return () => {
      ipcRenderer.removeAllListeners('add-student-response');
    };
  }, []);

  useEffect(() => {
    ipcRenderer.on('add-instructor-response', (event, response) => {
      if (response.success) {
        console.log(response.message);
        notify(response.message);
        // Additional logic on success (e.g., showing a success message)
      } else {
        console.log(response.message);
        notify(response.message);
        // Handle error (e.g., showing an error message)
      }
    });
  
    // Cleanup the listener
    return () => {
      ipcRenderer.removeAllListeners('add-instructor-response');
    };
  }, []);
  

  const handleSubmitStudent = () => {
    console.log("Details: ",studentDetails);
    ipcRenderer.send('add-student', studentDetails);
    // Reset form or provide user feedback here
  };
  const handleSubmitInstructor = () => {
    ipcRenderer.send('add-instructor', instructorDetails);
    // Reset form or provide user feedback here
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
  const buttonStyle = {
    backgroundColor: 'transparent', // Example button color
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    border: 'solid white 1px',
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
                  className='select_student_instructot_tab_input_container_input'
                  value={studentDetails[key]}
                  onChange={(e) => handleInputChange(key, e.target.value, true)}
                />
              </div>
            ))}
            <button style={buttonStyle} onClick={handleSubmitStudent}>Submit</button>
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
            <div style={buttonStyle} onClick={handleSubmitInstructor}>Submit</div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}
