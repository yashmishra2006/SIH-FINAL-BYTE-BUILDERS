import React from 'react';
import { Link } from 'react-router-dom'; 
import './index.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="https://res.cloudinary.com/dyiph7is1/image/upload/v1725142620/logo_xmlqth.jpg" alt="Logo" />
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tickets">Book Tickets</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/analytics">Analytics</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
