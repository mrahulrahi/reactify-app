"use client";

import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

export default function FreqAskedQuestions() {

  const accordionData = [
    {
      key: "0",
      header: "How can I Plan a Trip?",
      body: "We make planning a trip easy by generating trip plans based on your lifestyle. Start by telling us what your favorite music is, then your favorite things to do outside. Next input your starting location and travel preferences. We’ll create trip itineraries in seconds. All you have to do is enjoy the ride."
    },
    {
      key: "1",
      header: "How do I take a Trip?",
      body: "Select and save your favorite trip itineraries into your account on Tripherder. Book your tickets and lodging, then save to your calendar. You can share the details with friends too. All that’s left is to hop in the car and go!"
    },
    {
      key: "2",
      header: "How much does the trip planner cost?",
      body: "You can save and share up to three complete trip itineraries for free on Tripherder.com. After that, single itineraries are only $4.99 or you can choose from a package of trip itineraries. At Tripherder you only pay for what you want."
    }
  ];


  return (
    <section className="content-container faq-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-11 mx-auto">
            <div className="heading underline">
              <h3>Frequently Asked Questions (FAQ)</h3>
            </div>
            <div className="faq-container">
              <Accordion className="accordion" defaultActiveKey="0">
                {accordionData.map(item => (
                  <Accordion.Item key={item.key} className='accordion-item accordion-faq-content border-0 shadow-sm' eventKey={item.key}>
                    <Accordion.Header className="accordion-header">
                      {item.header}
                    </Accordion.Header>
                    <Accordion.Body>
                      {item.body}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>)
}
