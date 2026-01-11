import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router"; // your router version
import { FaChevronDown } from "react-icons/fa";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,       
    autoplaySpeed: 4000,  
    arrows: true,
    fade: true, // Professional transition
  };

  const bannerData = [
    {
      img: "https://i.ibb.co/xKtVSfL2/rsz-b1.jpg",
      title: "Welcome to RentWheels!",
      sub: ["Find Your Dream Car", "Drive in Style", "Affordable Luxury"]
    },
    {
      img: "https://i.ibb.co/7dy5xRdS/rsz-b3.jpg",
      title: "Luxury At Your Fingertips",
      sub: ["Premium Sedans", "Rugged SUVs", "Electric Future"]
    }
  ];

  return (
    <div className="w-full relative overflow-hidden">
      <Slider {...settings}>
        {bannerData.map((slide, idx) => (
          <div key={idx} className="relative">
            {/* Requirement: Max height 60-70% of screen */}
            <div className="w-full h-[65vh] md:h-[70vh] relative">
              
              {/* Overlay for better text contrast (Global UI Rule) */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
              
              <img
                src={slide.img}
                alt="Banner"
                className="w-full h-full object-cover"
              />

              {/* Interactive Content */}
              <div className="absolute inset-0 z-20 flex flex-col items-start justify-center px-10 lg:px-24 text-white">
                <h2 className="text-xl md:text-2xl font-medium text-primary mb-2 uppercase tracking-widest">
                  {slide.title}
                </h2>
                <h1 className="text-4xl md:text-6xl font-black mb-6">
                  <Typewriter
                    words={slide.sub}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                  />
                </h1>
                
                {/* Requirement: Interactive CTA */}
                <Link to="/browsecar" className="btn btn-primary btn-lg rounded-full px-10 border-none hover:scale-105 transition-all">
                  Browse Inventory
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Requirement: Clear visual hint to the next section */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <div className="flex flex-col items-center opacity-70">
          <span className="text-[10px] uppercase tracking-widest mb-1 font-bold text-white">Scroll</span>
          <FaChevronDown className="text-white text-xl" />
        </div>
      </div>
    </div>
  );
};

export default Banner;