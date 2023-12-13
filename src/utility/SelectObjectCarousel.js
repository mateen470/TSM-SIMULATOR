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

const selectEnemyArray = [
  {
    title: 'SELECT ENEMY',
    objects: [
      {
        type: 'tank',
        image: tank1,
        status: 'dangerous',
        name: 'ARJUN',
        details: [
          { title: 'Qty.', value: 2 },
          { title: 'Weight', value: '51 Ton' },
          { title: 'Fire Rate', value: '31 / minute' },
          { title: 'Top Speed', value: '92 / kmh' },
          { title: 'Strength', value: 'Very High' },
          { title: 'Endurance', value: 'Very High' },
        ],
      },
      {
        type: 'tank',
        image: tank2,
        status: 'dangerous',
        name: 'PANTHER',
        details: [
          { title: 'Qty.', value: 5 },
          { title: 'Weight', value: '52 Ton' },
          { title: 'Fire Rate', value: '51 / minute' },
          { title: 'Top Speed', value: '62 / kmh' },
          { title: 'Strength', value: 'Very High' },
          { title: 'Endurance', value: 'Very High' },
        ],
      },
      {
        type: 'tank',
        image: tank1,
        status: 'dangerous',
        name: 'T-80UD',
        details: [
          { title: 'Qty.', value: 3 },
          { title: 'Weight', value: '57 Ton' },
          { title: 'Fire Rate', value: '21 / minute' },
          { title: 'Top Speed', value: '82 / kmh' },
          { title: 'Strength', value: 'Very High' },
          { title: 'Endurance', value: 'Very High' },
        ],
      },
    ],
  },
];

const selectEnemyObjectsArray = [
  {
    title: ' ENEMY OBJECTS',
    objects: [
      {
        type: 'car',
        image: car1,
        status: 'dangerous',
        name: 'WILLYS MB',
        details: [
          { title: 'Qty.', value: 2 },
          { title: 'Type', value: '4 x 4' },
          { title: 'Capacity', value: '4 Soliders' },
          { title: 'Top Speed', value: '62 / kmh' },
          { title: 'Strength', value: 'Very High' },
          { title: 'Endurance', value: 'Very High' },
        ],
      },
      {
        type: 'car',
        image: car2,
        status: 'dangerous',
        name: 'PRADO',
        details: [
          { title: 'Qty.', value: 3 },
          { title: 'Type', value: '4 x 4' },
          { title: 'Capacity', value: '8 Soliders' },
          { title: 'Top Speed', value: '72 / kmh' },
          { title: 'Strength', value: 'Very High' },
          { title: 'Endurance', value: 'Very High' },
        ],
      },
      {
        type: 'car',
        image: car2,
        status: 'dangerous',
        name: 'LAND CRUISER',
        details: [
          { title: 'Qty.', value: 5 },
          { title: 'Type', value: '4 x 4' },
          { title: 'Capacity', value: '9 Soliders' },
          { title: 'Top Speed', value: '92 / kmh' },
          { title: 'Strength', value: 'Very High' },
          { title: 'Endurance', value: 'Very High' },
        ],
      },
    ],
  },
];

const selectBuildingsArray = [
  {
    title: ' BUILDINGS',
    objects: [
      {
        type: 'building',
        image: house1,
        status: 'not-dangerous',
        name: 'DENSE TOWN',
        details: [
          { title: 'Buildings.', value: 6 },
          { title: 'Type', value: 'Urban' },
          { title: 'Area', value: '5000 sq / m' },
          { title: 'Roads', value: 'Yes' },
          { title: 'Category', value: 'Concrete' },
          { title: 'Big Buildings', value: 10 },
        ],
      },
      {
        type: 'building',
        image: house2,
        status: 'not-dangerous',
        name: 'FACTORY',
        details: [
          { title: 'Buildings.', value: 2 },
          { title: 'Type', value: 'Rural' },
          { title: 'Area', value: '100 sq / m' },
          { title: 'Roads', value: 'Yes' },
          { title: 'Category', value: 'Concrete' },
          { title: 'Big Buildings', value: 1 },
        ],
      },
      {
        type: 'building',
        image: house1,
        status: 'not-dangerous',
        name: 'DENSE TOWN',
        details: [
          { title: 'Buildings.', value: 8 },
          { title: 'Type', value: 'Urban' },
          { title: 'Area', value: '2000 sq / m' },
          { title: 'Roads', value: 'Yes' },
          { title: 'Category', value: 'Concrete' },
          { title: 'Big Buildings', value: 13 },
        ],
      },
    ],
  },
];

const selectNaturalObjectsArray = [
  {
    title: ' NATURAL OBJECTS',
    objects: [
      {
        type: 'forrest',
        image: forest1,
        status: 'not-dangerous',
        name: 'RAIN FOREST',
        details: [
          { title: 'Trees.', value: 11 },
          { title: 'Area', value: '5000 sq / m' },
          { title: 'Landscape', value: 'Minor hilly' },
          { title: 'Buildings', value: 'No' },
          { title: 'Roads', value: 'Yes' },
          { title: 'Category', value: 'Natural' },
        ],
      },
      {
        type: 'forrest',
        image: forest2,
        status: 'not-dangerous',
        name: 'GOLF COURSE',
        details: [
          { title: 'Trees.', value: 12 },
          { title: 'Area', value: '3000 sq / m' },
          { title: 'Landscape', value: 'Minor hilly' },
          { title: 'Buildings', value: 'No' },
          { title: 'Roads', value: 'Yes' },
          { title: 'Category', value: 'Natural' },
        ],
      },
      {
        type: 'forrest',
        image: forest1,
        status: 'not-dangerous',
        name: 'DRY FOREST',
        details: [
          { title: 'Trees.', value: 13 },
          { title: 'Area', value: '8000 sq / m' },
          { title: 'Landscape', value: 'Minor hilly' },
          { title: 'Buildings', value: 'No' },
          { title: 'Roads', value: 'Yes' },
          { title: 'Category', value: 'Natural' },
        ],
      },
    ],
  },
];

const selectYourTank = [
  {
    title: 'SELECT TANK',
    objects: [
      {
        type: 'myTank',
        status: 'own-tank',
        image: tank1,
        name: 'ARJUN',
        details: [
          { title: 'Qty.', value: 2 },
          { title: 'Weight', value: '51 Ton' },
          { title: 'Fire Rate', value: '31 / minute' },
          { title: 'Top Speed', value: '92 / kmh' },
          { title: 'Strength', value: 'Very High' },
          { title: 'Endurance', value: 'Very High' },
        ],
      },
      {
        type: 'myTank',
        status: 'own-tank',
        image: tank2,
        name: 'T-69',
        details: [
          { title: 'Qty.', value: 5 },
          { title: 'Weight', value: '52 Ton' },
          { title: 'Fire Rate', value: '51 / minute' },
          { title: 'Top Speed', value: '62 / kmh' },
          { title: 'Strength', value: 'Very High' },
          { title: 'Endurance', value: 'Very High' },
        ],
      },
      {
        type: 'myTank',
        status: 'own-tank',
        image: tank1,
        name: 'T-80UD',
        details: [
          { title: 'Qty.', value: 3 },
          { title: 'Weight', value: '57 Ton' },
          { title: 'Fire Rate', value: '21 / minute' },
          { title: 'Top Speed', value: '82 / kmh' },
          { title: 'Strength', value: 'Very High' },
          { title: 'Endurance', value: 'Very High' },
        ],
      },
    ],
  },
];

export default function SelectObjectCarousel({ carouselObjectType }) {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [show, setShown] = useState(false);
  const [currentSelectedItem, setCurrentSelectedItem] = useState(null);
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
        <img src={obj.image} alt={obj.name} />
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
