import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./index.css";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  

  if (!state || !state.bookingDetails) {
    return <div>No booking details available.</div>;
  }

  const { museum, date, time, tickets, totalPrice, name, email, phone, adults, children } = state.bookingDetails;

  

  const handleBookTickets = async () => {
    try {
      // Make a POST request to the /pay route
      const response = await fetch('http://localhost:5001/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking_time: `${date}T${time}`,
          special_event: false, // Adjust this if needed
          tickets: tickets,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment');
      }

      const data = await response.json();
      // Redirect to PayPal approval URL
      if (data && data.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        console.error('Payment approval URL not found.');
      }
    } catch (error) {
      console.error('Error during payment process:', error);
      alert('There was an issue with the payment process. Please try again.');
    }
  };

  

  return (
    <div className="booking-confirmation-container">
      <h2>Booking Confirmation</h2>
      <p><strong>Museum:</strong> {museum}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Time:</strong> {time}</p>
      <p><strong>Number of Tickets:</strong> {tickets}</p>
      <p><strong>Total Price:</strong> ${totalPrice}</p>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Number of Adults:</strong> {adults}</p>
      <p><strong>Number of Children:</strong> {children}</p>
      <button onClick={handleBookTickets}>Book</button>
    </div>
  );
};

export default BookingConfirmation;
