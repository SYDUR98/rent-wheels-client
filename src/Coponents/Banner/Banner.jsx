import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,       
    autoplaySpeed: 3000,  
    arrows: true,        
  };

  return (
    <div className="slider-container w-full mx-auto relative">
      <Slider {...settings}>
        <div className="relative">
          <img
            src="https://i.ibb.co/xKtVSfL2/rsz-b1.jpg"
            alt="Slide 1"
            className="w-full h-96 object-cover rounded-lg"
          />
          {/* Hero Text / Typewriter */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl md:text-5xl font-bold text-center">
            <Typewriter
              words={["Welcome to RentWheels!", "Find Your Dream Car", "Drive in Style"]}
              loop={0} 
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </div>
        </div>

        <div className="relative">
          <img
            src="https://i.ibb.co/7dy5xRdS/rsz-b3.jpg"
            alt="Slide 2"
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl md:text-5xl font-bold text-center">
            <Typewriter
              words={["Luxury Cars Available", "Easy Booking Process", "Affordable Prices"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </div>
        </div>

        <div className="relative">
          <img
            src="https://i.ibb.co.com/XZ0TCPMg/b4.jpg"
            alt="Slide 3"
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl md:text-5xl font-bold text-center">
            <Typewriter
              words={["Luxury Cars Available", "Easy Booking Process", "Affordable Prices"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </div>
        </div>

        <div className="relative">
          <img
            src="https://i.ibb.co.com/6c1QVGG5/b6.jpg"
            alt="Slide 4"
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl md:text-5xl font-bold text-center">
            <Typewriter
              words={["Luxury Cars Available", "Easy Booking Process", "Affordable Prices"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </div>
        </div>

      </Slider>
    </div>
  );
};

export default Banner;
