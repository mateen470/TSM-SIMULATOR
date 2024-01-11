import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import data from '../../data.json';
import {
  addEnemy,
  addOwnTank,
  addBuildings,
  updateTotalEnemies,
  updateTotalOwnTanks,
  updateTotalEnemyTanks,
  updateTotalEnemyAPCs,
  deleteEnemy,
  deleteOwnTank,
  deleteBuilding,
  addEnemyCar,
  setOnlyOneOwnTank,
  deleteForrest,
  addForrest,
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
import Increment from '../../TSM-img/increment.svg';
import Decrement from '../../TSM-img/decrement.svg';
import close from '../../TSM-img/close.svg';

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
  const [latestTankId, setLatestTankId] = useState(null);
  const [tankAmmos, setTankAmmos] = useState({});
  const [xcoord,setXcoord]= useState(null);
  const [ycoord,setYcoord]= useState(null);

  const isTankPresent = () =>
    items.some((item) => item.type === 'tank' || item.type === 'myTank');

  const [manuallyClosed, setManuallyClosed] = useState(false);

  const [showInitialAmmo, setShowInitialAmmo] = useState(isTankPresent());

  const initialAmmosTitleArray = data.initialAmmoTitleArray;

  const [apfsds, setApfsdsAmmo] = useState(40);
  const [he, setHeAmmo] = useState(40);
  const [heat, setHeatAmmo] = useState(40);
  const [mg762, setMg762Ammo] = useState(1000);

  const handleAmmoChange = (tankId, ammoType, value) => {
    setTankAmmos((prevAmmos) => ({
      ...prevAmmos,
      [tankId]: {
        ...prevAmmos[tankId],
        [ammoType]: value,
      },
    }));
  };

  const handleInputChange = (index, newValue) => {
    newValue = Number(newValue);

    if (newValue < 0) return;

    switch (index) {
      case 1:
        setApfsdsAmmo(newValue);
        handleAmmoChange(selectedObjectId, 'apfsds', newValue);
        break;
      case 2:
        setHeAmmo(newValue);
        handleAmmoChange(selectedObjectId, 'he', newValue);
        break;
      case 3:
        setHeatAmmo(newValue);
        handleAmmoChange(selectedObjectId, 'heat', newValue);
        break;
      case 4:
        setMg762Ammo(newValue);
        handleAmmoChange(selectedObjectId, 'mg762', newValue);
        break;
      default:
        break;
    }
  };

  const handleIncrement = (inputNumber) => {
    if (inputNumber === 1) {
      const newValue = apfsds + 1;
      setApfsdsAmmo(newValue);
      handleAmmoChange(selectedObjectId, 'apfsds', newValue);
    } else if (inputNumber === 2) {
      const newValue = he + 1;
      setHeAmmo(newValue);
      handleAmmoChange(selectedObjectId, 'he', newValue);
    } else if (inputNumber === 3) {
      const newValue = heat + 1;
      setHeatAmmo(newValue);
      handleAmmoChange(selectedObjectId, 'heat', newValue);
    } else if (inputNumber === 4) {
      const newValue = mg762 + 50;
      setMg762Ammo(newValue);
      handleAmmoChange(selectedObjectId, 'mg762', newValue);
    }
  };

  const handleDecrement = (inputNumber) => {
    if (inputNumber === 1 && apfsds > 0) {
      const newValue = apfsds - 1;
      setApfsdsAmmo(newValue);
      handleAmmoChange(selectedObjectId, 'apfsds', newValue);
    } else if (inputNumber === 2 && he > 0) {
      const newValue = he - 1;
      setHeAmmo(newValue);
      handleAmmoChange(selectedObjectId, 'he', newValue);
    } else if (inputNumber === 3 && heat > 0) {
      const newValue = heat - 1;
      setHeatAmmo(newValue);
      handleAmmoChange(selectedObjectId, 'heat', newValue);
    } else if (inputNumber === 4 && mg762 >= 50) {
      const newValue = mg762 - 50;
      setMg762Ammo(newValue);
      handleAmmoChange(selectedObjectId, 'mg762', newValue);
    }
  };

  const inputArray = ['INITIAL QTY. :', apfsds, he, heat, mg762];

  const createGridPattern = () => {
    const gridSize = 10000;
    return `repeating-linear-gradient(
              to right,
              white,
              white 1px,
              transparent 1px,
              transparent ${gridSize}px
            ),
            repeating-linear-gradient(
              to bottom,
              white,
              white 1px,
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
          dispatch(setOnlyOneOwnTank(true));
        } else if (itemToDelete.type === 'building') {
          dispatch(deleteBuilding(selectedObjectId));
        } else if (itemToDelete.type === 'forrest') {
          dispatch(deleteForrest(selectedObjectId));
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
    if (latestTankId === selectedObjectId) {
      const remainingTanks = items.filter(
        (item) =>
          (item.type === 'tank' || item.type === 'myTank') &&
          item.id !== selectedObjectId,
      );
      setLatestTankId(remainingTanks.length > 0 ? remainingTanks[0].id : null);
    }
  };

  useEffect(() => {
    if (selectedItems.length > items.length) {
      let addedTank = false;

      const newItems = selectedItems
        .slice(items.length)
        .map((selectedItem, index) => {
          if (selectedItem.type === 'tank' || selectedItem.type === 'myTank') {
            addedTank = true;
          }
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
      if (addedTank) {
        setManuallyClosed(false);
      }
      console.log('object', objectStartPoints);
    }
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

  const closeInitialAmmo = () => {
    setShowInitialAmmo(false);
    setManuallyClosed(true);
    setApfsdsAmmo(0);
    setHeAmmo(0);
    setHeatAmmo(0);
    setMg762Ammo(0);
  };

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
      const ammoForThisTank = tankAmmos[point.id] || {
        apfsds: 0,
        he: 0,
        heat: 0,
        mg762: 0,
      };
      if (point.item.status === 'dangerous') {
        if (point.item.type === 'tank') {
          dispatch(
            addEnemy({
              unitId: point.id,
              enemyName: point.item.name,
              path: point.path,
              initialAmmo: ammoForThisTank,
              spawning_point: point.startPoint,
            }),
          );
        } else if (point.item.type === 'car') {
          dispatch(
            addEnemyCar({
              unitId: point.id,
              enemyName: point.item.name,
              path: point.path,
              spawning_point: point.startPoint,
            }),
          );
        }
      } else if (point.item.status === 'own-tank') {
        dispatch(
          addOwnTank({
            unitId: point.id,
            tankName: point.item.name,
            path: point.path,
            initialAmmo: ammoForThisTank,
            spawning_point: point.startPoint,
          }),
        );
      } else if (point.item.type === 'building') {
        dispatch(
          addBuildings({
            unitId: point.id,
            objectName: point.item.name,
            path: point.path,
            spawning_point: point.startPoint,
          }),
        );
      } else if (point.item.type === 'forrest') {
        dispatch(
          addForrest({
            unitId: point.id,
            objectName: point.item.name,
            path: point.path,
            spawning_point: point.startPoint,
          }),
        );
      }
    });
  }, [objectStartPoints, items, dispatch, tankAmmos]);

  useEffect(() => {
    const latestItem = selectedItems[selectedItems.length - 1];
    if (
      (latestItem && latestItem.type === 'tank') ||
      (latestItem && latestItem.type === 'myTank')
    ) {
      setLatestTankId(latestItem.id);
    }
  }, [selectedItems]);

  useEffect(() => {
    const hasTanks = items.some(
      (item) => item.type === 'tank' || item.type === 'myTank',
    );
    setShowInitialAmmo(hasTanks && !manuallyClosed);
  }, [items, manuallyClosed]);

  return (
    <div>
      <div style={{
         backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark black with 40% transparency
         color: 'white', // Text color
         padding: '10px', // Padding around the text
         display: 'flex', // Makes the div horizontal
         justifyContent: 'space-around', // Spacing around items
         alignItems: 'center', // Center items vertically
         borderRadius: '5px', // Optional: round corners

      }}>
            <div>x: 31</div>
            <div>y: 32</div>
            <div>Scale: {zoom} </div>
            <div>1 square = 100m</div>
        </div>
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
                    strokeWidth={4}
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
                height: '51.7vh',
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
                          (objectStartPoints.find(
                            (point) => point.id === item.id,
                          ).startPoint.x +
                            pan.x) *
                          zoom,
                        top:
                          (objectStartPoints.find(
                            (point) => point.id === item.id,
                          ).startPoint.y +
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
      {stylingBox === 1 && (
        <div
          className="initial_ammo_grid_canvas"
          style={{
            height: showInitialAmmo ? '250px' : '0px',
            opacity: showInitialAmmo ? 1 : 0,
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <div className="initial_ammo_main_class">
            <div className="initial_ammo_main_container">
              <div className="initial_ammo_heading">INITIAL AMMO</div>
              <div className="initial_ammo_main_content_container">
                <div
                  className="initial_ammo_close_button"
                  onClick={closeInitialAmmo}
                >
                  <img src={close} alt="close" />
                </div>

                <div className="initial_ammo_title">
                  {initialAmmosTitleArray.map((value, index) => {
                    return (
                      <div
                        key={index}
                        style={{ fontWeight: index === 0 ? 700 : 600 }}
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>
                <div className="initial_ammo_values">
                  {inputArray.map((value, index) =>
                    index === 0 ? (
                      <div
                        key={index}
                        className="initial_ammo_value_first_heading"
                      >
                        {value}
                      </div>
                    ) : (
                      <div
                        key={index}
                        className="initial_ammo_decrement_increment"
                      >
                        <div className="initia_ammo_increment_decrement_content">
                          <input
                            type="number"
                            value={value}
                            onChange={(e) =>
                              handleInputChange(index, e.target.value)
                            }
                          />
                          <div className="buttons_increment_decrement">
                            <button onClick={() => handleIncrement(index)}>
                              <img alt="decrement" src={Decrement} />
                            </button>
                            <button onClick={() => handleDecrement(index)}>
                              <img alt="increment" src={Increment} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
