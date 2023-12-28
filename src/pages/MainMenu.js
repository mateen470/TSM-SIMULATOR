import { NavLink } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/css';
import '../renderer/App.css';
import mainMenu from '../TSM-img/main_menu.svg';
import data from '../data.json';

SwiperCore.use([Mousewheel, Pagination]);

export default function MainMenu() {
  const buttonArray = data.buttonArray;

  const swiperRef = useRef(null);

  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;

    if (swiperInstance) {
      const scaleSlides = () => {
        swiperInstance.slides.forEach((slide, index) => {
          let scale = 1 - Math.abs(index - swiperInstance.activeIndex) * 0.1;
          scale = Math.max(scale, 0.72);
          slide.style.transform = `scale(${scale})`;
        });
      };

      scaleSlides();
      swiperInstance.on('slideChange', scaleSlides);
    }
  }, []);

  return (
    <div
      className="mainMenu_main_class"
      style={{ backgroundImage: `url(${mainMenu})` }}
    >
      <div className="main_content">
        <div className="content_first_half">
          <div className="content_first_half_main_heading">
            <p>Good afternoon.</p>
            <span>TSM II</span>
            <span>SIMULATOR</span>
          </div>
        </div>
        <div className="content_second_half">
          <NavLink to="/">Home</NavLink>
          <div className="button_slider">
            <Swiper
              ref={swiperRef}
              slidesPerView={7}
              direction="vertical"
              centeredSlides={true}
              loop={true}
              mousewheel={true}
              pagination={{ clickable: true }}
              className="mySwiper"
            >
              {buttonArray.map((data, index) => (
                <SwiperSlide key={index} className="swiper_slide">
                  <NavLink to={data.link} className="button_slider_button">
                    <span>{data.name}</span>
                  </NavLink>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
