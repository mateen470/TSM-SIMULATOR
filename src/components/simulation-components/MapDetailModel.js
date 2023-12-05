import { animated, useSpring } from 'react-spring';
import map1 from '../../TSM-img/map_1.svg';
import map2 from '../../TSM-img/map_2.svg';
import map3 from '../../TSM-img/map_3.svg';
import '../../renderer/App.css';

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

  const mapImage =
    mapName === 'MUDDY FOREST'
      ? map1
      : mapName === 'SNOWY CAPS'
      ? map2
      : mapName === 'DESSERT MAIN'
      ? map3
      : map1;

  const muddyForestMapSpecification = [
    { specName: 'Area', specValue: '2000 sq/m' },
    { specName: 'Difficulty', specValue: 'Hard' },
    { specName: 'No. of enemies', specValue: '15 Vehicles' },
    { specName: 'Windspeed', specValue: '1.5 km/h' },
    { specName: 'Wind Direction', specValue: '120 O' },
    { specName: 'Temperature', specValue: '20 Celsius ' },
    { specName: 'Season', specValue: 'Fall ' },
    { specName: 'Fire Interval', specValue: '10 seconds ' },
  ];
  const snowyCapsMapSpecification = [
    { specName: 'Area', specValue: '2000 sq/m' },
    { specName: 'Difficulty', specValue: 'Medium' },
    { specName: 'No. of enemies', specValue: '35 Vehicles' },
    { specName: 'Windspeed', specValue: '7.5 km/h' },
    { specName: 'Wind Direction', specValue: '130 O' },
    { specName: 'Temperature', specValue: '30 Celsius ' },
    { specName: 'Season', specValue: 'Winter ' },
    { specName: 'Fire Interval', specValue: '30 seconds ' },
  ];
  const dessertMainMapSpecification = [
    { specName: 'Area', specValue: '2000 sq/m' },
    { specName: 'Difficulty', specValue: 'Easy' },
    { specName: 'No. of enemies', specValue: '25 Vehicles' },
    { specName: 'Windspeed', specValue: '8.5 km/h' },
    { specName: 'Wind Direction', specValue: '150 O' },
    { specName: 'Temperature', specValue: '30 Celsius ' },
    { specName: 'Season', specValue: 'Summer ' },
    { specName: 'Fire Interval', specValue: '20 seconds ' },
  ];

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
            {mapSpecification.map((spec, index) => {
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
            })}
          </div>
        </div>
      </animated.div>
    </animated.div>
  );
}
