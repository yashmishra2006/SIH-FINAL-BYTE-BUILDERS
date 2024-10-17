import React from 'react';
import './index.css';

const MuseumCard = ({ image, heading, location, type, writeup }) => {
  return (
    <div className="museum-card">
      <img src={image} alt={heading} className="museum-card-image" />
      <h3 className="museum-card-heading">{heading}</h3>
      <p className="museum-card-location">{location}</p>
      <p className="museum-card-type">{type}</p>
      <p className="museum-card-writeup">{writeup}</p>
    </div>
  );
};

export default MuseumCard;
