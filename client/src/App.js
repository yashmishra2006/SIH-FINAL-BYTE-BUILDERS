import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Tickets from './Components/Tickets';
import Home from './Components/Home';
import BookingConfirmation from './Components/BookingConfirmation';
import FAQ from './Components/FAQ';
import AnalyticsPage from './Components/Analytics';
import Failure from './Components/Failure';
import './App.css';

function App() {
  return (
    <Router> 
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/confirmation" element={<BookingConfirmation />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/cancel" element={<Failure />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
