import { useState } from 'react';
import '../../renderer/App.css';

export default function Control() {
  const [chosenControl, setChosenControl] = useState('');

  const control = [
    { title: 'Enable Manual Controls' },
    { title: 'Enable GCE' },
    { title: 'Enable Stabilizer Only' },
    { title: 'Enable SFCS' },
    { title: 'OVRL Correction Training' },
  ];

  return (
    <div className="control_main_class">
      <div className="control_main_heading">CONTROL</div>
      <div className="control_main_content">
        {control.map((data, index) => {
          return (
            <div
              className="control_main_content_controls"
              onClick={() => setChosenControl(data.title)}
            >
              {data.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
