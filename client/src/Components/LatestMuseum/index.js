import React from 'react';
import './index.css';

const LatestMuseum = ({ name, update }) => {
  return (
    <div className="latest-museum-container">
      <h2 className="latest-museum-name">{name}</h2>
      <p className="latest-museum-update">{update}</p>
    </div>
  );
};

export default LatestMuseum;
