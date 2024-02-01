import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../renderer/App.css';
import Footer from '../utility/Footer';
import mainMenu from '../TSM-img/main_menu.svg';
import backButton from '../TSM-img/back_button.svg';
import plus from '../TSM-img/plus.svg';

export default function AddBatchUsers() {
  const [addBatchUsers, setAddBatchUsers] = useState([
    {
      PA_NO: '',
      RANK: '',
      NAME: '',
      UNIT: '',
      ROLL_NO: '',
    },
  ]);

  const handleUserInput = (index, field, value) => {
    const updatedUsers = [...addBatchUsers];
    updatedUsers[index][field] = value;
    setAddBatchUsers(updatedUsers);
  };

  const addMoreUsers = () => {
    setAddBatchUsers([
      ...addBatchUsers,
      {
        PA_NO: '',
        RANK: '',
        NAME: '',
        UNIT: '',
        ROLL_NO: '',
      },
    ]);
  };

  return (
    <div
      className="select_student_instructor_main_class"
      style={{ backgroundImage: `url(${mainMenu})` }}
    >
      <NavLink
        className="navigation_button_with_bigger_width_1"
        to="/simulation"
      >
        <span id="first_span_navigation_button">
          <img src={backButton} alt="back" /> SIMULATION /
        </span>
        <span id="second_span_navigation_button">ADD BATCH USERS</span>
      </NavLink>

      <div className="add_batch_user_table_main_container">
        <div className="add_batch_user_table_content">
          <div className="add_batch_user_table_head">
            <span>PA NO.</span>
            <span>RANK</span>
            <span>NAME</span>
            <span>UNIT</span>
            <span>ROLL NO.</span>
          </div>

          <div className="add_batch_user_table_body">
            {addBatchUsers.map((user, index) => (
              <div className="add_batch_user_table_body_row" key={index}>
                {Object.keys(user).map((key) => (
                  <input
                    key={key}
                    style={{
                      borderRight:
                        key === 'ROLL_NO' ? 'none' : '1px solid #ffffff3c',
                    }}
                    value={user[key]}
                    onChange={(e) =>
                      handleUserInput(index, key, e.target.value)
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="add_batch_user_btn" onClick={addMoreUsers}>
        <img alt="plus" src={plus} />
        <span>ADD MORE</span>
      </div>

      <Footer />
    </div>
  );
}
