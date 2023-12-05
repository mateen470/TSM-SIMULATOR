import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export default function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    opacity: isOver ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`droppable-area ${isOver ? 'droppable-area-over' : ''}`}
    >
      {props.children}
    </div>
  );
}
