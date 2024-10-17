import React, { Component } from 'react';
import MuseumCard from '../MuseumCard';
import './index.css';

class FeaturedMuseums extends Component {
  render() {
    const { museums } = this.props;

    return (
      <div className="featured-museums-list">
        {museums.map((museum, index) => (
          <MuseumCard
            key={index}
            image={museum.image}
            heading={museum.name}
            location={museum.location}
            type={museum.type}
            writeup={museum.description}
          />
        ))}
      </div>
    );
  }
}

export default FeaturedMuseums;
