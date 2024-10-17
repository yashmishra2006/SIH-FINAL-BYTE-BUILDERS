import React, { Component } from 'react';
import axios from 'axios';
import Event from '../Event';
import LatestMuseum from '../LatestMuseum';
import FeaturedMuseumsCarousel from '../FeaturedMuseumsCarousel'; 
import './index.css';
import ChatBot from '../ChatBot';


class HomePage extends Component {
  state = {
    featuredMuseums: [],
    events: [
      { title: 'Exhibition Opening', date: '2024-09-10', description: 'Join us for the grand opening of our new exhibition.',image:"https://res.cloudinary.com/dyiph7is1/image/upload/v1725141799/Creo_en_SA%CC%83O_PAULO_zkbvzp.jpg" },
      { title: 'Art Workshop', date: '2024-09-15', description: 'Participate in our art workshop with renowned artists.',image:"https://res.cloudinary.com/dyiph7is1/image/upload/v1725141041/kehqi5bkcyfxztdsqecc.jpg" }
    ],
    latestMuseums: [
      { name: 'Museum of Modern Art', update: 'New interactive exhibits now available!' },
      { name: 'Historical Museum', update: 'New artifacts from the 18th century added to the collection.' }
    ]
  };

  componentDidMount() {
    this.fetchFeaturedMuseums();
  }

  fetchFeaturedMuseums = async () => {
    try {
      const { data } = await axios.get('http://localhost:5001/museums');
      this.setState({
        featuredMuseums: data.map(museum => ({
          name: museum.name,
          location: museum.location,
          type: museum.type,
          description: museum.description,
          image: museum.image_url
        }))
      });
    } catch (error) {
      console.error('Error fetching featured museums:', error);
    }
  };

  render() {
    const { featuredMuseums, events, latestMuseums } = this.state;

    return (
      <div className="homepage-container">
        <div className="sections-container">
          <section className="events-section">
            <h2>Upcoming Events</h2>
            {events.map((event, index) => (
              <Event key={index} {...event} />
            ))}
          </section>
          <section className="latest-museums-section">
            <h2>Latest Museum Updates</h2>
            {latestMuseums.map((museum, index) => (
              <LatestMuseum key={index} {...museum} />
            ))}
          </section>
        </div>
        <section className="featured-museums-section">
          <h2>Featured Museums</h2>
          <FeaturedMuseumsCarousel museums={featuredMuseums} />
        </section>
        <ChatBot/>
      </div>
    );
  }
}

export default HomePage;
