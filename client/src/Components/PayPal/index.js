import React, { Component } from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/paypal-js';

class PayPalButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: 'YOUR_PAYPAL_CLIENT_ID',
      currency: 'USD',
    };
  }

  handleCreateOrder = async (data, actions) => {
    try {
      const response = await fetch('/create-paypal-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: '100.00' }), // Replace with actual amount
      });
      const order = await response.json();
      return order.id;
    } catch (err) {
      console.error('Error creating PayPal order:', err);
      return null;
    }
  };

  handleApprove = async (data, actions) => {
    try {
      await fetch('/capture-paypal-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId: data.orderID }),
      });
      alert('Transaction completed!');
    } catch (err) {
      console.error('Error capturing PayPal order:', err);
    }
  };

  handleError = (err) => {
    console.error('PayPal Checkout onError', err);
  };

  render() {
    const { clientId, currency } = this.state;
    const initialOptions = {
      clientId,
      currency,
    };

    return (
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createOrder={this.handleCreateOrder}
          onApprove={this.handleApprove}
          onError={this.handleError}
        />
      </PayPalScriptProvider>
    );
  }
}

export default PayPalButton;
