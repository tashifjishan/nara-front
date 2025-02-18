import React, { useEffect, useRef, useState } from "react";
import topVideo from "../../assets/home/backgroundVideo.mp4";
import topImage from "../../assets/home/backgroundImage.png";
import CarouselImage from "../../assets/home/carouselImage.jpeg";
import { Link } from "react-router-dom";
const TopSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide relative"
      data-bs-ride="carousel"
      data-bs-interval="5000"
  
    >
      <div className="carousel-inner h-screen bg-black">
        {/* first video */}
        <div className="carousel-item active relative w-full h-full">
          <img
            src={topImage}
            className={`${!videoLoaded ? "block" : "hidden"} w-full h-full object-cover`}
            alt="slide1"
          />
          <video
            autoPlay
            loop
            muted
            src={topVideo}
            className="block w-full h-full object-cover"
            alt="slide1"
            onCanPlay={() => {
              setVideoLoaded(true);
            }}
          />
        </div>

        <div className="carousel-item relative w-full h-full">
          <img
            src={CarouselImage}
            className="block w-full h-full object-cover"
            alt="slide2"
          />
        </div>

        <div className="absolute bottom-28 left-12 text-left text-white">
          <h5 className="text-sm">Featured collection, 2024</h5>
          
          <Link
            to={"#"}

          >
            View collection
          </Link>
        </div>

        {/* Fixed-position navigation buttons */}
        <div className="absolute bottom-16 left-8 w-48 px-12 flex justify-between items-center -translate-y-1/2">
          <button
            className="carousel-control-prev bg-[#D8E3B121] bg-opacity-30 hover:bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
            type="button"
            data-bs-target="#carouselExampleSlidesOnly"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon inline-block bg-no-repeat"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next bg-[#D8E3B121] bg-opacity-30 hover:bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
            type="button"
            data-bs-target="#carouselExampleSlidesOnly"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon inline-block bg-no-repeat"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
