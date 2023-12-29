import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import {
  addEnemy,
  addOwnTank,
  addForrestsAndBuildings,
  updateTotalEnemies,
  updateTotalOwnTanks,
  updateTotalEnemyTanks,
  updateTotalEnemyAPCs,
  deleteEnemy,
  deleteOwnTank,
  deleteForrestOrBuilding,
} from '../../redux/DataArray';
import { removeItem } from '../../redux/CarouselSelectedItemSlice';
import gridTank from '../../TSM-img/gridTank.svg';
import gridTank2 from '../../TSM-img/gridTank2.svg';
import gridTank3 from '../../TSM-img/gridTank3.svg';
import gridTruck from '../../TSM-img/gridTruck.svg';
import gridForrest from '../../TSM-img/gridForrest.svg';
import gridAPV from '../../TSM-img/gridAPV.svg';
import gridBuilding from '../../TSM-img/gridBuilding.svg';
import startSign from '../../TSM-img/gridStopSign.svg';

export default function GridCanvas({ stylingBox }) {
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
    return (getGridWidth() / zoom) * 1.02;
  };

  const getGridTopBoundary = () => {
    return 0;
  };

  const getGridBottomBoundary = () => {
    return (getGridHeight() / zoom) * 1.1;
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

  const enforceGridBoundaries = (newX, newY, itemWidth, itemHeight) => {
    const rightBoundary = getGridRightBoundary() - itemWidth;
    const bottomBoundary = getGridBottomBoundary() - itemHeight;

    const boundedX = Math.max(
      getGridLeftBoundary(),
      Math.min(newX, rightBoundary),
    );
    const boundedY = Math.max(
      getGridTopBoundary(),
      Math.min(newY, bottomBoundary),
    );

    return { x: boundedX, y: boundedY };
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

        const diffX = (mouseX - startX) * zoom;
        const diffY = (mouseY - startY) * zoom;

        let newX = item.x + diffX;
        let newY = item.y + diffY;

        const boundedPosition = enforceGridBoundaries(newX, newY, 50, 50);
        newX = boundedPosition.x;
        newY = boundedPosition.y;

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

        const diffX = (mouseX - startX) * zoom;
        const diffY = (mouseY - startY) * zoom;

        let newX = item.x + diffX;
        let newY = item.y + diffY;

        const boundedPosition = enforceGridBoundaries(newX, newY, 50, 50);
        newX = boundedPosition.x;
        newY = boundedPosition.y;

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
      const itemToDelete = items.find((item) => item.id === selectedObjectId);
      if (itemToDelete) {
        if (itemToDelete.status === 'dangerous') {
          dispatch(deleteEnemy(selectedObjectId));
        } else if (itemToDelete.status === 'own-tank') {
          dispatch(deleteOwnTank(selectedObjectId));
        } else if (itemToDelete.status === 'not-dangerous') {
          dispatch(deleteForrestOrBuilding(selectedObjectId));
        }
      }
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
            type: selectedItem.type,
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
    console.log('object', objectStartPoints);
  }, [selectedItems]);

  const drawPath = (path) => {
    if (!path || path.length < 2) return '';
    let d = `M ${path[0].x} ${path[0].y} `;
    for (let i = 1; i < path.length; i++) {
      d += `L ${path[i].x} ${path[i].y} `;
    }
    return d;
  };

  const hasObjects = items.length > 0;

  const totalEnemies = items.filter(
    (item) => item.status === 'dangerous',
  ).length;
  const enemyTanks = items.filter(
    (item) => item.status === 'dangerous' && item.type === 'tank',
  ).length;
  const enemyAPCs = items.filter(
    (item) => item.status === 'dangerous' && item.type === 'car',
  ).length;

  useEffect(() => {
    dispatch(
      updateTotalEnemies(
        items.filter((item) => item.status === 'dangerous').length,
      ),
    );
    dispatch(
      updateTotalOwnTanks(
        items.filter((item) => item.status === 'own-tank').length,
      ),
    );
    dispatch(
      updateTotalEnemyTanks(
        items.filter((item) => item.type === 'tank').length,
      ),
    );
    dispatch(
      updateTotalEnemyAPCs(items.filter((item) => item.type === 'car').length),
    );
    objectStartPoints.forEach((point) => {
      if (point.item.status === 'dangerous') {
        dispatch(
          addEnemy({
            unitId: point.id,
            enemyName: point.item.name,
            details: point.item.details,
            path: point.path,
          }),
        );
      } else if (point.item.status === 'own-tank') {
        dispatch(
          addOwnTank({
            unitId: point.id,
            tankName: point.item.name,
            details: point.item.details,
            path: point.path,
          }),
        );
      } else if (point.item.status === 'not-dangerous') {
        dispatch(
          addForrestsAndBuildings({
            unitId: point.id,
            objectName: point.item.name,
            details: point.item.details,
            path: point.path,
          }),
        );
      }
    });
  }, [objectStartPoints, items, dispatch]);

  return (
    <div
      className="grid_canvas_main_container"
      style={{
        width:
          stylingBox === 1 && hasObjects
            ? '91%'
            : stylingBox === 1 && !hasObjects
            ? '79.8%'
            : '63.6%',
        borderRadius: stylingBox === 1 ? '5px' : '0px',
        position: stylingBox === 2 ? 'absolute' : 'relative',
      }}
    >
      <div
        className="grid_canvas_object_details"
        style={{
          display: stylingBox === 2 ? 'none' : '',
          width: hasObjects ? '200px' : '0px',
          opacity: hasObjects ? 1 : 0,
        }}
      >
        {hasObjects && (
          <button onClick={handleDelete} className="grid_canvas_remove_btn">
            DELETE
          </button>
        )}
        {totalEnemies > 0 && (
          <div className="grid_canvas_object_details_stats">
            <h3>Total Enemies: {totalEnemies}</h3>
            <p>Enemy Tanks: {enemyTanks}</p>
            <p>Enemy APCs: {enemyAPCs}</p>
          </div>
        )}
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
              height: '51vh',
              width: '1500px',
              border: '1px solid rgba(255, 255, 255, 0.578)',
              position: 'relative',
              cursor: 'grab',
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
