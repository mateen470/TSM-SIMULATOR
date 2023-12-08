import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from 'react-zoom-pan-pinch';
import gridTank from '../../TSM-img/gridTank.svg';
import gridTank2 from '../../TSM-img/gridTank2.svg';
import gridTank3 from '../../TSM-img/gridTank3.svg';
import gridTruck from '../../TSM-img/gridTruck.svg';
import gridForrest from '../../TSM-img/gridForrest.svg';
import gridAPV from '../../TSM-img/gridAPV.svg';
import gridBuilding from '../../TSM-img/gridBuilding.svg';

export default function GridCanvas() {
  const gridRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [items, setItems] = useState([]);
  const [draggingItem, setDraggingItem] = useState(null);
  const [draggingOffset, setDraggingOffset] = useState({ x: 0, y: 0 });
  const selectedItems = useSelector((state) => state.selectedItem);

  const createGridPattern = () => {
    const gridSize = 500;
    return `repeating-linear-gradient(
              to right,
              lightgrey,
              lightgrey 1px,
              transparent 1px,
              transparent ${gridSize}px
            ),
            repeating-linear-gradient(
              to bottom,
              lightgrey,
              lightgrey 1px,
              transparent 1px,
              transparent ${gridSize}px
            )`;
  };

  const getGridWidth = () => {
    return gridRef.current.clientWidth;
  };

  const getGridHeight = () => {
    return gridRef.current.clientHeight;
  };

  const getGridLeftBoundary = () => {
    return 0;
  };

  const getGridRightBoundary = () => {
    return getGridWidth() / zoom;
  };

  const getGridTopBoundary = () => {
    return 0;
  };

  const getGridBottomBoundary = () => {
    return getGridHeight() / zoom;
  };

  const handleItemMouseDown = (itemId, e) => {
    e.stopPropagation();
    const item = items.find((i) => i.id === itemId);
    setDraggingItem(item);

    const rect = gridRef.current.getBoundingClientRect();
    const handleMouseMove = (moveEvent) => {
      const mouseX = (moveEvent.clientX - rect.left) / zoom - pan.x;
      const mouseY = (moveEvent.clientY - rect.top) / zoom - pan.y;

      const newX = Math.min(
        Math.max(mouseX, getGridLeftBoundary()),
        getGridRightBoundary() - 50,
      );
      const newY = Math.min(
        Math.max(mouseY, getGridTopBoundary()),
        getGridBottomBoundary() - 50,
      );

      setItems((prevItems) =>
        prevItems.map((i) => {
          if (i.id === itemId) {
            return { ...i, x: newX, y: newY };
          }
          return i;
        }),
      );
    };

    const handleMouseUp = () => {
      setDraggingItem(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    // Check if there are new items in selectedItems
    if (selectedItems.length > items.length) {
      // Get only the new items that are not in the items state
      const newItems = selectedItems
        .slice(items.length)
        .map((selectedItem, index) => {
          return {
            id: selectedItem.id || Date.now() + index,
            x: Math.random() * (getGridWidth() - 50), // Random X within grid
            y: Math.random() * (getGridHeight() - 50), // Random Y within grid
            src:
              selectedItem.type === 'tank'
                ? gridTank2
                : selectedItem.type === 'car'
                ? gridAPV
                : selectedItem.type === 'building'
                ? gridBuilding
                : selectedItem.type === 'forrest'
                ? gridForrest
                : gridTruck,
          };
        });

      // Append only the new items to the existing items
      if (newItems.length > 0) {
        setItems((prevItems) => [...prevItems, ...newItems]);
      }
    }
  }, [selectedItems]);

  return (
    <TransformWrapper>
      <div>
        Item Position:
        {draggingItem
          ? `(${draggingItem.x.toFixed(2)}, ${draggingItem.y.toFixed(2)})`
          : 'None'}
      </div>
      <TransformComponent>
        <div
          ref={gridRef}
          className="grid_canvas_main_class"
          style={{
            background: createGridPattern(),
            backgroundSize: `${30 * zoom}px ${30 * zoom}px`,
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              onMouseDown={(e) => handleItemMouseDown(item.id, e)}
              style={{
                left: (item.x + pan.x) * zoom,
                top: (item.y + pan.y) * zoom,
                transform: `translate(-50%, -50%) scale(${zoom})`,
                backgroundImage: `url(${item.src})`,
                position: 'absolute',
                width: `50px`,
                height: `50px`,
                cursor: 'pointer',
                backgroundSize: 'cover',
              }}
            />
          ))}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}
