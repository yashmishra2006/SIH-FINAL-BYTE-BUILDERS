// AnalyticsPage.js
import React from 'react';
import './index.css';
import PieChartComponent from '../PieChart';
import LineChartComponent from '../LineChart';  
const AnalyticsPage = () => {
  return (
    <div className="analytics-page">
      <h1>Museum Ticketing Analytics</h1>

      {/* Total Overview Section */}
      <section className="total-overview">
        <h2>Total Overview</h2>
        <p>Total Tickets Sold: 5000</p>
        <p>Total Revenue: ₹ 100,000</p>
        <p>Visitor Count: 4800</p>
      </section>

      {/* Sales Breakdown Section */}
      <section className="sales-breakdown">
        <h2>Sales Breakdown</h2>
        <p>Tickets Sold by Type: Adults (3000), Children (1500), Seniors (500)</p>
        <LineChartComponent /> {/* Line Chart for Sales by Date */}
        <p>Popular Time Slots: 10 AM - 12 PM</p>
      </section>

      {/* Visitor Demographics Section */}
      <section className="visitor-demographics">
        <h2>Visitor Demographics</h2>
        <p>Age Group Distribution:</p>
        <PieChartComponent /> {/* Pie Chart for Visitor Demographics */}
        <p>Geographic Location: [Map Here]</p>
      </section>

      {/* Payment Analytics Section */}
      <section className="payment-analytics">
        <h2>Payment Analytics</h2>
        <p>Payment Methods Used: Credit Card (70%), PayPal (20%), Other (10%)</p>
        <p>Payment Success Rate: 95%</p>
        <p>Payment Failure Rate: 5%</p>
      </section>

      {/* Feedback and Ratings Section */}
      <section className="feedback-ratings">
        <h2>Feedback and Ratings</h2>
        <p>Average Rating: 4.5/5</p>
        <p>Visitor Feedback: "Great experience!"</p>
      </section>

      {/* Conversion Rates Section */}
      <section className="conversion-rates">
        <h2>Conversion Rates</h2>
        <p>Website to Purchase Conversion Rate: 15%</p>
        <p>Bounce Rate: 40%</p>
        <p>Average Session Duration: 3 minutes</p>
        <p>Pages Per Session: 4</p>
        <p>Drop-off Points: Checkout Page</p>
      </section>

     

      {/* Real-Time Data Section */}
      <section className="real-time-data">
        <h2>Real-Time Data</h2>
        <p>Live Visitor Count: 35</p>
        <p>Live Sales Tracker: [Updating Count Here]</p>
      </section>

      {/* Custom Reports Section */}
      <section className="custom-reports">
        <h2>Customizable Reports</h2>
        <p>Generate and download custom reports in CSV, PDF, or Excel formats.</p>
        <button>Generate Report</button>
      </section>
    </div>
  );
};

export default AnalyticsPage;
