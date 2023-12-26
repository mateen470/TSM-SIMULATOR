import { useState } from 'react';
import '../../renderer/App.css';
import redLight from '../../TSM-img/redLight.svg';
import greenLight from '../../TSM-img/greenLight.svg';
import grrenToggle from '../../TSM-img/greenToggle.svg';
import redToggle from '../../TSM-img/redToggle.svg';
import knobOfFirstRow from '../../TSM-img/knobOfFirstRow.svg';
import joystickDown from '../../TSM-img/joystickDown.svg';
import joystickUp from '../../TSM-img/joystickUp.svg';
import greyDial from '../../TSM-img/greyDial.svg';
import greyKnob from '../../TSM-img/greyKnob.svg';
import blackLight from '../../TSM-img/blackLight.svg';
import redBtn from '../../TSM-img/redBtn.svg';
import joystickRight from '../../TSM-img/joystickRight.svg';
import joystickLeft from '../../TSM-img/joystickLeft.svg';
import metalSlider from '../../TSM-img/metalSlider.svg';
import metalSliderKnob from '../../TSM-img/metalSliderKnob.svg';
import blackSliderKnob from '../../TSM-img/blackSliderKnob.svg';
import blackSliderTrack from '../../TSM-img/blackSliderTrack.svg';
import whiteLight from '../../TSM-img/whiteLight.svg';
import directionBtn from '../../TSM-img/directionBtn.svg';

export default function FireControl() {
  const [ammo, setAmmo] = useState('apfsds');
  const [toggleFirstAndLast, setToggleFirstAndLast] = useState('first');
  const [opMode, setOpMode] = useState('test');
  const [RNGmode, setRNGMode] = useState('emerg');
  const [toggleMoveAndFix, setToggleMoveAndFix] = useState('move');
  const [KM, setKM] = useState(false);
  const [HM, setHM] = useState(false);
  const [DM, setDM] = useState(false);
  const [bigDial, setBigDial] = useState('CPU');
  const [CPDandSCD, setCPDandSCD] = useState(false);
  const [PDR, setPDR] = useState({ slider1: false, slider2: false });
  const [AJR, setAJR] = useState({ slider1: false, slider2: false });
  const [WIND, setWIND] = useState({ slider1: false, slider2: false });
  const [MVS, setMVS] = useState({ slider1: false, slider2: false });
  const [direction, setDirection] = useState('');
  const [autoManual, setAutoManual] = useState('auto');
  const [clutch, setClutch] = useState('9');

  const initialSwitchStates = {
    HEAT: { AZ: Array(6).fill(false), EL: Array(6).fill(false) },
    HESH: { AZ: Array(6).fill(false), EL: Array(6).fill(false) },
    APFSDS: { AZ: Array(6).fill(false), EL: Array(6).fill(false) },
  };

  const [blackSliderSwitchStates, setBlackSliderSwitchStates] =
    useState(initialSwitchStates);

  const toggleSwitch = (type, row, index) => {
    const newStates = { ...blackSliderSwitchStates };
    newStates[type][row][index] = !newStates[type][row][index];
    setBlackSliderSwitchStates(newStates);
  };

  const toggleSlider = (slider) => {
    setPDR({ ...PDR, [slider]: !PDR[slider] });
  };
  const toggleSliderAJR = (slider) => {
    setAJR({ ...AJR, [slider]: !AJR[slider] });
  };
  const toggleSliderWIND = (slider) => {
    setWIND({ ...WIND, [slider]: !WIND[slider] });
  };
  const toggleSliderMVS = (slider) => {
    setMVS({ ...MVS, [slider]: !MVS[slider] });
  };

  return (
    <div className="dashboard_fire_control_container">
      <div className="dashboard_fire_control_main_content">
        <div className="dashboard_fire_control_main_heading">
          FIRE CONTROL COMPUTER
        </div>

        <div className="dashboard_first_set_lights">
          <div className="dashboard_first_set_lights_box">
            <div className="dashboard_first_set_lights_box_text">PS</div>
            <div className="dashboard_first_set_lights_box_image">
              <img src={redLight} alt="red-light" />
            </div>
          </div>

          <div className="dashboard_first_set_lights_box">
            <div className="dashboard_first_set_lights_box_text">CHRG</div>
            <div className="dashboard_first_set_lights_box_image">
              <img src={redLight} alt="red-light" />
            </div>
          </div>

          <div className="dashboard_first_set_lights_box">
            <div className="dashboard_first_set_lights_box_text">CBT</div>
            <div className="dashboard_first_set_lights_box_image">
              <img src={greenLight} alt="red-light" />
            </div>
          </div>
        </div>

        <div className="dashboard_second_set_red_digit_box">
          <div className="dashboard_second_set_red_digit_box_value">0</div>
          <div className="dashboard_second_set_red_digit_box_value">0</div>
          <div className="dashboard_second_set_red_digit_box_value">0</div>
          <div className="dashboard_second_set_red_digit_box_value">0</div>
          <div className="dashboard_second_set_red_digit_box_value">0</div>
        </div>

        <div className="dashboard_third_set_knob_switches">
          <div className="dashboard_third_set_knob_switches_group">
            <div
              className="dashboard_third_set_knob_switches_group_box"
              onClick={() => setAmmo('apfsds')}
            >
              <div className="dashboard_third_set_knob_switches_group_box_heading">
                APFSDS
              </div>
              <img src={redToggle} alt="knob-switch" />
            </div>

            <div
              className="dashboard_third_set_knob_switches_group_box"
              onClick={() => setAmmo('hesh')}
            >
              <div className="dashboard_third_set_knob_switches_group_box_heading">
                HESH
              </div>
              <img src={redToggle} alt="knob-switch" />
            </div>

            <div
              className="dashboard_third_set_knob_switches_group_box"
              onClick={() => setAmmo('heat')}
            >
              <div className="dashboard_third_set_knob_switches_group_box_heading">
                HEAT
              </div>
              <img src={redToggle} alt="knob-switch" />
            </div>

            <div
              className="dashboard_third_set_knob_switches_group_box"
              onClick={() => setAmmo('mg')}
            >
              <div className="dashboard_third_set_knob_switches_group_box_heading">
                MG
              </div>
              <img src={redToggle} alt="knob-switch" />
            </div>

            <div
              className="dashboard_third_set_knob_switches_group_box"
              onClick={() => setAmmo('sp')}
            >
              <div className="dashboard_third_set_knob_switches_group_box_heading">
                SP
              </div>
              <img src={redToggle} alt="knob-switch" />
            </div>
          </div>

          <div className="dashboard_third_set_knob_container">
            <div className="dashboard_third_set_knob_side_switches_box">
              <img src={grrenToggle} alt="knob-switch" />
              <div className="dashboard_third_set_knob_side_switches_heading">
                LASER
              </div>
            </div>

            <div className="dashboard_third_set_knob_container_main_knob_box">
              <div
                className="dashboard_third_set_knob_container_main_knob"
                style={{
                  transition: 'transform 0.4s ease-in-out',
                  transform:
                    ammo === 'apfsds'
                      ? 'rotate(-50deg)'
                      : ammo === 'hesh'
                      ? 'rotate(-30deg)'
                      : ammo === 'heat'
                      ? 'rotate(0deg)'
                      : ammo === 'mg'
                      ? 'rotate(35deg)'
                      : 'rotate(55deg)',
                }}
              >
                <img src={knobOfFirstRow} alt="knob" />
              </div>
              <div className="dashboard_third_set_knob_container_main_knob_heading">
                AMMO
              </div>
            </div>

            <div className="dashboard_third_set_knob_side_switches_box">
              <img src={grrenToggle} alt="knob-switch" />
              <div className="dashboard_third_set_knob_side_switches_heading">
                FAULT
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard_fourth_set_joystick">
          <div
            className="dashboard_fourth_set_joystick_text"
            onClick={() => setToggleFirstAndLast('first')}
          >
            FIRST
          </div>
          <img
            src={toggleFirstAndLast === 'last' ? joystickDown : joystickUp}
            alt="joystick"
          />
          <div
            className="dashboard_fourth_set_joystick_text"
            onClick={() => setToggleFirstAndLast('last')}
          >
            LAST
          </div>
        </div>

        <div className="dashboard_fifth_set_grey_dial">
          <div
            className="dashboard_dial_tick test"
            onClick={() => setOpMode('test')}
          >
            TEST
          </div>
          <div
            className="dashboard_dial_tick pre"
            onClick={() => setOpMode('pre')}
          >
            PRE.
          </div>
          <div
            className="dashboard_dial_tick cbt"
            onClick={() => setOpMode('cbt')}
          >
            CBT
          </div>
          <div
            className="dashboard_dial_tick dff"
            onClick={() => setOpMode('dff')}
          >
            DFF/FS
          </div>
          <div
            className="dashboard_dial_image"
            style={{
              transition: 'transform 0.4s ease-in-out',
              transform:
                opMode === 'test'
                  ? 'rotate(-70deg)'
                  : opMode === 'pre'
                  ? 'rotate(-30deg)'
                  : opMode === 'cbt'
                  ? 'rotate(30deg)'
                  : 'rotate(70deg)',
            }}
          >
            <img src={greyDial} alt="grey-dial" />
          </div>
          <div className="dashboard_fifth_set_grey_dial_title">OP. MODE</div>
        </div>

        <div className="dashboard_sixth_set_grey_knob">
          <div
            className="dashboard_dial_tick emerg"
            onClick={() => setRNGMode('emerg')}
          >
            EMERG
          </div>
          <div
            className="dashboard_dial_tick man"
            onClick={() => setRNGMode('man')}
          >
            MAN.
          </div>
          <div
            className="dashboard_dial_tick laser"
            onClick={() => setRNGMode('laser')}
          >
            LASER
          </div>
          <div
            className="dashboard_dial_image grey_knob"
            style={{
              transition: 'transform 0.4s ease-in-out',
              transform:
                RNGmode === 'emerg'
                  ? 'rotate(-95deg)'
                  : RNGmode === 'man'
                  ? 'rotate(-48deg)'
                  : 'rotate(8deg)',
            }}
          >
            <img src={greyKnob} alt="grey-knob" />
          </div>
          <div className="dashboard_sixth_set_grey_knob_title">
            RNG SET. MODE
          </div>
        </div>

        <div className="dashboard_seventh_set_black_light">
          <img src={blackLight} alt="black-light" />
          <div className="dashboard_seventh_set_black_light_text">MRA</div>
        </div>

        <div className="dashboard_eight_set_red_light">
          <img src={redBtn} alt="red-light" />
          <div className="dashboard_eight_set_black_light_text">MRD</div>
        </div>

        <div className="dashboard_eight_set_joystick">
          <div
            className="dashboard_eight_set_joystick_text"
            onClick={() => setToggleFirstAndLast('first')}
          >
            FIRST
          </div>
          <img
            src={toggleFirstAndLast === 'last' ? joystickDown : joystickUp}
            alt="joystick"
          />
          <div
            className="dashboard_eight_set_joystick_text"
            onClick={() => setToggleFirstAndLast('last')}
          >
            LAST
          </div>
        </div>

        <div className="dashboard_ninth_set_red_light">
          <img src={redBtn} alt="red-light" />
          <div className="dashboard_ninth_set_black_light_text">RESET</div>
        </div>

        <div className="dashboard_tenth_set_joystick">
          <div
            className="dashboard_tenth_set_joystick_text"
            onClick={() => setToggleMoveAndFix('move')}
          >
            MOVE
          </div>
          <img
            src={toggleMoveAndFix === 'fix' ? joystickRight : joystickLeft}
            alt="joystick"
          />
          <div
            className="dashboard_tenth_set_joystick_text"
            onClick={() => setToggleMoveAndFix('fix')}
          >
            FIX
          </div>
        </div>

        <div className="dashboard_eleventh_set_metal_slider">
          <div
            className="dashboard_eleventh_set_metal_slider_box"
            onClick={() => setKM(!KM)}
          >
            <div className="dashboard_eleventh_set_metal_slider_title">KM</div>
            <img
              src={metalSlider}
              alt="metal-slider"
              className="metal_slider_KM"
            />
            <img
              src={metalSliderKnob}
              alt="metal-slider-knob"
              className={
                !KM
                  ? 'metal_slider_knob_KM metal_slider_knob_bottom'
                  : 'metal_slider_knob_KM'
              }
            />
          </div>

          <div
            className="dashboard_eleventh_set_metal_slider_box"
            onClick={() => setHM(!HM)}
          >
            <div className="dashboard_eleventh_set_metal_slider_title">HM</div>
            <img
              src={metalSlider}
              alt="metal-slider"
              className="metal_slider_HM"
            />
            <img
              src={metalSliderKnob}
              alt="metal-slider-knob"
              className={
                !HM
                  ? 'metal_slider_knob_HM metal_slider_knob_bottom'
                  : 'metal_slider_knob_HM'
              }
            />
          </div>

          <div
            className="dashboard_eleventh_set_metal_slider_box"
            onClick={() => setDM(!DM)}
          >
            <div className="dashboard_eleventh_set_metal_slider_title">DM</div>
            <img
              src={metalSlider}
              alt="metal-slider"
              className="metal_slider_DM"
            />
            <img
              src={metalSliderKnob}
              alt="metal-slider-knob"
              className={
                !DM
                  ? 'metal_slider_knob_DM metal_slider_knob_bottom'
                  : 'metal_slider_knob_DM'
              }
            />
          </div>

          <div className="dashboard_eleventh_set_metal_slider_heading">
            MRS. (M)
          </div>
        </div>

        <div className="dashboard_12th_set_metal_slider">
          <div className="dashboard_12th_set_metal_slider_container">
            <div
              className="dashboard_12th_set_metal_slider_box"
              onClick={() => toggleSlider('slider1')}
            >
              <img
                src={metalSlider}
                alt="metal-slider"
                className="metal_slider_PDR"
              />
              <img
                src={metalSliderKnob}
                alt="metal-slider-knob"
                className={
                  !PDR.slider1
                    ? 'metal_slider_knob_PDR metal_slider_knob_bottom_12th_set'
                    : 'metal_slider_knob_PDR'
                }
              />
            </div>
            <div
              className="dashboard_12th_set_metal_slider_box"
              onClick={() => toggleSlider('slider2')}
            >
              <img
                src={metalSlider}
                alt="metal-slider"
                className="metal_slider_PDR_2"
              />
              <img
                src={metalSliderKnob}
                alt="metal-slider-knob"
                className={
                  !PDR.slider2
                    ? 'metal_slider_knob_PDR_2 metal_slider_knob_bottom_12th_set'
                    : 'metal_slider_knob_PDR_2'
                }
              />
            </div>
            <div className="dashboard_12th_set_metal_slider_title_PDR">
              PDR. (C)
            </div>
          </div>

          <div className="dashboard_12th_set_metal_slider_container">
            <div
              className="dashboard_12th_set_metal_slider_box"
              onClick={() => toggleSliderAJR('slider1')}
            >
              <img
                src={metalSlider}
                alt="metal-slider"
                className="metal_slider_AJR"
              />
              <img
                src={metalSliderKnob}
                alt="metal-slider-knob"
                className={
                  !AJR.slider1
                    ? 'metal_slider_knob_AJR metal_slider_knob_bottom_12th_set'
                    : 'metal_slider_knob_AJR'
                }
              />
            </div>
            <div
              className="dashboard_12th_set_metal_slider_box"
              onClick={() => toggleSliderAJR('slider2')}
            >
              <img
                src={metalSlider}
                alt="metal-slider"
                className="metal_slider_AJR_2"
              />
              <img
                src={metalSliderKnob}
                alt="metal-slider-knob"
                className={
                  !AJR.slider2
                    ? 'metal_slider_knob_AJR_2 metal_slider_knob_bottom_12th_set'
                    : 'metal_slider_knob_AJR_2'
                }
              />
            </div>
            <div className="dashboard_12th_set_metal_slider_title_AJR">
              AJR. (C)
            </div>
          </div>

          <div className="dashboard_12th_set_metal_slider_container">
            <div
              className="dashboard_12th_set_metal_slider_box"
              onClick={() => toggleSliderWIND('slider1')}
            >
              <img
                src={metalSlider}
                alt="metal-slider"
                className="metal_slider_WIND"
              />
              <img
                src={metalSliderKnob}
                alt="metal-slider-knob"
                className={
                  !WIND.slider1
                    ? 'metal_slider_knob_WIND metal_slider_knob_bottom_12th_set'
                    : 'metal_slider_knob_WIND'
                }
              />
            </div>
            <div
              className="dashboard_12th_set_metal_slider_box"
              onClick={() => toggleSliderWIND('slider2')}
            >
              <img
                src={metalSlider}
                alt="metal-slider"
                className="metal_slider_WIND_2"
              />
              <img
                src={metalSliderKnob}
                alt="metal-slider-knob"
                className={
                  !WIND.slider2
                    ? 'metal_slider_knob_WIND_2 metal_slider_knob_bottom_12th_set'
                    : 'metal_slider_knob_WIND_2'
                }
              />
            </div>
            <div className="dashboard_12th_set_metal_slider_title_WIND">
              WIND (M/S)
            </div>
          </div>

          <div className="dashboard_12th_set_metal_slider_container">
            <div
              className="dashboard_12th_set_metal_slider_box"
              onClick={() => toggleSliderMVS('slider1')}
            >
              <img
                src={metalSlider}
                alt="metal-slider"
                className="metal_slider_MVS"
              />
              <img
                src={metalSliderKnob}
                alt="metal-slider-knob"
                className={
                  !MVS.slider1
                    ? 'metal_slider_knob_MVS metal_slider_knob_bottom_12th_set'
                    : 'metal_slider_knob_MVS'
                }
              />
            </div>
            <div
              className="dashboard_12th_set_metal_slider_box"
              onClick={() => toggleSliderMVS('slider2')}
            >
              <img
                src={metalSlider}
                alt="metal-slider"
                className="metal_slider_MVS_2"
              />
              <img
                src={metalSliderKnob}
                alt="metal-slider-knob"
                className={
                  !MVS.slider2
                    ? 'metal_slider_knob_MVS_2 metal_slider_knob_bottom_12th_set'
                    : 'metal_slider_knob_MVS_2'
                }
              />
            </div>
            <div className="dashboard_12th_set_metal_slider_title_MVS">
              MVS (%)
            </div>
          </div>
        </div>

        <div className="dashboard_thirteen_set_joystick">
          <div
            className="dashboard_thirteen_set_joystick_text"
            onClick={() => setCPDandSCD('CPD')}
          >
            CPD
          </div>
          <img
            src={CPDandSCD === 'SCD' ? joystickDown : joystickUp}
            alt="joystick"
          />
          <div
            className="dashboard_thirteen_set_joystick_text"
            onClick={() => setCPDandSCD('SCD')}
          >
            SCD
          </div>
        </div>

        <div className="dashboard_fourteen_set_grey_knob">
          <div
            className="dashboard_dial_tick CPU"
            onClick={() => setBigDial('CPU')}
          >
            CPU
          </div>
          <div
            className="dashboard_dial_tick SA"
            onClick={() => setBigDial('SA')}
          >
            SA
          </div>
          <div
            className="dashboard_dial_tick PNT"
            onClick={() => setBigDial('PNT')}
          >
            PNT
          </div>
          <div
            className="dashboard_dial_tick PDR"
            onClick={() => setBigDial('PDR')}
          >
            PDR/MVC
          </div>
          <div
            className="dashboard_dial_tick AIR"
            onClick={() => setBigDial('AIR')}
          >
            AIR/AMMO
          </div>
          <div
            className="dashboard_dial_tick WIND"
            onClick={() => setBigDial('WIND')}
          >
            WIND
          </div>
          <div
            className="dashboard_dial_tick OEC"
            onClick={() => setBigDial('OEC')}
          >
            OEC
          </div>
          <div
            className="dashboard_dial_tick OAC"
            onClick={() => setBigDial('OAC')}
          >
            OAC
          </div>
          <div
            className="dashboard_dial_tick DSAC"
            onClick={() => setBigDial('DSAC')}
          >
            DSAC
          </div>
          <div
            className="dashboard_dial_image grey_knob"
            style={{
              transition: 'transform 0.4s ease-in-out',
              transform:
                bigDial === 'CPU'
                  ? 'rotate(-188deg)'
                  : bigDial === 'SA'
                  ? 'rotate(-157deg)'
                  : bigDial === 'PNT'
                  ? 'rotate(-127deg)'
                  : bigDial === 'PDR'
                  ? 'rotate(-100deg)'
                  : bigDial === 'AIR'
                  ? 'rotate(-47deg)'
                  : bigDial === 'WIND'
                  ? 'rotate(0deg)'
                  : bigDial === 'OEC'
                  ? 'rotate(30deg)'
                  : bigDial === 'OAC'
                  ? 'rotate(58deg)'
                  : 'rotate(90deg)',
            }}
          >
            <img src={greyKnob} alt="grey-knob" />
          </div>
        </div>

        <div className="dashboard_fifteen_set_joystick">
          <div
            className="dashboard_fifteen_set_joystick_text"
            onClick={() => setCPDandSCD('CPD')}
          >
            CPD
          </div>
          <img
            src={CPDandSCD === 'SCD' ? joystickDown : joystickUp}
            alt="joystick"
          />
          <div
            className="dashboard_fifteen_set_joystick_text"
            onClick={() => setCPDandSCD('SCD')}
          >
            SCD
          </div>
        </div>

        <div className="dashboard_sixteenth_set_black_switches_container">
          <div className="dashboard_sixteenth_set_black_switches_container_title">
            OVRL CORRECTION MIL
          </div>
          <div className="dashboard_sixteenth_set_black_switches_set_title heat">
            HEAT
          </div>
          <div className="dashboard_sixteenth_set_black_switches_set_title hesh">
            HESH
          </div>
          <div className="dashboard_sixteenth_set_black_switches_set_title apfsds">
            APFSDS
          </div>
          <div className="dashboard_sixteenth_set_black_switches_set_row_title_first ">
            <div className="dashboard_sixteenth_set_black_switches_set_row_text">
              AZ
            </div>
            <div className="dashboard_sixteenth_set_black_switches_set_row_text">
              EL
            </div>
          </div>
          <div className="dashboard_sixteenth_set_black_switches_set_row_title_second ">
            <div className="dashboard_sixteenth_set_black_switches_set_row_text">
              AZ
            </div>
            <div className="dashboard_sixteenth_set_black_switches_set_row_text">
              EL
            </div>
          </div>
          <div className="dashboard_sixteenth_set_black_switches_set_row_title_third">
            <div className="dashboard_sixteenth_set_black_switches_set_row_text">
              AZ
            </div>
            <div className="dashboard_sixteenth_set_black_switches_set_row_text">
              EL
            </div>
          </div>
          {Object.entries(blackSliderSwitchStates).map(([type, rows]) => (
            <div key={type} className="switch_set">
              {Object.entries(rows).map(([row, switches]) => (
                <div key={row} className="switch_row">
                  {switches.map((isOn, index) => (
                    <div
                      key={index}
                      className="dashboard_sixteenth_set_black_switch"
                      onClick={() => toggleSwitch(type, row, index)}
                    >
                      <img
                        src={blackSliderTrack}
                        alt="black_switch_track"
                        className="black_switch_track"
                      />
                      <img
                        src={blackSliderKnob}
                        alt="black_switch_thumb"
                        className={`black_switch_thumb ${
                          isOn ? '' : 'black_switch_thumb_bottom'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard_bottom_set">
        <div className="dashboard_bottom_first_set_white_lights">
          <img src={whiteLight} alt="white-light" />
          <img src={whiteLight} alt="white-light" />
          <img src={whiteLight} alt="white-light" />
        </div>

        <div className="dashboard_bottom_direction_control_btn_box">
          <div
            className="directionBtnUp"
            onClick={() => setDirection('up')}
            style={{
              opacity: direction === 'up' ? 1 : 0.6,
              transition: 'opacity 0.3s ease',
            }}
          >
            <img src={directionBtn} alt="direction-btn" />
          </div>
          <div
            className="directionBtnDown"
            onClick={() => setDirection('down')}
            style={{
              opacity: direction === 'down' ? 1 : 0.6,
              transition: 'opacity 0.3s ease',
            }}
          >
            <img src={directionBtn} alt="direction-btn" />
          </div>
          <div
            className="directionBtnLeft"
            onClick={() => setDirection('left')}
            style={{
              opacity: direction === 'left' ? 1 : 0.6,
              transition: 'opacity 0.3s ease',
            }}
          >
            <img src={directionBtn} alt="direction-btn" />
          </div>
          <div
            className="directionBtnRight"
            onClick={() => setDirection('right')}
            style={{
              opacity: direction === 'right' ? 1 : 0.6,
              transition: 'opacity 0.3s ease',
            }}
          >
            <img src={directionBtn} alt="direction-btn" />
          </div>
          <div className="dashboard_bottom_direction_control_btn_box_title">
            MOVEMENT
          </div>
        </div>

        <div className="dashboard_bottom_auto_manual_dial">
          <div
            className="dashboard_bottom_auto_manual_text"
            onClick={() => setAutoManual('auto')}
          >
            AUTO
          </div>
          <img
            src={knobOfFirstRow}
            alt="knob"
            style={{
              transform:
                autoManual === 'auto' ? 'rotate(0deg)' : 'rotate(180deg)',
              transition: 'transform 0.4s ease-in-out',
            }}
          />
          <div
            className="dashboard_bottom_auto_manual_text"
            onClick={() => setAutoManual('manual')}
          >
            MANUAL
          </div>
        </div>

        <div className="dashboard_bottom_clutch_dial">
          <div
            className="dashboard_bottom_clutch_text"
            onClick={() => setClutch('9')}
          >
            9
          </div>
          <img
            src={greyDial}
            alt="knob"
            style={{
              transform: clutch === '9' ? 'rotate(0deg)' : 'rotate(90deg)',
              transition: 'transform 0.4s ease-in-out',
            }}
          />
          <div
            className="dashboard_bottom_clutch_text six_clutch"
            onClick={() => setClutch('6')}
          >
            6
          </div>
          <div className="dashboard_bottom_clutch_title">CLUTCH RELEASE</div>
        </div>
      </div>
    </div>
  );
}
