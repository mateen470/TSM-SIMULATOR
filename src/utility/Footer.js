import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../renderer/App.css';

const { ipcRenderer } = require('electron');
// const { dialog } = require('electron').remote;

// const { ipcRenderer } = require('electron');

export default function Footer() {
  const dataArrayState = useSelector((state) => state.dataArray);
  // Function to save the state to a JSON file
  const saveStateToJsonFile = () => {
    // Send the data to the main process
    console.log('Workings');
    ipcRenderer.send('save-json', {
      data: dataArrayState,
      filename: 'tsm.json',
    });
  };

  useEffect(() => {
    const handleSaveResponse = (event, response) => {
      if (response.success) {
        console.log('File saved successfully:', response.message);
      } else {
        console.error('File save error:', response.message);
      }
    };

    ipcRenderer.on('save-json-response', handleSaveResponse);

    // Clean up
    return () => {
      ipcRenderer.removeListener('save-json-response', handleSaveResponse);
    };
  }, []);

  return (
    <div className="footer">
      <div className="footer_first_box">
        <NavLink className="underline" to="/">
          BACK
        </NavLink>
        <NavLink className="underline" to="/help">
          HELP
        </NavLink>
      </div>
      <div className="footer_second_box">
        <NavLink className="underline" to="/tutorials">
          TUTORIALS
        </NavLink>
        <div id="footer_second_box_second_span">
          {/* <NavLink
            className="underline"
            to="/dashboard"
            onClick={saveStateToJsonFile}
          >
            CONTINUE
          </NavLink> */}
          <button className="underline" >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}
