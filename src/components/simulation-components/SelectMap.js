import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { NavLink } from 'react-router-dom';
import '../../renderer/App.css';
import sandy from '../../TSM-img/map_1.svg';
import green from '../../TSM-img/map_2.svg';
import hilly from '../../TSM-img/map_3.svg';
import car1 from '../../TSM-img/car1.svg';
import MapCarousel from './MapCarousel';
import MapDetailModel from './MapDetailModel';
import data from '../../data.json';
import { ipcRenderer } from 'electron';

export default function SelectMap() {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [show, setShown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mapsData, setMapsData] = useState([]);
  const [images, setImages] = useState([]);

  const props3 = useSpring({
    transform: show ? 'scale(1.03)' : 'scale(1)',
  });
  const fillImagesArray = (numOfMaps) => {
    const images = [sandy, green, hilly];
    const filledArray = [];
  
    for (let i = 0; i < numOfMaps; i++) {
      filledArray.push(images[i % images.length]);
    }
  
    return filledArray;
  };
  

  const maps = images.map((imagen, index) => ({
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

  useEffect(() => {
    ipcRenderer.send('get-maps');
    ipcRenderer.on('get-maps-response', (event, response) => {
      if (response.success) {
        setMapsData(response.data);
  
        // Create an array of images
        const imagesArray = fillImagesArray(response.data.length);
        setImages(imagesArray);
        // Use imagesArray as needed
      } else {
        console.error(response.message);
      }
    });
  
    return () => {
      ipcRenderer.removeAllListeners('get-maps-response');
    };
  }, []);

    const handleDeleteMap = (mapName) => {
      ipcRenderer.send('delete-map', mapName);
    };

    useEffect(() => {
      ipcRenderer.on('delete-map-response', (event, response) => {
        if (response.success) {
          console.log(response.message);
          // Refresh the maps list or show a success message
          ipcRenderer.send('get-maps'); // Fetch updated list
          // window.location.reload();
        } else {
          console.error(response.message);
          // Show error message
        }
      });
    
      return () => {
        ipcRenderer.removeAllListeners('delete-map-response');
      };
    }, []);
  

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

  const selectedMapDetail = mapsData[selectedSlide] || mapsData[0];

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

  if (images.length === 0) {
    return <div>Loading...</div>; // Or any other loading indicator you prefer
  }

  return (
    <div className="select_map_main_class">
      <div className="select_map_main_heading">SELECT MAP</div>
      <div className="map_slider">
        <div className="map_name_details">
          <div className="map_name">{selectedMapDetail?.Name}</div>
          <div className="map_details">{selectedMapDetail?.Area} SQ/M</div>
        </div>
        <div className="map-actions">
        <NavLink style={{backgroundColor:'transparent', border:'solid 1px white', padding:'5px',color:'white',marginRight:'20px'}} to={`/edit_map/${selectedMapDetail?.Name}`} className="edit-map-button">Edit</NavLink>
        <button style={{backgroundColor:'transparent', border:'solid 1px white', padding:'5px',color:'white',cursor:'pointer'}} onClick={() => handleDeleteMap(selectedMapDetail?.Name)} className="delete-map-button">Delete</button>
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
          mapName={selectedMapDetail.Name}
          onClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}
