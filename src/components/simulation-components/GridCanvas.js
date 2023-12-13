import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { removeItem } from '../../redux/CarouselSelectedItemSlice';
import gridTank from '../../TSM-img/gridTank.svg';
import gridTank2 from '../../TSM-img/gridTank2.svg';
import gridTank3 from '../../TSM-img/gridTank3.svg';
import gridTruck from '../../TSM-img/gridTruck.svg';
import gridForrest from '../../TSM-img/gridForrest.svg';
import gridAPV from '../../TSM-img/gridAPV.svg';
import gridBuilding from '../../TSM-img/gridBuilding.svg';
import startSign from '../../TSM-img/gridStopSign.svg';

export default function GridCanvas() {
  const gridRef = useRef(null);
  const dispatch = useDispatch();
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [items, setItems] = useState([]);
  const [draggingItem, setDraggingItem] = useState(null);
  const [paths, setPaths] = useState({});
  const [objectStartPoints, setObjectStartPoints] = useState([]);
  const selectedItems = useSelector((state) => state.selectedItem);
  const [selectedObjectId, setSelectedObjectId] = useState(null);

  const createGridPattern = () => {
    const gridSize = 10000;
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

  const updatePath = (itemId, newX, newY) => {
    const threshold = 30;

    setPaths((prevPaths) => {
      const currentPath = prevPaths[itemId] || [];
      const lastPoint = currentPath[currentPath.length - 1];

      if (
        !lastPoint ||
        Math.hypot(lastPoint.x - newX, lastPoint.y - newY) >= threshold
      ) {
        const newPath = [...currentPath, { x: newX, y: newY }];
        return { ...prevPaths, [itemId]: newPath };
      }

      return prevPaths;
    });
  };

  const handleItemMouseDown = (itemId, e) => {
    e.stopPropagation();
    setSelectedObjectId(itemId);
    const itemIndex = items.findIndex((i) => i.id === itemId);
    if (itemIndex === -1) return;
    const item = items[itemIndex];
    setDraggingItem(item);

    const rect = gridRef.current.getBoundingClientRect();
    const startX = (e.clientX - rect.left) / zoom - pan.x;
    const startY = (e.clientY - rect.top) / zoom - pan.y;

    if (!item.clickedOnce) {
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
          prevItems.map((i) =>
            i.id === itemId ? { ...i, x: newX, y: newY } : i,
          ),
        );
      };

      const handleMouseUp = () => {
        setDraggingItem(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        setItems((prevItems) =>
          prevItems.map((i, index) =>
            index === itemIndex ? { ...i, clickedOnce: true } : i,
          ),
        );
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      e.stopPropagation();
      const item = items.find((i) => i.id === itemId);
      setDraggingItem(item);

      const rect = gridRef.current.getBoundingClientRect();
      const startX = (e.clientX - rect.left) / zoom - pan.x;
      const startY = (e.clientY - rect.top) / zoom - pan.y;

      if (!objectStartPoints.some((point) => point.id === itemId)) {
        setObjectStartPoints((prevObjectStartPoints) => [
          ...prevObjectStartPoints,
          {
            id: itemId,
            item,
            startPoint: { x: startX, y: startY },
            path: [{ x: startX, y: startY }],
          },
        ]);
      }

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
          prevItems.map((i) =>
            i.id === itemId ? { ...i, x: newX, y: newY } : i,
          ),
        );

        const threshold = 30;
        setObjectStartPoints((prevObjectStartPoints) => {
          return prevObjectStartPoints.map((obj) => {
            if (obj.id === itemId) {
              const lastPoint = obj.path[obj.path.length - 1];
              if (
                !lastPoint ||
                Math.hypot(lastPoint.x - newX, lastPoint.y - newY) >= threshold
              ) {
                const newPath = [...obj.path, { x: newX, y: newY }];
                return { ...obj, path: newPath };
              }
            }
            return obj;
          });
        });
      };

      const handleMouseUp = () => {
        setDraggingItem(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const handleDelete = () => {
    if (selectedObjectId) {
      const updatedItems = items.filter((item) => item.id !== selectedObjectId);
      setItems(updatedItems);

      const updatedObjectStartPoints = objectStartPoints.filter(
        (point) => point.id !== selectedObjectId,
      );
      setObjectStartPoints(updatedObjectStartPoints);

      const updatedPaths = Object.fromEntries(
        Object.entries(paths).filter(([key]) => key !== selectedObjectId),
      );
      setPaths(updatedPaths);

      dispatch(removeItem({ id: selectedObjectId }));
      setSelectedObjectId(null);
    }
  };

  useEffect(() => {
    if (selectedItems.length > items.length) {
      const newItems = selectedItems
        .slice(items.length)
        .map((selectedItem, index) => {
          return {
            id: selectedItem.id || Date.now() + index,
            name: selectedItem.name,
            x: Math.random() * (getGridWidth() - 50),
            y: Math.random() * (getGridHeight() - 50),
            status: selectedItem.status,
            details: selectedItem.details,
            src:
              selectedItem.type === 'tank'
                ? gridTank2
                : selectedItem.type === 'car'
                ? gridAPV
                : selectedItem.type === 'building'
                ? gridBuilding
                : selectedItem.type === 'forrest'
                ? gridForrest
                : selectedItem.type === 'myTank'
                ? gridTank3
                : gridTruck,
          };
        });

      if (newItems.length > 0) {
        setItems((prevItems) => [...prevItems, ...newItems]);
      }
    }
    console.log('objects', objectStartPoints);
  }, [selectedItems]);

  const drawPath = (path) => {
    if (!path || path.length < 2) return '';
    let d = `M ${path[0].x} ${path[0].y} `;
    for (let i = 1; i < path.length; i++) {
      d += `L ${path[i].x} ${path[i].y} `;
    }
    return d;
  };

  return (
    <div className="grid_canvas_main_container">
      <div className="grid_canvas_object_details">
        <button onClick={handleDelete} className="grid_canvas_remove_btn">
          DELETE
        </button>
      </div>
      <TransformWrapper>
        {/* <div>
          Item Position:
          {draggingItem
            ? `(${draggingItem.x.toFixed(2)}, ${draggingItem.y.toFixed(2)})`
            : 'None'}
        </div> */}
        <TransformComponent>
          <svg
            className="path-overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            {objectStartPoints.map((object) => {
              const item = items.find((i) => i.id === object.id);
              const pathColor =
                item && item.status === 'own-tank'
                  ? 'blue'
                  : item && item.status === 'dangerous'
                  ? 'red'
                  : '';

              return (
                <path
                  key={object.id}
                  d={drawPath(object.path)}
                  stroke={pathColor}
                  fill="none"
                  strokeWidth={2}
                />
              );
            })}
          </svg>
          <div
            ref={gridRef}
            className="grid_canvas"
            style={{
              background: createGridPattern(),
              backgroundSize: `${30 * zoom}px ${30 * zoom}px`,
            }}
          >
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <div
                  onMouseDown={(e) => handleItemMouseDown(item.id, e)}
                  style={{
                    left: (item.x + pan.x) * zoom,
                    top: (item.y + pan.y) * zoom,
                    transform: `translate(-50%, -50%) scale(${zoom})`,
                    backgroundImage: `url(${item.src})`,
                    position: 'absolute',
                    width: '50px',
                    height: '50px',
                    cursor: 'pointer',
                    backgroundSize: 'cover',
                  }}
                />
                {objectStartPoints.find((point) => point.id === item.id) && (
                  <div
                    style={{
                      left:
                        (objectStartPoints.find((point) => point.id === item.id)
                          .startPoint.x +
                          pan.x) *
                        zoom,
                      top:
                        (objectStartPoints.find((point) => point.id === item.id)
                          .startPoint.y +
                          pan.y) *
                        zoom,
                      transform: `translate(-50%, -50%) scale(${zoom})`,
                      backgroundImage: `url(${
                        item.status === 'not-dangerous' ? 'none' : startSign
                      })`,
                      position: 'absolute',
                      width: '20px',
                      height: '20px',
                      backgroundSize: 'cover',
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
