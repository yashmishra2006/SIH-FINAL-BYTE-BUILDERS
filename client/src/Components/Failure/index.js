import React from 'react';
import { useNavigate } from 'react-router-dom';


const Failure = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Failed Transaction</h1>
      <p>Unfortunately, your transaction could not be processed. Please try again later.</p>
      <button onClick={handleGoHome}>Return Back to Home</button>
    </div>
  );
};

export default Failure;
