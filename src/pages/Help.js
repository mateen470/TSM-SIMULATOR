import { NavLink } from 'react-router-dom';
import '../renderer/App.css';
import mainMenu from '../TSM-img/main_menu.svg';
import backButton from '../TSM-img/back_button.svg';
import Footer from '../utility/Footer';

export default function Help() {
  return (
    <div
      className="help_main_class"
      style={{ backgroundImage: `url(${mainMenu})` }}
    >
      <NavLink className="navigation_button" to="/simulation">
        <span id="first_span_navigation_button">
          <img src={backButton} alt="back" /> MAIN MENU /
        </span>
        <span id="second_span_navigation_button">HELP</span>
      </NavLink>

      <div className="help_main_content">
        <div className="help_content_paragraph">
          <div className="help_content_paragraph_heading">
            GET STARTED WITH TSM II
          </div>
          <div className="help_content_paragraph_text">
            TSM-II Simulator is Upgraded by ESFORGE Pvt Ltd as an indigenous
            effort to make Pakistan's First State of the art simulator on Unreal
            Engine with unparalleled Graphics and Realism. This simulator
            simulates battle ground for Gunner of T-69 and T-59 Main Battle
            Tanks (MBT), while providing instructor full control and monitoring
            c apabilities of Gunner Environment.
          </div>
        </div>

        <div className="help_content_paragraph">
          <div className="help_content_paragraph_heading">
            READ DOCUMENTATION
          </div>
          <div className="help_content_paragraph_text">
            Explore our Comprehensive Documentation: Delve into the Operation
            Manual, and discover the General Description of TSM. Also, find
            guidance with our Service Manual.
          </div>
        </div>

        <div className="help_button_group">
          <div className="help_button">Operational Manual</div>
          <div className="help_button">General Description</div>
          <div className="help_button">Service Manual</div>
        </div>

        <div className="help_content_paragraph">
          <div className="help_content_paragraph_heading">
            LEARN MORE IN TUTORIALS
          </div>
          <div className="help_content_paragraph_text">
            Embark on a journey with our step-by-step tutorials tailored for
            your needs. Learn the essentials of starting a simulation, navigate
            the setup intricacies, and gain expertise in the evaluation process.
            Tutorials can cover:
          </div>
          <ul className="help_content_paragraph_text help_content_list_portion">
            <li>How to start a simulation?</li>
            <li>How Evaluation works?</li>
            <li>Advanced Battle Practice?</li>
            <li>TSM II Overview</li>
          </ul>
        </div>

        <div className="help_button_group">
          <div className="help_button help_contact_us_btn">CONTACT US</div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
