const express = require('express');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');
const cors = require('cors');
const paypal = require('paypal-rest-sdk');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'museum_ticketing.db');

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(PORT, () => {
      console.log(`Server Running at http://localhost:${PORT}/`);
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

// Configure PayPal
paypal.configure({
  mode: 'sandbox', // Change to 'live' for production
  client_id: 'AaOjGHH5nqH8_EL9NY0UwOjpwl0-Ha-i7cHLylc1Q85k2roHy6iKUo37WLHUr6e5-SdEmT7hGx3JKh6y', // Replace with your PayPal client ID
  client_secret: 'EMmPcO7X_KPUxrS5JV4yAj6fiBMwfNC9GKyYQe4uJivGbBRricsVdtEhwQZcsRvDv3UKemMLDfzy4A80', // Replace with your PayPal client secret
});

// Route to handle payment creation
app.post('/pay', (req, res) => {
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'http://localhost:5001/success',
      cancel_url: 'http://localhost:5001/cancel',
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: 'Museum Ticket',
              sku: '001',
              price: '25.00',
              currency: 'USD',
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: 'USD',
          total: '25.00',
        },
        description: 'Ticket for entry to the museum.',
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      console.error(error);
      res.status(500).send('Error creating payment');
    } else {
      // Extract the approval URL from the response
      const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
      if (approvalUrl) {
        res.json({ approvalUrl: approvalUrl.href });
      } else {
        res.status(500).send('No approval URL found');
      }
    }
  });
});

// Route to handle successful payment
app.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'USD', // Ensure this matches your payment currency
          total: '25.00', // Ensure this matches the payment total
        },
      },
    ],
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.error(error.response);
      res.redirect('/failure'); // Redirect to failure page if payment execution fails
    } else {
      console.log('Get Payment Response');
      console.log(JSON.stringify(payment));
      res.redirect('/home'); // Redirect to your success page or home page
    }
  });
});

// Route to handle canceled payment
app.get('/cancel', (req, res) => {
  res.redirect('/failure'); // Redirect to a failure page or show an error message
});

// Route to display failure message
app.get('/failure', (req, res) => {
  res.send('<h2>Payment failed. Please try again or return to the <a href="/home">home page</a>.</h2>');
});

// Route to display home page (you might already have this)
app.get('/home', (req, res) => {
  res.send('<h1>Welcome to the Museum Ticketing System</h1>');
});

// Booking system
const bookings = {
  '2024-08-31T10:00': 0,
  '2024-08-31T11:00': 0,
  '2024-08-31T12:00': 0,
  '2024-08-31T13:00': 0,
  '2024-08-31T14:00': 0,
  '2024-08-31T15:00': 0,
  '2024-08-31T16:00': 0,
  '2024-08-31T17:00': 0,
  '2024-08-31T18:00': 0
};

function calculateDynamicPrice(bookingTime, specialEvent) {
  let basePrice = 100;

  const bookingDate = new Date(bookingTime);
  const dayOfWeek = bookingDate.getDay();
  const hours = bookingDate.getHours();

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    basePrice += 50;
  } else {
    basePrice -= 20;
  }

  if ((hours >= 11 && hours < 13) || (hours >= 16 && hours < 18)) {
    basePrice += 30;
  }

  const bookingCount = bookings[bookingTime] || 0;
  let demand = 'medium';

  if (bookingCount < 5) {
    demand = 'low';
  } else if (bookingCount >= 5 && bookingCount < 10) {
    demand = 'medium';
  } else if (bookingCount >= 10) {
    demand = 'high';
  }

  if (demand === 'low') {
    basePrice -= 10;
  } else if (demand === 'high') {
    basePrice += 20;
  }

  if (specialEvent === 'true') {
    basePrice += 30;
  }

  return Math.max(basePrice, 50);
}

app.post('/get-dynamic-price', (req, res) => {
  const { booking_time, special_event, tickets } = req.body;

  const pricePerTicket = calculateDynamicPrice(booking_time, special_event);
  const totalPrice = pricePerTicket * tickets;

  if (bookings[booking_time] !== undefined) {
    bookings[booking_time] += tickets;
  } else {
    bookings[booking_time] = tickets;
  }

  res.json({ pricePerTicket, totalPrice });
});

// Get museums data
app.get('/museums', async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM Museums');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

initializeDBAndServer();
