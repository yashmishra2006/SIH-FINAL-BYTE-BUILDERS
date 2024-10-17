import React, { Component } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate for navigation in class components
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Import Leaflet components
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import './index.css';

const mapContainerStyle = {
  height: "400px",
  width: "100%"
};

class AdvancedTicketBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      museum: '',
      date: '',
      time: '',
      tickets: 1,
      showMap: false,
      phone: '',
      name: '',
      email: '',
      children: 0,
      adults: 1,
      error: '',
      bookingDetails: null,
      museums: [], // State for museums data
      redirect: false, // State for redirection
      fetchedMuseumName: '', // State for fetched museum name
      selectedMuseumLocation: null // State for selected museum location
    };
  }

  componentDidMount() {
    // Fetch museums data from API
    this.fetchMuseums();
  }

  fetchMuseums = async () => {
    try {
      const response = await fetch('http://localhost:5001/museums');
      if (!response.ok) {
        throw new Error('Error fetching museums data.');
      }
      const data = await response.json();
      this.setState({ museums: data });
      console.log(data);
    } catch (error) {
      this.setState({ error: 'Failed to load museums data.' });
    }
  };

  handleBooking = async () => {
    const { phone, email, tickets, adults, children, date, time, museum } = this.state;

    // Validate mobile number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      this.setState({ error: 'Please enter a valid 10-digit phone number.' });
      return;
    }

    // Validate email
    if (!email.endsWith('@gmail.com')) {
      this.setState({ error: 'Please enter an email address that ends with @gmail.com.' });
      return;
    }

    // Validate number of tickets
    const totalTickets = adults + children;
    if (tickets !== totalTickets) {
      this.setState({ error: 'The number of tickets should be equal to the sum of adults and children.' });
      return;
    }

    // Send request to server to get dynamic price and additional details
    try {
      const response = await fetch('http://localhost:5001/get-dynamic-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booking_time: `${date}T${time}`, special_event: 'false', tickets })
      });

      const data = await response.json();

      if (response.ok) {
        this.setState({
          error: '',
          fetchedMuseumName: data.museumName, // Store fetched museum name
          bookingDetails: {
            museum,
            date,
            time,
            tickets,
            totalPrice: data.totalPrice,
            name: this.state.name,
            email,
            phone,
            adults: this.state.adults,
            children: this.state.children
          },
          redirect: true, // Set redirect to true after successful booking
          selectedMuseumLocation: data.museumLocation // Set location of the museum
        });
      } else {
        this.setState({ error: 'Error fetching price from server.' });
      }
    } catch (error) {
      this.setState({ error: 'Error connecting to server.' });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleTicketChange = (event) => {
    const { name, value } = event.target;
    const numValue = Number(value);

    if (name === 'adults') {
      this.setState({
        adults: numValue,
        tickets: numValue + this.state.children
      });
    } else if (name === 'children') {
      this.setState({
        children: numValue,
        tickets: this.state.adults + numValue
      });
    }
  };

  toggleMap = () => {
    this.setState(prevState => ({ showMap: !prevState.showMap }));
  };

  render() {
    const {
      museum, date, time, tickets, showMap, phone, name, email, children, adults,
      error, museums, redirect, bookingDetails, fetchedMuseumName, selectedMuseumLocation
    } = this.state;

    if (redirect) {
      return <Navigate to="/confirmation" state={{ bookingDetails }} />;
    }

    return (
      <div className="advanced-ticket-booking-container">
        <h2>Museum Ticket Booking</h2>
        
        {error && <div className="error-message">{error}</div>}

        <div className="form-grid">
          <div className="form-group">
            <label>Museum:</label>
            <select
              name="museum"
              value={museum}
              onChange={this.handleChange}
            >
              <option value="">Select a Museum</option>
              {museums.map((museum) => (
                <option key={museum.name} value={museum.name}>
                  {museum.name} ({museum.location})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>Time:</label>
            <input
              type="time"
              name="time"
              value={time}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>Number of Tickets:</label>
            <input
              type="number"
              name="tickets"
              min="1"
              value={tickets}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={this.handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Number of Adults:</label>
            <input
              type="number"
              name="adults"
              min="1"
              value={adults}
              onChange={this.handleTicketChange}
            />
          </div>

          <div className="form-group">
            <label>Number of Children:</label>
            <input
              type="number"
              name="children"
              min="0"
              value={children}
              onChange={this.handleTicketChange}
            />
          </div>
        </div>

        <div className="button-group">
          <button className="book-button" onClick={this.handleBooking}>
            Confirm Tickets
          </button>

          <button className="map-button" onClick={this.toggleMap}>
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
        </div>

        {showMap && selectedMuseumLocation && (
          <div className="map-container">
            <MapContainer
              style={mapContainerStyle}
              center={selectedMuseumLocation}
              zoom={12}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={selectedMuseumLocation}>
                <Popup>
                  {fetchedMuseumName}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        )}

        {/* Display fetched museum name */}
        {fetchedMuseumName && <div className="fetched-museum-name">Fetched Museum: {fetchedMuseumName}</div>}
      </div>
    );
  }
}

export default AdvancedTicketBooking;
