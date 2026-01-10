import React, { useState, useEffect } from 'react';
import './PagesCss/CheckoutModal.css'

const CheckoutModal = ({ plan, isYearly, onClose, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    country: 'US',
    zipCode: '',
    saveCard: false,
    paypalEmail: '',
    promoCode: ''
  });
  
  const [promoApplied, setPromoApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Calculate totals
  const subtotal = plan.price;
  const tax = subtotal * 0.1; // 10% tax
  const promoAmount = promoApplied ? subtotal * 0.1 : 0; // 10% promo discount
  const total = subtotal + tax - promoAmount;
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(.{4})/g, '$1 ').trim();
    setFormData(prev => ({ ...prev, cardNumber: value }));
  };
  
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setFormData(prev => ({ ...prev, expiryDate: value }));
  };
  
  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 4);
    setFormData(prev => ({ ...prev, cvv: value }));
  };
  
  const applyPromoCode = () => {
    if (formData.promoCode === 'WELCOME10') {
      setPromoApplied(true);
      alert('Promo code applied successfully! 10% discount applied.');
    } else {
      alert('Invalid promo code. Please try again.');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    onSuccess();
  };
  
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };
  
  return (
    <div className="checkout-modal-overlay">
      <div className="checkout-modal">
        <div className="modal-header">
          <div className="header-content">
            <h2>
              <i className="fa-solid fa-lock"></i>
              Complete Your Purchase
            </h2>
            <p>Secure checkout powered by Stripe & PayPal</p>
          </div>
          <button className="close-button" onClick={onClose}>
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="checkout-container">
            {/* Left Column - Order Summary */}
            <div className="order-summary">
              <div className="summary-header">
                <h3>
                  <i className="fa-solid fa-receipt"></i>
                  Order Summary
                </h3>
                <div className="plan-badge-summary">
                  <span className={`plan-tag ${plan.id}`}>
                    {plan.name} Plan
                  </span>
                  <span className="billing-period">
                    {isYearly ? 'Yearly Billing' : 'Monthly Billing'}
                  </span>
                </div>
              </div>
              
              <div className="summary-details">
                <div className="plan-detail">
                  <div>
                    <h4>{plan.name} Plan</h4>
                    <p>Billed {isYearly ? 'yearly' : 'monthly'}</p>
                  </div>
                  <span className="plan-price">{formatPrice(plan.price)}</span>
                </div>
                
                <div className="discount-section">
                  <div className="promo-input">
                    <input
                      type="text"
                      name="promoCode"
                      value={formData.promoCode}
                      onChange={handleInputChange}
                      placeholder="Enter promo code"
                      disabled={promoApplied}
                    />
                    <button 
                      className="apply-promo-btn"
                      onClick={applyPromoCode}
                      disabled={promoApplied}
                    >
                      {promoApplied ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                  {promoApplied && (
                    <div className="promo-success">
                      <i className="fa-solid fa-check-circle"></i>
                      <span>10% discount applied!</span>
                    </div>
                  )}
                </div>
                
                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="price-row">
                    <span>Tax (10%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  {promoApplied && (
                    <div className="price-row discount">
                      <span>
                        <i className="fa-solid fa-tag"></i>
                        Promo Discount
                      </span>
                      <span>-{formatPrice(promoAmount)}</span>
                    </div>
                  )}
                  <div className="price-row total">
                    <span>
                      <strong>Total</strong>
                      <small>Due today</small>
                    </span>
                    <span className="total-price">{formatPrice(total)}</span>
                  </div>
                </div>
                
                <div className="features-list-summary">
                  <h5>What's included:</h5>
                  <ul>
                    <li><i className="fa-solid fa-check"></i> Secure & Private Emails</li>
                    <li><i className="fa-solid fa-check"></i> {plan.id === 'standard' ? '20' : '100+'} Email Storage</li>
                    <li><i className="fa-solid fa-check"></i> Priority Support</li>
                    <li><i className="fa-solid fa-check"></i> Ad-free Experience</li>
                  </ul>
                </div>
                
                <div className="guarantee-badge">
                  <i className="fa-solid fa-shield-check"></i>
                  <div>
                    <strong>30-Day Money-Back Guarantee</strong>
                    <p>If you're not satisfied, get a full refund within 30 days</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Payment Form */}
            <div className="payment-section">
              <div className="payment-methods">
                <div className="method-tabs">
                  <button 
                    className={`method-tab ${paymentMethod === 'stripe' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('stripe')}
                  >
                    <i className="fa-brands fa-cc-stripe"></i>
                    Credit Card
                  </button>
                  <button 
                    className={`method-tab ${paymentMethod === 'paypal' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <i className="fa-brands fa-paypal"></i>
                    PayPal
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="payment-form">
                  {/* Common Fields */}
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="fa-solid fa-envelope"></i>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="name">
                      <i className="fa-solid fa-user"></i>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  {paymentMethod === 'stripe' ? (
                    /* Stripe Credit Card Form */
                    <>
                      <div className="form-group">
                        <label htmlFor="cardNumber">
                          <i className="fa-solid fa-credit-card"></i>
                          Card Number
                        </label>
                        <div className="card-input-wrapper">
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                            required
                          />
                          <div className="card-icons">
                            <i className="fa-brands fa-cc-visa"></i>
                            <i className="fa-brands fa-cc-mastercard"></i>
                            <i className="fa-brands fa-cc-amex"></i>
                          </div>
                        </div>
                      </div>
                      
                      <div className="card-details-row">
                        <div className="form-group">
                          <label htmlFor="expiryDate">
                            <i className="fa-solid fa-calendar"></i>
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleExpiryDateChange}
                            placeholder="MM/YY"
                            maxLength="5"
                            required
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="cvv">
                            <i className="fa-solid fa-lock"></i>
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleCvvChange}
                            placeholder="123"
                            maxLength="4"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="country">
                          <i className="fa-solid fa-globe"></i>
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="GB">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="DE">Germany</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="zipCode">
                          <i className="fa-solid fa-map-pin"></i>
                          ZIP / Postal Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          placeholder="12345"
                          required
                        />
                      </div>
                      
                      <div className="form-checkbox">
                        <input
                          type="checkbox"
                          id="saveCard"
                          name="saveCard"
                          checked={formData.saveCard}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="saveCard">
                          Save card for future payments
                        </label>
                      </div>
                    </>
                  ) : (
                    /* PayPal Form */
                    <>
                      <div className="paypal-section">
                        <div className="paypal-info">
                          <i className="fa-brands fa-paypal"></i>
                          <div>
                            <h4>Pay with PayPal</h4>
                            <p>You will be redirected to PayPal to complete your payment</p>
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="paypalEmail">
                            <i className="fa-solid fa-envelope"></i>
                            PayPal Email
                          </label>
                          <input
                            type="email"
                            id="paypalEmail"
                            name="paypalEmail"
                            value={formData.paypalEmail}
                            onChange={handleInputChange}
                            placeholder="paypal@example.com"
                            required
                          />
                        </div>
                        
                        <div className="paypal-benefits">
                          <div className="benefit">
                            <i className="fa-solid fa-shield"></i>
                            <span>Buyer Protection Included</span>
                          </div>
                          <div className="benefit">
                            <i className="fa-solid fa-bolt"></i>
                            <span>Fast & Secure Checkout</span>
                          </div>
                          <div className="benefit">
                            <i className="fa-solid fa-credit-card"></i>
                            <span>No Credit Card Required</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="terms-agreement">
                    <div className="form-checkbox">
                      <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        required
                      />
                      <label htmlFor="terms">
                        I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
                      </label>
                    </div>
                    
                    <div className="form-checkbox">
                      <input
                        type="checkbox"
                        id="subscription"
                        name="subscription"
                        required
                      />
                      <label htmlFor="subscription">
                        I understand this is a recurring subscription that auto-renews
                      </label>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="submit-payment-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-lock"></i>
                        Pay {formatPrice(total)} Now
                      </>
                    )}
                  </button>
                  
                  <div className="secure-payment-note">
                    <i className="fa-solid fa-shield-check"></i>
                    <span>Your payment is secure and encrypted</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default CheckoutModal;