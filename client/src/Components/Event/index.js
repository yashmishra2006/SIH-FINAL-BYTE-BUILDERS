import React from 'react';
import './index.css';

const Event = ({ title, image }) => {
  return (
    <div className="event-card">
      <img src={image} alt={title} className="event-image" />
      <h3 className="event-title">{title}</h3>
    </div>
  );
};

export default Event;
