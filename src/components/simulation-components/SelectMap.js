import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { NavLink } from 'react-router-dom';
import '../../renderer/App.css';
import map1 from '../../TSM-img/map_1.svg';
import map2 from '../../TSM-img/map_2.svg';
import map3 from '../../TSM-img/map_3.svg';
import MapCarousel from './MapCarousel';
import MapDetailModel from './MapDetailModel';
import data from '../../data.json';

export default function SelectMap() {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [show, setShown] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const props3 = useSpring({
    transform: show ? 'scale(1.03)' : 'scale(1)',
  });

  const maps = [map1, map2, map3].map((imagen, index) => ({
    key: index,
    content: (
      <animated.div
        className="map_image"
        style={props3}
        onMouseEnter={() => setShown(true)}
        onMouseLeave={() => setShown(false)}
      >
        <img src={imagen} alt={`Map ${index + 1}`} />
      </animated.div>
    ),
  }));

  const handleSlideChange = (newIndex) => {
    setSelectedSlide(newIndex);
  };
  const openMapDetailModel = () => {
    setOpenModal(!openModal);
  };
  const handleClickOutside = (event) => {
    if (event.target.className.includes('map_detail_model_main_class')) {
      setOpenModal(false);
    }
  };

  const mapDetail = data.mapNameAndAreaForSelectMapPage;

  const selectedMapDetail = mapDetail[selectedSlide] || mapDetail[0];

  useEffect(() => {
    if (openModal) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openModal]);

  return (
    <div className="select_map_main_class">
      <div className="select_map_main_heading">SELECT MAP</div>
      <div className="map_slider">
        <div className="map_name_details">
          <div className="map_name">{selectedMapDetail.name}</div>
          <div className="map_details">{selectedMapDetail.area} SQ/M</div>
        </div>
        <div className="map_main_container">
          <MapCarousel
            cards={maps}
            height="40vh"
            width="100%"
            margin="0 auto"
            offset={2}
            showArrows={false}
            onSlideChange={handleSlideChange}
          />
        </div>
        <div className="select_map_button_group_main_class">
          <div className="select_map_button_group">
            <NavLink to={'/create_map'} className="select_map_button">
              CREATE NEW
            </NavLink>
            <div
              className="select_map_button"
              type="button"
              onClick={openMapDetailModel}
            >
              PREVIEW
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <MapDetailModel
          mapName={selectedMapDetail.name}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}
