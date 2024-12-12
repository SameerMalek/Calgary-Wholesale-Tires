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
    arrows: false,
  };

  return (
    <div className="slider-container">
      {/* Main container for the slider */}
      <div className="slider-container">
        <Slider {...settings}>
          {/* First Slide - Unique with Button */}
          <div className="slide slide1">
            <div className="slide-content">
              <h2 className="highlight-text">Must Haves for Every Car</h2>
              <p>Custom wheels that combine performance and elegance</p>
              <button>
                <a
                  href="https://prince.tires/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Discover Now!
                </a>
              </button>
            </div>
            <img src="/assets/car.png" alt="Car" />
          </div>

          {/* Remaining Slides - Styled as Ads */}
          <div className="slide">
            <div className="slide-content">
              <h2 className="highlight-text">Engineered for Adventure</h2>
              <p>
                <span className="highlight">CWT Tires</span> take you off the
                beaten path with all-terrain durability and style.
              </p>
            </div>
            <img src="/assets/forest-tire.jpeg" alt="Adventure Tire" />
          </div>

          <div className="slide">
            <div className="slide-content">
              <h2 className="highlight-text">Performance and Precision</h2>
              <p>
                Elevate your ride with{" "}
                <span className="highlight">CWT Tires</span>, crafted for
                unmatched control.
              </p>
            </div>
            <img src="/assets/rocky-tire.jpeg" alt="Performance Tire" />
          </div>

          <div className="slide">
            <div className="slide-content">
              <h2 className="highlight-text">Tough Meets Sleek</h2>
              <p>
                <span className="highlight">CWT Tires</span> blend rugged
                strength with a sleek design for a superior look.
              </p>
            </div>
            <img src="/assets/black_tire.jpeg" alt="Sleek Tire" />
          </div>

          <div className="slide">
            <div className="slide-content">
              <h2 className="highlight-text">Explore More with CWT</h2>
              <p>
                Adventure-ready tires built to handle any challenge, anytime.
              </p>
            </div>
            <img src="/assets/tire-tool.jpeg" alt="Tire and Tools" />
          </div>

          <div className="slide">
            <div className="slide-content">
              <h2 className="highlight-text">Rugged Style Meets Performance</h2>
              <p>
                Unleash your vehicle's potential with our premium{" "}
                <span className="highlight">CWT Wheels</span>.
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
