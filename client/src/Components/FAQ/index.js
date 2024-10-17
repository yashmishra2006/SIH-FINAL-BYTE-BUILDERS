import React, { Component } from 'react';
import './index.css'; // Import your CSS file

class FAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedIndex: null, // Track which FAQ is expanded
      faqs: [
        {
          question: "What is the refund policy?",
          answer: "Our refund policy allows you to request a refund up to 24 hours before your scheduled visit.",
        },
        {
          question: "Are there any discounts available?",
          answer: "Yes, we offer discounts for students, seniors, and groups of 10 or more.",
        },
        {
          question: "What are the opening hours?",
          answer: "The museum is open from 10 AM to 6 PM from Monday to Saturday, and from 12 PM to 5 PM on Sundays.",
        },
        {
          question: "How do I book tickets online?",
          answer: "To book tickets online, visit our ticket booking page, select your date and number of visitors, and proceed with payment.",
        },
        {
          question: "Is there parking available at the museum?",
          answer: "Yes, we offer free parking for visitors. The parking lot is located next to the main entrance.",
        },
        {
          question: "Are guided tours available?",
          answer: "Yes, guided tours are available. You can book a guided tour in advance or inquire at the reception desk upon arrival.",
        },
        {
          question: "Can I bring a camera into the museum?",
          answer: "Photography is allowed in most areas of the museum, but please check for 'No Photography' signs in specific exhibits.",
        },
        {
          question: "Is the museum wheelchair accessible?",
          answer: "Yes, the museum is fully wheelchair accessible. We also provide wheelchairs at the entrance upon request.",
        },
      ]
    };
  }

  toggleFAQ = (index) => {
    this.setState((prevState) => ({
      expandedIndex: prevState.expandedIndex === index ? null : index
    }));
  };

  render() {
    const { faqs, expandedIndex } = this.state;

    return (
      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => this.toggleFAQ(index)}>
              {faq.question}
              <span className="faq-toggle">{expandedIndex === index ? '-' : '+'}</span>
            </div>
            {expandedIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    );
  }
}

export default FAQ;
