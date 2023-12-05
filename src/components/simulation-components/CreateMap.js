import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';
import Draggable from './Draggable';
import Droppable from './Dropable';
import mainMenu from '../../TSM-img/main_menu.svg';
import backButton from '../../TSM-img/back_button.svg';

export default function CreateMap() {
  const [parent, setParent] = useState(null);

  const handleDragEnd = (event) => {
    const { over } = event;
    setParent(over ? over.id : null);
  };

  return (
    <div
      className="create_map_main_class"
      style={{ backgroundImage: `url(${mainMenu})` }}
    >
      <NavLink className="navigation_button_create_map" to="/simulation">
        <span id="first_span_navigation_button">
          <img src={backButton} alt="back" /> CREATE MAP /
        </span>
        <span id="second_span_navigation_button">CREATE MAP</span>
      </NavLink>
      <div className="create_map_grid_container">
        <DndContext onDragEnd={handleDragEnd}>
          <Droppable id="droppable">
            {parent === 'droppable' ? (
              <Draggable id="draggable">Drag me</Draggable>
            ) : (
              'Drop here'
            )}
          </Droppable>
          {!parent && <Draggable id="draggable">Drag me</Draggable>}
        </DndContext>
      </div>
    </div>
  );
}
