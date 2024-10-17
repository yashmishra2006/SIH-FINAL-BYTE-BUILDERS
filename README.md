# Ticket Booking Chatbot Website

This repository contains the code for the Ticket Booking Chatbot Website, which is designed to help users book museum tickets online through a chatbot interface.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)


## Features

- **Automated Ticket Booking**: Users can book tickets using a chatbot interface.
- **User-Friendly Interface**: Built with React for a smooth user experience.
- **Payment Integration**: Integrated with PayPal for secure payment transactions.
- **Multilingual Support**: Chatbot supports multiple languages to cater to a diverse audience.
- **Analytics Dashboard**: Admins can track sales and user behavior through an analytics dashboard.
- **Error Handling**: Robust error handling and input validation.
- **Responsive Design**: Compatible with all devices, including desktops, tablets, and smartphones.
- **Data Privacy and Security**: Secure handling of user data with GDPR compliance.

## Tech Stack

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: SQLite (`museum_ticketing.db`)
- **Chatbot Platform**: Dialogflow / Rasa
- **Payment Gateway**: PayPal
- **Version Control**: Git, GitHub

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rev0212/SIH.git
2. **Navigate to the project directory:**
   cd TicketBookingBot
3. **Install server-side dependencies:**
   npm install
4. **Navigate to the client directory and install client-side dependencies:**
   cd client
   npm install
5. **Start the backend server:**
   node ../server.js
6. **Start the frontend development server:**
   npm start
7. Open your browser and visit http://localhost:3000 to interact with the chatbot and book tickets.

## Usage
- **Homepage:** Interact with the chatbot from the homepage.
- **Chatbot Interaction:** Ask the chatbot about available museums, ticket prices, and timings.
- **Booking:** Follow the chatbot prompts to select a museum, date, and number of tickets.
- **Payment:** Complete the payment using PayPal.
- **Confirmation:** Receive a booking confirmation on the website and via email.

## Project Structure

```plaintext
TicketBookingBot/
├── client/                           # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/               # React components
│   │   │   ├── Analytics/            # Components related to analytics and data visualization
│   │   │   ├── BookingConfirmation/  # Components for booking confirmation page
│   │   │   ├── ChatBot/              # Chatbot components for user interaction
│   │   │   ├── Event/                # Components related to events
│   │   │   ├── Failure/              # Components to handle failure scenarios
│   │   │   ├── FAQ/                  # FAQ components
│   │   │   ├── FeaturedMuseum/       # Components for featured museums
│   │   │   ├── FeaturedMuseumsCarousel/ # Components for displaying a carousel of featured museums
│   │   │   ├── Header/               # Header components for the application
│   │   │   ├── Home/                 # Home page components
│   │   │   ├── LatestMuseum/         # Components for displaying the latest museums
│   │   │   ├── LineChart/            # Components for line chart visualization
│   │   │   ├── MuseumCard/           # Components for individual museum cards
│   │   │   ├── PayPal/               # PayPal integration components
│   │   │   ├── PieChart/             # Components for pie chart visualization
│   │   │   └── Tickets/              # Components related to ticketing
│   │   ├── App.js                    # Main React application component
│   │   └── ...
├── museum_ticketing.db               # SQLite database file
├── package-lock.json                 # Lockfile for npm dependencies
├── package.json                      # NPM configuration and dependencies
├── request.http                      # HTTP requests for testing APIs
├── server.js                         # Backend server entry point
└── README.md                         # Project documentation



  
