import React from 'react';
import './PagesCss/Contact.css'

const Contact = () => {
  
  return (
    <div>
      <div className="contact-form-wrapper d-flex justify-content-center">
        <form action="#" className="contact-form">
          <h5 className="title">Contact us</h5>
          <p className="description">
          We welcome any questions, technical inquiries, bug reports, suggestions, or other issues you may have. Please feel free to contact us.
          </p>
          <div>
            <input type="text" className="form-control rounded border-white mb-3 form-input" id="name" placeholder="Name" required />
          </div>
          <div>
            <input type="email" className="form-control rounded border-white mb-3 form-input" placeholder="Email" required />
          </div>
          <div>
            <textarea id="message" className="form-control rounded border-white mb-3 form-text-area" rows="5" cols="30" placeholder="Message" required></textarea>
          </div>
          <div className="submit-button-wrapper">
            <input type="submit" value="Send" />
          </div>
        </form>
      </div>
    </div>
    

  );
};

export default Contact;