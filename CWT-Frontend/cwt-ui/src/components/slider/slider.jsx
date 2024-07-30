import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.scss";

const SliderComponent = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className="slider-container">
      <div className="slider-container">
        <Slider {...settings}>
          <div className="slide">
            <div className="slide-content">
              <h2>Must Haves for Every Car</h2>
              <p>Custom wheels of any size and shapes</p>
              <button>Discover Now!</button>
            </div>
            <img src="/assets/car.png" alt="Car" />
          </div>
          <div className="slide">
            <div className="slide-content">
              <h2>Must Haves for Every Car</h2>
              <p>Custom wheels of any size and shapes</p>
              <button>Discover Now!</button>
            </div>
            <img src="/assets/car.png" alt="Car" />
          </div>
          <div className="slide">
            <div className="slide-content">
              <h2>Must Haves for Every Car</h2>
              <p>Custom wheels of any size and shapes</p>
              <button>Discover Now!</button>
            </div>
            <img src="/assets/car.png" alt="Car" />
          </div>
          <div className="slide">
            <div className="slide-content">
              <h2>Must Haves for Every Car</h2>
              <p>Custom wheels of any size and shapes</p>
              <button>Discover Now!</button>
            </div>
            <img src="/assets/car.png" alt="Car" />
          </div>
          <div className="slide">
            <div className="slide-content">
              <h2>Must Haves for Every Car</h2>
              <p>Custom wheels of any size and shapes</p>
              <button>Discover Now!</button>
            </div>
            <img src="/assets/car.png" alt="Car" />
          </div>
          <div className="slide">
            <div className="slide-content">
              <h2>Must Haves for Every Car</h2>
              <p>Custom wheels of any size and shapes</p>
              <button>Discover Now!</button>
            </div>
            <img src="/assets/car.png" alt="Car" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default SliderComponent;
