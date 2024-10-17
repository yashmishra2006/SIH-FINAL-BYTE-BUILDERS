import React from 'react';
import Slider from 'react-slick';
import './index.css'; // Ensure this file is correctly styled

const FeaturedMuseumsCarousel = ({ museums }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {museums.map((museum, index) => (
          <div key={index} className="carousel-card">
            <img src={museum.image} alt={museum.name} className="carousel-image" />
            <div className="carousel-content">
              <h3 className="carousel-title">{museum.name}</h3>
              <p className="carousel-location">{museum.location}</p>
              <p className="carousel-type">{museum.type}</p>
              <p className="carousel-description">{museum.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedMuseumsCarousel;
