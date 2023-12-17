import { NavLink } from 'react-router-dom';
import '../renderer/App.css';
import mainMenu from '../TSM-img/main_menu.svg';
import backButton from '../TSM-img/back_button.svg';
import Footer from '../utility/Footer';
import ReportGraph from '../utility/ReportGraph';

export default function Report() {
  const reportData = [
    {
      gunnerName: 'ali ahmed khan',
      armyNumber: 'null',
      unit: 'null',
      groupNumber: 'null',
      duty: 'null',
      date: 'null',
      exerciseTime: 'null',
      mapInfo: 'null',
      numberOfEnemeyVehicles: 'null',
      terrainType: 'null',
      numberOfEnemeySoliders: 'null',
      difficultyLevel: 'null',
      numberOfEnemeyTanks: 'null',
      numberOfEnemeyAPC: 'null',
      noOfMalfunctionsDuringSetup: 'null',
      noOfMalfunctionsDuringMovement: 'null',
      noOfMalfunctionsDuringShooting: 'null',
      noOfMalfunctionsDuringFailures: 'null',
      tanksDestroyed: 'null',
      APCDestroyed: 'null',
      damageTaken: 'null',
      hitsBehindObstacle: 'null',
      hitsOnMovingObject: 'null',
      hitsOnStaticObject: 'null',
      hitOnMovingTanks: 40,
      hitOnMovingAPCs: 50,
      hitOnStaticAPCs: 30,
      hitOnStaticTanks: 70,
      hitOnSoliders: 20,
    },
  ];

  return (
    <div
      className="report_main_class"
      style={{ backgroundImage: `url(${mainMenu})` }}
    >
      <NavLink className="navigation_button" to="/simulation">
        <span id="first_span_navigation_button">
          <img src={backButton} alt="back" /> SIMULATION /
        </span>
        <span id="second_span_navigation_button">REPORT</span>
      </NavLink>

      <div className="report_main_container">
        <div className="report_content">
          <div className="report_content_main_heading">Examination Report</div>
          {reportData.map((data, index) => {
            return (
              <div className="report_conetnt_input_fields_container">
                <div className="report_content_input_field_box_1">
                  <div className="report_conent_input_field_box_1_input_box">
                    <div className="report_conent_input_field_box_1_input_box_title">
                      GUNNER NAME :
                    </div>
                    <div className="report_conent_input_field_box_1_input_box_value">
                      {data.gunnerName}
                    </div>
                  </div>

                  <div className="report_conent_input_field_box_1_input_box">
                    <div className="report_conent_input_field_box_1_input_box_title">
                      ARMY NO. :
                    </div>
                    <div className="report_conent_input_field_box_1_input_box_value">
                      {data.armyNumber}
                    </div>
                  </div>

                  <div className="report_conent_input_field_box_1_input_box">
                    <div className="report_conent_input_field_box_1_input_box_title">
                      UNIT :
                    </div>
                    <div className="report_conent_input_field_box_1_input_box_value">
                      {data.unit}
                    </div>
                  </div>

                  <div className="report_conent_input_field_box_1_input_box">
                    <div className="report_conent_input_field_box_1_input_box_title">
                      GROUP NO. :
                    </div>
                    <div className="report_conent_input_field_box_1_input_box_value">
                      {data.groupNumber}
                    </div>
                  </div>

                  <div className="report_conent_input_field_box_1_input_box">
                    <div className="report_conent_input_field_box_1_input_box_title">
                      DUTY :
                    </div>
                    <div className="report_conent_input_field_box_1_input_box_value">
                      {data.duty}
                    </div>
                  </div>

                  <div className="report_conent_input_field_box_1_input_box">
                    <div className="report_conent_input_field_box_1_input_box_title">
                      DATE :
                    </div>
                    <div className="report_conent_input_field_box_1_input_box_value">
                      {data.date}
                    </div>
                  </div>

                  <div className="report_conent_input_field_box_1_input_box">
                    <div className="report_conent_input_field_box_1_input_box_title">
                      EXERCISE TIME :
                    </div>
                    <div className="report_conent_input_field_box_1_input_box_value">
                      {data.exerciseTime}
                    </div>
                  </div>
                </div>

                <div className="report_content_input_field_box_2">
                  <div className="report_conent_input_field_box_2_input_box_map_info">
                    <div className="report_conent_input_field_box_2_input_box_title_map_info">
                      MAP INFORMATION :
                    </div>
                    <div className="report_conent_input_field_box_2_input_box_value_map_info">
                      {data.mapInfo}
                    </div>
                  </div>

                  <div className="report_conent_input_field_box_2_input_box">
                    <div className="report_conent_input_field_box_2_input_box_title">
                      NO. OF ENEMIES VEHICLES :
                    </div>
                    <div className="report_conent_input_field_box_2_input_box_value">
                      {data.numberOfEnemeyVehicles}
                    </div>
                  </div>

                  <div className="report_conent_input_field_box_2_input_box">
                    <div className="report_conent_input_field_box_2_input_box_title">
                      TERRAIN TYPE :
                    </div>
                    <div className="report_conent_input_field_box_2_input_box_value">
                      {data.terrainType}
                    </div>
                  </div>

                  <div className="report_conent_input_field_box_2_input_box">
                    <div className="report_conent_input_field_box_2_input_box_title">
                      NO. OF ENEMIES SOLIDERS :
                    </div>
                    <div className="report_conent_input_field_box_2_input_box_value">
                      {data.numberOfEnemeySoliders}
                    </div>
                  </div>

                  <div className="report_conent_input_field_box_2_input_box">
                    <div className="report_conent_input_field_box_2_input_box_title">
                      DIFFICULTY LEVEL :
                    </div>
                    <div className="report_conent_input_field_box_2_input_box_value">
                      {data.difficultyLevel}
                    </div>
                  </div>

                  <div className="report_conent_input_field_box_2_input_box">
                    <div className="report_conent_input_field_box_2_input_box_title">
                      NO. OF ENEMIES APCs :
                    </div>
                    <div className="report_conent_input_field_box_2_input_box_value">
                      {data.numberOfEnemeyAPC}
                    </div>
                  </div>

                  <div className="report_conent_input_field_box_2_input_box">
                    <div className="report_conent_input_field_box_2_input_box_title">
                      NO. OF ENEMIES TANKS :
                    </div>
                    <div className="report_conent_input_field_box_2_input_box_value">
                      {data.numberOfEnemeyTanks}
                    </div>
                  </div>
                </div>

                <div className="report_content_input_field_box_4">
                  <div className="report_content_input_field_box_4_main_heading">
                    REPORT
                  </div>
                  <div className="report_content_input_field_box_4_main_content_container">
                    <div className="report_content_input_field_box_4_main_content_container_box_1">
                      <div className="report_content_input_field_box_4_main_content_container_box_1_value_box">
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          No of Malfunctions during Setup:
                        </div>
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          {data.noOfMalfunctionsDuringSetup}
                        </div>
                      </div>

                      <div className="report_content_input_field_box_4_main_content_container_box_1_value_box">
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          No of Malfunctions during movement:
                        </div>
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          {data.noOfMalfunctionsDuringMovement}
                        </div>
                      </div>

                      <div className="report_content_input_field_box_4_main_content_container_box_1_value_box">
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          No of Malfunctions During Shooting:
                        </div>
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          {data.noOfMalfunctionsDuringShooting}
                        </div>
                      </div>

                      <div className="report_content_input_field_box_4_main_content_container_box_1_value_box">
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          No of Malfunctions During Failures:
                        </div>
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          {data.noOfMalfunctionsDuringFailures}
                        </div>
                      </div>

                      <div className="report_content_input_field_box_4_main_content_container_box_1_value_box">
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          Tanks Destroyed:
                        </div>
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          {data.tanksDestroyed}
                        </div>
                      </div>

                      <div className="report_content_input_field_box_4_main_content_container_box_1_value_box">
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          APCS Destroyed:
                        </div>
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          {data.APCDestroyed}
                        </div>
                      </div>

                      <div className="report_content_input_field_box_4_main_content_container_box_1_value_box">
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          Damage Taken:
                        </div>
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          {data.damageTaken}
                        </div>
                      </div>

                      <div className="report_content_input_field_box_4_main_content_container_box_1_value_box">
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          Hits behind obstacles:
                        </div>
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          {data.hitsBehindObstacle}
                        </div>
                      </div>

                      <div className="report_content_input_field_box_4_main_content_container_box_1_value_box">
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          Hits on Moving Objects:
                        </div>
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          {data.hitsOnMovingObject}
                        </div>
                      </div>

                      <div className="report_content_input_field_box_4_main_content_container_box_1_value_box">
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          Hits On Static Objects:
                        </div>
                        <div className="report_content_input_field_box_4_main_content_container_box_1_value_box_value">
                          {data.hitsOnStaticObject}
                        </div>
                      </div>
                    </div>

                    <div className="report_content_input_field_box_4_main_content_container_box_2">
                      <div className="report_content_input_field_box_4_main_content_container_box_2_title">
                        Percentage of hit targets
                      </div>
                      <ReportGraph
                        hitOnMoviongTank={data.hitOnMovingTanks}
                        hitOnMovingAPCs={data.hitOnMovingAPCs}
                        hitOnStaticAPCs={data.hitOnStaticAPCs}
                        hitOnStaticTanks={data.hitOnStaticTanks}
                        hitOnSoliders={data.hitOnSoliders}
                      />
                    </div>
                  </div>

                  <div className="report_total_marks_container">
                    <div className="report_total_marks_title">
                      TOTAL MARKS :
                    </div>
                    <div className="report_total_marks_value">null</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="report_print_btn">PRINT</div>

      <Footer />
    </div>
  );
}
