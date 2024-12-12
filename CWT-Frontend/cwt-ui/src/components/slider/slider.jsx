import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.scss";

// SliderComponent is a React component that renders a slider/carousel using the 'react-slick' library
const SliderComponent = () => {
  // Configuration settings for the slider
  var settings = {
    dots: true, // Display navigation dots
    infinite: true, // Enable infinite scrolling
    slidesToShow: 1, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 2000, // Time in milliseconds between each slide transition
    pauseOnHover: true, // Pause the slider on hover
  };

  return (
    <div className="slider-container">
      {/* Main container for the slider */}
      <div className="slider-container">
        <Slider {...settings}>
          {/* Each 'div' within the 'Slider' represents an individual slide */}
          <div className="slide">
            <div className="slide-content">
              <h2>Must Haves for Every Car</h2>
              <p>Custom wheels of any size and shapes</p>
              <button>
                <a href="https://prince.tires/">Discover Now!</a>
              </button>
            </div>
            <img src="/assets/car.png" alt="Car" />
          </div>
          <div className="slide">
            <div className="slide-content">
              <h2>Engineered for Adventure - CWT Tires Take You There</h2>
              <p>Custom wheels of any size and shapes</p>
            </div>
            <img src="/assets/forest-tire.jpeg" alt="tire" />
          </div>
          <div className="slide">
            <div className="slide-content">
              <h2>Performance and Precision - CWT Tires Elevate Your Ride</h2>
              <p>Custom wheels of any size and shapes</p>
            </div>
            <img src="/assets/rocky-tire.jpeg" alt="tire" />
          </div>
          <div className="slide">
            <div className="slide-content">
              <h2>Tough Meets Sleek - CWT Tires Blend Style and Strength</h2>
              <p>Custom wheels of any size and shapes</p>
            </div>
            <img src="/assets/black_tire.jpeg" alt="tire" />
          </div>
          <div className="slide">
            <div className="slide-content">
              <h2>Explore More with CWT - Your Adventure-Ready Tires</h2>
              <p>Custom wheels of any size and shapes</p>
            </div>
            <img src="/assets/tire-tool.jpeg" alt="Tire and Tools" />
          </div>
          <div className="slide">
            <div className="slide-content">
              <h2>Rugged Style Meets Exceptional Performance - CWT Wheels</h2>
              <p>
                Crafted for the adventurous, our premium wheels elevate your
                ride.
              </p>
            </div>
            <img src="/assets/rim-cwt.jpeg" alt="Rim" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default SliderComponent;