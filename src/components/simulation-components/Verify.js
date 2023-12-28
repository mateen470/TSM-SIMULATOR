import data from '../../data.json';
import '../../renderer/App.css';
import map1 from '../../TSM-img/map_1.svg';
import map2 from '../../TSM-img/map_2.svg';
import map3 from '../../TSM-img/map_3.svg';

export default function Verify() {
  const verifyPageArray = data.verifyPageArray;

  return (
    <div className="verify_main_class">
      {verifyPageArray.map((data, index) => {
        return (
          <div className="verify_main_content_container" key={index}>
            <div className="verify_main_heading">Verify Simulation</div>
            <div className="verify_text_below_main_heading">
              Please Verify the below information to be used?
            </div>
            <div className="verify_simulation_instructor_student_container">
              <div className="verify_simulation_instructor_student_heading">
                Instructor
              </div>
              <div className="verify_simulation_instructor_student_name">
                {data.instrcutor}
              </div>
            </div>
            <div className="verify_simulation_instructor_student_container">
              <div className="verify_simulation_instructor_student_heading">
                Student
              </div>
              <div className="verify_simulation_instructor_student_name">
                {data.student}
              </div>
            </div>
            <div className="verify_parameters_container">
              <div className="verify_paramters_heading">Parameters</div>
              <div className="verify_paramters_specification">
                <div className="verify_paramters_map_name_and_image">
                  <div>MAP</div>
                  <img
                    src={
                      data.mapName === 'MUDDY FOREST'
                        ? map1
                        : data.mapName === 'SNOWY CAPS'
                        ? map2
                        : map3
                    }
                    alt="map"
                    className="map_image_map_detail_modal"
                  />
                </div>
                <div className="map_details_main_container">
                  <div>SPECIFICATIONS</div>
                  <div className="map_detail_modal_specs">
                    {data.mapSpecs?.map((spec, index) => {
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
                  Some of the parameters cannot be changed during the
                  simulation!
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
