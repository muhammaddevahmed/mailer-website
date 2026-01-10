import React, { useState } from 'react';
import './PagesCss/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page">
      <div className="contact-wrapper">
        <div className="contact-container">
          <div className="contact-form-section">
            <div className="form-header">
              <h1 className="form-title">
                <i className="fa-solid fa-envelope-open-text"></i>
                Contact Us
              </h1>
              <p className="form-description">
                We welcome any questions, technical inquiries, bug reports, 
                suggestions, or other issues you may have. Please feel free to contact us.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">
                  <i className="fa-solid fa-user"></i>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <i className="fa-solid fa-envelope"></i>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  <i className="fa-solid fa-message"></i>
                  Your Message
                </label>
                <textarea
                  id="message"
                  className="form-textarea"
                  rows="6"
                  placeholder="Please describe your inquiry in detail..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              {submitted && (
                <div className="success-message">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              <div className="form-submit">
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane"></i>
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="contact-info-section">
            <div className="info-card">
              <div className="info-icon">
                <i className="fa-solid fa-clock"></i>
              </div>
              <div className="info-content">
                <h3>Response Time</h3>
                <p>We typically respond within 24-48 hours</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fa-solid fa-headset"></i>
              </div>
              <div className="info-content">
                <h3>Support Hours</h3>
                <p>Monday - Friday: 9 AM - 6 PM EST</p>
              </div>
            </div>



            <div className="info-card">
              <div className="info-icon">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <div className="info-content">
                <h3>Urgent Issues</h3>
                <p>For critical technical issues, please include "URGENT" in your subject line</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;