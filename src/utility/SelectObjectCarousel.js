import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/CarouselSelectedItemSlice';
import MapCarousel from '../components/simulation-components/MapCarousel';
import '../renderer/App.css';
import tank1 from '../TSM-img/tank1.svg';
import tank2 from '../TSM-img/tank2.svg';
import forest1 from '../TSM-img/forest1.svg';
import forest2 from '../TSM-img/forest2.svg';
import car1 from '../TSM-img/car1.svg';
import car2 from '../TSM-img/car2.svg';
import house1 from '../TSM-img/house1.svg';
import house2 from '../TSM-img/house2.svg';
import data from '../data.json';

const selectEnemyArray = data.selectEnemyArray;
const selectEnemyObjectsArray = data.selectEnemyObjectsArray;
const selectBuildingsArray = data.selectBuildingsArray;
const selectNaturalObjectsArray = data.selectNaturalObjectsArray;
const selectYourTank = data.selectYourTank;

export default function SelectObjectCarousel({ carouselObjectType }) {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [show, setShown] = useState(false);
  const dispatch = useDispatch();

  const props3 = useSpring({
    transform: show ? 'scale(1.03)' : 'scale(1)',
  });

  const [detailsProps, setDetailsProps] = useSpring(() => ({
    opacity: 1,
    transform: 'translateX(0px)',
    from: { opacity: 0, transform: 'translateX(100px)' },
  }));

  const handleSlideChange = (newIndex) => {
    if (newIndex !== selectedSlide) {
      setSelectedSlide(newIndex);
      setDetailsProps({
        opacity: 1,
        transform: 'translateX(0px)',
        from: { opacity: 0, transform: 'translateX(100px)' },
        reset: true,
      });
    }
  };

  const chosenArray =
    carouselObjectType === 1
      ? selectEnemyArray
      : carouselObjectType === 2
      ? selectEnemyObjectsArray
      : carouselObjectType === 3
      ? selectBuildingsArray
      : carouselObjectType === 4
      ? selectNaturalObjectsArray
      : carouselObjectType === 5
      ? selectYourTank
      : selectEnemyArray;

  const imageMap = {
    tank1: tank1,
    tank2: tank2,
    car1: car1,
    car2: car2,
    house1: house1,
    house2: house2,
    forest1: forest1,
    forest2: forest2,
  };

  const getImage = (imageName) => imageMap[imageName];

  const handleDispatchItem = () => {
    const selectedItem = chosenArray[0]?.objects[selectedSlide];
    if (selectedItem) {
      dispatch(addItem(selectedItem));
    }
  };

  const objectsImagesOfCarousel = chosenArray[0]?.objects.map((obj, index) => ({
    key: index,
    content: (
      <animated.div
        className="carousel_image"
        style={props3}
        onMouseEnter={() => setShown(true)}
        onMouseLeave={() => setShown(false)}
      >
        <img src={getImage(obj.image)} alt={obj.name} />
      </animated.div>
    ),
  }));

  const selectedObject = chosenArray[0]?.objects[selectedSlide];

  return (
    <div className="select_object_main_class">
      {chosenArray.map((object, index) => {
        return (
          <>
            <div className="select_object_type_name" key={index}>
              {object.title}
            </div>
            <div className="select_object_main_container">
              <MapCarousel
                cards={objectsImagesOfCarousel}
                height="38vh"
                width="100%"
                margin="0 auto"
                offset={2}
                showArrows={false}
                onSlideChange={handleSlideChange}
              />
            </div>

            <div className="selected_object_details">
              <animated.div style={detailsProps}>
                <div className="selected_object_details_object_name">
                  <div>{selectedObject?.name}</div>
                  <div className="btn_main_container">
                    <button className="btn btn1" onClick={handleDispatchItem}>
                      ADD
                    </button>
                  </div>
                </div>
                <div className="selected_object_details_values_container">
                  {selectedObject?.details.map((detail, detailIndex) => (
                    <div
                      className="selected_object_details_values"
                      key={detailIndex}
                    >
                      <div
                        className="selcted_object_detail_title_value"
                        style={{ fontWeight: 700 }}
                      >
                        {detail.title}
                      </div>
                      <div className="selcted_object_detail_title_value">
                        {detail.value}
                      </div>
                    </div>
                  ))}
                  <div className="center_border" />
                </div>
              </animated.div>
            </div>
          </>
        );
      })}
    </div>
  );
}
