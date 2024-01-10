import { animated, useSpring } from 'react-spring';
import map1 from '../../TSM-img/map_1.svg';
import map2 from '../../TSM-img/map_2.svg';
import map3 from '../../TSM-img/map_3.svg';
import '../../renderer/App.css';
import data from '../../data.json';
import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';

export default function MapDetailModel({ mapName, onClose }) {
  const backdropAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 300 },
  });

  const modalAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { duration: 300 },
  });
  const [mapDetails, setMapDetails] = useState(null);

  useEffect(() => {
    ipcRenderer.send('get-map-details', mapName);
    ipcRenderer.on('get-map-details-response', (event, response) => {
      if (response.success) {
        setMapDetails(response.data);
      } else {
        console.error(response.message);
      }
    });

    return () => {
      ipcRenderer.removeAllListeners('get-map-details-response');
    };
  }, [mapName]);
  

  const mapImage =
    mapName === 'Desert'
      ? map1
      : mapName === 'Hilly Area'
      ? map2
      : mapName === 'Plateau'
      ? map3
      : map1;

  const muddyForestMapSpecification = data.muddyForestMapSpecification;
  const snowyCapsMapSpecification = data.snowyCapsMapSpecification;
  const dessertMainMapSpecification = data.dessertMainMapSpecification;

  const mapSpecification =
    mapName === 'MUDDY FOREST'
      ? muddyForestMapSpecification
      : mapName === 'SNOWY CAPS'
      ? snowyCapsMapSpecification
      : mapName === 'DESSERT MAIN'
      ? dessertMainMapSpecification
      : muddyForestMapSpecification;

  return (
    <animated.div
      style={backdropAnimation}
      className="map_detail_model_backdrop"
      onClick={onClose}
    >
      <animated.div
        style={modalAnimation}
        className="map_detail_model_content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="map_name_and_image">
          <div className="map_detail_modal_heading">MAP</div>
          <img
            src={mapImage}
            alt="map"
            className="map_image_map_detail_modal"
          />
        </div>
        <div className="map_details_main_container">
          <div className="map_detail_modal_heading">SPECIFICATIONS</div>
          <div className="map_detail_modal_specs">
            {/* {mapSpecification.map((spec, index) => {
              return (
                <div className="specification_detail" key={index}>
                  <div className="sepcification_detail_name">
                    {spec.specName}
                  </div>
                  <div className="sepcification_detail_value">
                    {spec.specValue}
                  </div>
                </div>
              );
            })} */}
            
            <div className="map_detail_modal_specs">
                        {mapDetails && (
                          <>
                            <div className="specification_detail">
                              <div className="sepcification_detail_name">Name</div>
                              <div className="sepcification_detail_value">{mapDetails.Name}</div>
                            </div>
                            <div className="specification_detail">
                              <div className="sepcification_detail_name">Area</div>
                              <div className="sepcification_detail_value">{mapDetails.Area} SQ/M</div>
                            </div>
                            {/* Add more fields as needed */}
                          <div className="specification_detail">
                            <div className="sepcification_detail_name">
                              Exercise Time
                            </div>
                            <div className="sepcification_detail_value">
                            {mapDetails.time}
                            </div>
                          </div>
                          <div className="specification_detail">
                            <div className="sepcification_detail_name">
                              No of Enemies
                            </div>
                            <div className="sepcification_detail_value">
                            {mapDetails.NoOfenemy}
                            </div>
                          </div>
                          <div className="specification_detail">
                            <div className="sepcification_detail_name">
                              Terrain
                            </div>
                            <div className="sepcification_detail_value">
                            {mapDetails.Terrain}
                            </div>
                          </div>
                          </>
                        )}
                      </div>
                
               
                

          </div>
        </div>
      </animated.div>
    </animated.div>
  );
}
