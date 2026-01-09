import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './PagesCss/Pricing.css'
import './PagesCss/f&q.css'



const faqs = [
  {
    id: 1,
    header: "Will My Subscription Auto-Renew?",
    text: `Yes. Your Subscription will Auto-Renew Monthly or Yearly as per Plan Selected by You.`,
  },
  {
    id: 2,
    header: "How Can I Cancel My Subscription?",
    text: `You can go into Your Account then in Subscription At last You Will Find Delete Subscription or Pause Subscription You can choose as per Your need's.`,
  },
  {
    id: 3,
    header: "What Payment Methods Do You Accept?",
    text: `We accept major Credit Cards, Debit Cards, Google Pay, Apple Pay, PayPal, and other secure payment methods. Please visit our payment page for more details.`,
  },
  {
    id: 4,
    header: "Can I Upgrade My Plan?",
    text: `Yes, you can upgrade your plan at any time. Any changes will take effect immediately after confirmation.`,
  },
  {
    id: 5,
    header: "Do You Offer a Money-Back Guarantee?",
    text: `Yes, we offer a 15-day money-back guarantee if you are not satisfied with the service. Please refer to our refund policy for further details.`,
  },
];

const AccordionItem = (props) => {
  const contentEl = useRef();
  const { handleToggle, active, faq } = props;
  const { header, id, text } = faq;

  return (
    <div className="rc-accordion-card">
      <div className="rc-accordion-header">
        <div
          className={`rc-accordion-toggle p-3 ${
            active === id ? "active" : ""
          }`}
          onClick={() => handleToggle(id)}
        >
          <h5 className="rc-accordion-title">{header}</h5>
          <i className="fa fa-chevron-down rc-accordion-icon"></i>
        </div>
      </div>
      <div
        ref={contentEl}
        className={`rc-collapse ${active === id ? "show" : ""}`}
        style={
          active === id
            ? { height: contentEl.current.scrollHeight }
            : { height: "0px" }
        }
      >
        <div className="rc-accordion-body">
          <p className="mb-0">{text}</p>
        </div>
      </div>
    </div>
  );
};



const Pricing = () => {

  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();  // Initialize navigate function

  // Function to handle button click and navigate to the signup page
  const handleSignUpClick = () => {
    navigate('/sign');  // Redirect to the signup page
  };

  const handleSwitchToggle =()=>{
    setIsYearly(!isYearly);
  };

  const renderPriceText=()=>{
    return isYearly ? '/Yearly':'/Monthly';
  }


  const [active, setActive] = useState(null);

  const handleToggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };
 
  return (
    <div>
      <div className="price-plans">
        <h1>Pricing Plans</h1>
        <p>Upgrade for More Features. Get extended email storage, custom addresses, and premium privacy options.</p>
      </div>
      
      <div className="price-switch">
        <span className="price-text">Monthly</span>
        <div className="switch-container" onClick={handleSwitchToggle}>
          <div className={`switch-container--box ${isYearly ? `switch-container--box--move`:''}`}></div>
        </div>
        <span className="price-text">Yearly</span>
      </div>
   
    <div className="main">
      
      <div className="card-basic">
          <div className="card-header header-basic">
            <h1>Free Plan</h1>
          </div>
          <div className="card-body">
            <p>
              <h2>$<span>0</span> <span>{renderPriceText()}</span></h2>
            </p>
            <div className="card-element-hidden-basic">
              <ul className="card-element-container">
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> 
                <span>Randomly Generated Email Addresses.</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> 
                <span>Emails Auto-Delete After 10 Minutes.</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> 
                <span>No inbox storage (emails disappear after reading).</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> 
                <span>Limited to 5 emails per hour.</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> 
                <span>No custom domain support.</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> 
                <span>No attachment support.</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> 
                <span>Public inbox (anyone can access the same email).</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> 
                <span>No Customer Support.</span></li>
              </ul>
              <button className="btns btn-basic" onClick={handleSignUpClick}>Sign Up Now</button>
              <p>No Subscription & Payment</p>
            </div>
          </div>
        </div>

        

        <div className="card-standard">
          <div className="card-header header-standard">
            <h1>Standard</h1>
          </div>
          <div className="card-body">
            <p>
            <h2>$<span>{isYearly ? '60' : '10'}</span><span>{renderPriceText()}</span></h2>
            </p>
            <div className="card-element-hidden-standard">
              <ul className="card-element-container">
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> <span>Custom email addresses (choose your own username).</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i>  <span>Emails Expire in 12 Hours.</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i>  <span>Inbox storage for 20 emails.</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i>  <span>Limited attachment support (up to 1MB per email).</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i>  <span>Faster email delivery than the free plan.</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> <span>Private inbox (only you can access your emails).</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> <span>Ad-free experience.</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> <span>Priority Email Support.</span></li>
              </ul>
              <button className="btns btn-standard">Get Started</button>
              <p>Auto Renewal</p>
            </div>
          </div>
        </div>

        <div className="card-premium">
          <div className="card-header header-premium">
            <h1>Premium</h1>
          </div>
          <div className="card-body">
            <p>
            <h2>$<span>{isYearly ? '120' : '20'}</span><span>{renderPriceText()}</span></h2>
            </p>
            <div className="card-element-hidden-premium">
              <ul className="card-element-container">
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> <span>Permanent email storage (emails remain until deleted).</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> <span>Custom domain support (e.g., yourname@yourdomain.com).</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i>  <span>Emails Expire in 24 Hours..</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> <span>Inbox storage for 100+ emails.</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> <span>Full attachment support (up to 10MB per email).</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> <span>Priority email delivery (real-time receiving).</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> <span>Advanced spam filtering.</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> <span>Ad-free experience.</span></li>
                <li className="card-element"><i class="fa fa-check" aria-hidden="true"></i> <span>Priority Email Support.</span></li>
              </ul>
              <button className="btns btn-premium">Get Started</button>
              <p>Auto Renewal</p>
            </div>
          </div>
        </div>
      
        <div className="container-fluid mt-5 mb-5">
        <div className="row d-flex justify-content-center align-items-center">
    <div className="col-md-8 col-lg-6 col-sm-10 mt-2 mx-auto">
            <div className="card">
              <div className="card-body">
                <h4 className="form-heading mb-4 text-primary text-center mt-3">
                FAQ
                </h4>
                <p className="praText">The frequent questions and you can find quick guidance here</p>
                {faqs.map((faq, index) => {
                  return (
                    <AccordionItem
                      key={index}
                      active={active}
                      handleToggle={handleToggle}
                      faq={faq}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

        
    </div>
    </div>
  );
};

export default Pricing;