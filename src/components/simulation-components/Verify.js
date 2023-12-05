import '../../renderer/App.css';
import map3 from '../../TSM-img/map_3.svg';

export default function Verify() {
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

  return (
    <div className="verify_main_class">
      <div className="verify_main_content_container">
        <div className="verify_main_heading">Verify Simulation</div>
        <div className="verify_text_below_main_heading">
          Please Verify the below information to be used?
        </div>
        <div className="verify_simulation_instructor_student_container">
          <div className="verify_simulation_instructor_student_heading">
            Instructor
          </div>
          <div className="verify_simulation_instructor_student_name">
            dummy_name
          </div>
        </div>
        <div className="verify_simulation_instructor_student_container">
          <div className="verify_simulation_instructor_student_heading">
            Student
          </div>
          <div className="verify_simulation_instructor_student_name">
            dummy_name
          </div>
        </div>
        <div className="verify_parameters_container">
          <div className="verify_paramters_heading">Parameters</div>
          <div className="verify_paramters_specification">
            <div className="verify_paramters_map_name_and_image">
              <div>MAP</div>
              <img
                src={map3}
                alt="map"
                className="map_image_map_detail_modal"
              />
            </div>
            <div className="map_details_main_container">
              <div>SPECIFICATIONS</div>
              <div className="map_detail_modal_specs">
                {dessertMainMapSpecification.map((spec, index) => {
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
          </div>
          <div className="verify_note">
            <div className="note_heading">NOTE</div>
            <div className="note_content">
              Some of the parameters cannot be changed during the simulation!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
