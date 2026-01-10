import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./PagesCss/Pricing.css";
import "./PagesCss/f&q.css";
import CheckoutModal from "./CheckoutModal"; // We'll create this component

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
          className={`rc-accordion-toggle p-3 ${active === id ? "active" : ""}`}
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
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activePlan, setActivePlan] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate savings for yearly plans
  const calculateSavings = (monthlyPrice, yearlyPrice) => {
    const monthlyTotal = monthlyPrice * 12;
    const savings = monthlyTotal - yearlyPrice;
    return {
      amount: savings,
      percentage: Math.round((savings / monthlyTotal) * 100),
    };
  };

  const standardSavings = calculateSavings(10, 60);
  const premiumSavings = calculateSavings(20, 120);

  const handleSignUpClick = () => {
    navigate("/sign");
  };

  const handleSwitchToggle = () => {
    setIsYearly(!isYearly);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setActivePlan(plan.id);
    setShowCheckout(true);
  };

  const handleCheckoutClose = () => {
    setShowCheckout(false);
    setSelectedPlan(null);
  };

  const handleCheckoutSuccess = () => {
    setShowCheckout(false);
    setSelectedPlan(null);
    // Show success message or redirect
    alert("Payment successful! Thank you for your subscription.");
  };

  const plans = [
    {
      id: "basic",
      name: "Free Plan",
      price: 0,
      yearlyPrice: 0,
      description: "Perfect for getting started",
      features: [
        { text: "Randomly Generated Email Addresses", available: true },
        { text: "Emails Auto-Delete After 10 Minutes", available: true },
        { text: "No inbox storage", available: true },
        { text: "Limited to 5 emails per hour", available: true },
        { text: "No custom domain support", available: true },
        { text: "No attachment support", available: true },
        { text: "Public inbox access", available: true },
        { text: "No Customer Support", available: true },
      ],
      buttonText: "Get Started Free",
      buttonColor: "#6A9C89",
      tag: "Free Forever",
      tagline: "Perfect for casual users",
      popular: false,
      icon: "fa-user",
      onSelect: () => handleSignUpClick(),
    },
    {
      id: "standard",
      name: "Standard",
      price: 10,
      yearlyPrice: 60,
      description: "Best for regular users",
      features: [
        { text: "Custom email addresses", available: true },
        { text: "Emails Expire in 12 Hours", available: true },
        { text: "20 emails inbox storage", available: true },
        { text: "Attachment support (up to 1MB)", available: true },
        { text: "Faster email delivery", available: true },
        { text: "Private inbox access", available: true },
        { text: "Ad-free experience", available: true },
        { text: "Priority Email Support", available: true },
      ],
      buttonText: "Start Standard Plan",
      buttonColor: "#16423C",
      tag: "Most Popular",
      tagline: "Best value for money",
      popular: true,
      icon: "fa-user-check",
      savings: standardSavings,
      onSelect: () => handlePlanSelect({
        id: "standard",
        name: "Standard",
        price: isYearly ? 60 : 10,
        period: isYearly ? "year" : "month",
        isYearly: isYearly
      }),
    },
    {
      id: "premium",
      name: "Premium",
      price: 20,
      yearlyPrice: 120,
      description: "For power users & businesses",
      features: [
        { text: "Permanent email storage", available: true },
        { text: "Custom domain support", available: true },
        { text: "Emails Expire in 24 Hours", available: true },
        { text: "100+ emails inbox storage", available: true },
        { text: "Full attachment support (10MB)", available: true },
        { text: "Priority email delivery", available: true },
        { text: "Advanced spam filtering", available: true },
        { text: "Ad-free experience", available: true },
        { text: "Priority Email Support", available: true },
      ],
      buttonText: "Start Premium Plan",
      buttonColor: "#16423C",
      tag: "Premium",
      tagline: "Maximum productivity",
      popular: false,
      icon: "fa-crown",
      savings: premiumSavings,
      onSelect: () => handlePlanSelect({
        id: "premium",
        name: "Premium",
        price: isYearly ? 120 : 20,
        period: isYearly ? "year" : "month",
        isYearly: isYearly
      }),
    },
  ];

  const [active, setActive] = useState(null);

  const handleToggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <div className="pricing-page">
      {/* Checkout Modal */}
      {showCheckout && selectedPlan && (
        <CheckoutModal
          plan={selectedPlan}
          isYearly={isYearly}
          onClose={handleCheckoutClose}
          onSuccess={handleCheckoutSuccess}
        />
      )}

      {/* Floating CTA */}
      {scrolled && (
        <div className="floating-cta">
          <div className="floating-content">
            <span>Ready to get started?</span>
            <button onClick={handleSignUpClick} className="floating-button">
              Start Free Plan <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="pricing-hero">
        <div className="hero-background">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
          <div className="hero-shape hero-shape-3"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <i className="fa-solid fa-star"></i>
              Flexible Pricing Plans
            </div>
            <h1 className="hero-title">
              Choose the Perfect Plan for Your Needs
            </h1>
            <p className="hero-subtitle">
              Select from our range of professional email solutions designed to
              protect your privacy and enhance your productivity. All plans
              include our award-winning security features.
            </p>
          </div>

          {/* Pricing Toggle */}
          <div className="pricing-toggle-container">
            <div className="toggle-section">
              <div className="toggle-header">
                <h3>Choose Billing Period</h3>
                <p>Switch between monthly and yearly billing</p>
              </div>
              <div className="toggle-wrapper">
                <span className={`toggle-label ${!isYearly ? "active" : ""}`}>
                  <span className="toggle-label-main">Monthly</span>
                  <span className="toggle-label-sub">Pay as you go</span>
                  {!isYearly && (
                    <span className="toggle-badge">
                      <i className="fa-solid fa-calendar"></i>
                      No Commitment
                    </span>
                  )}
                </span>

                <div className="toggle-switch-container">
                  <div className="toggle-switch" onClick={handleSwitchToggle}>
                    <div className="toggle-track"></div>
                    <div
                      className={`toggle-knob ${
                        isYearly ? "yearly" : "monthly"
                      }`}
                    >
                      <i
                        className={`fa-solid ${
                          isYearly ? "fa-calendar-days" : "fa-calendar"
                        }`}
                      ></i>
                    </div>
                  </div>
                  <div className="toggle-indicator">
                    <span className={!isYearly ? "active" : ""}>Monthly</span>
                    <span className={isYearly ? "active" : ""}>Yearly</span>
                  </div>
                </div>

                <span className={`toggle-label ${isYearly ? "active" : ""}`}>
                  <span className="toggle-label-main">Yearly</span>
                  <span className="toggle-label-sub">Best value</span>
                  {isYearly && (
                    <span className="toggle-badge savings-highlight">
                      <i className="fa-solid fa-gift"></i>
                      Save up to 50%
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="plans-container">
        <div className="plans-grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${plan.id} ${
                hoveredCard === plan.id ? "hovered" : ""
              } ${activePlan === plan.id ? "active" : ""} ${
                plan.popular ? "popular" : ""
              }`}
              onMouseEnter={() => setHoveredCard(plan.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Glow Effect */}
              <div className="card-glow"></div>

              {/* Plan Badge - Fixed Position */}
              <div
                className={`plan-badge ${
                  plan.popular ? "popular-badge" : "value-badge"
                }`}
              >
                <div className="badge-ribbon">
                  <i
                    className={`fa-solid ${
                      plan.popular
                        ? "fa-fire"
                        : plan.id === "premium"
                        ? "fa-crown"
                        : "fa-bolt"
                    }`}
                  ></i>
                  <span className="badge-text">{plan.tag}</span>
                </div>
                <div className="badge-tagline">{plan.tagline}</div>
              </div>

              {/* Plan Header */}
              <div className="plan-header">
                <div className="plan-icon-wrapper">
                  <div className="plan-icon">
                    <i className={`fa-solid ${plan.icon}`}></i>
                  </div>
                </div>
                <div className="plan-title-section">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                </div>
              </div>

              {/* Plan Pricing */}
              <div className="plan-pricing">
                <div className="price-display">
                  <div className="price-main">
                    <span className="price-currency">$</span>
                    <span className="price-amount">
                      {isYearly ? plan.yearlyPrice : plan.price}
                    </span>
                    <span className="price-period">
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>
                  {plan.id !== "basic" && isYearly && plan.savings && (
                    <div className="yearly-savings">
                      <span className="savings-text">
                        Save ${plan.savings.amount} ({plan.savings.percentage}%)
                      </span>
                    </div>
                  )}
                </div>

                {plan.id === "basic" && (
                  <div className="free-forever-badge">
                    <i className="fa-solid fa-infinity"></i>
                    <span>Free Forever</span>
                  </div>
                )}

                {plan.id !== "basic" && (
                  <div className="billing-info">
                    <span className="monthly-equivalent">
                      ${plan.price}/month
                    </span>
                    <span className="billing-period">
                      {isYearly ? "Billed annually" : "Billed monthly"}
                    </span>
                  </div>
                )}
              </div>

              {/* Plan Features */}
              <div className="plan-features">
                <h4 className="features-title">
                  <i className="fa-solid fa-list-check"></i>
                  What's Included
                </h4>
                <ul className="features-list">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="feature-icon">
                        <i
                          className={`fa-solid ${
                            feature.available
                              ? "fa-check-circle"
                              : "fa-times-circle"
                          }`}
                        ></i>
                      </span>
                      <span className="feature-text">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Plan Footer */}
              <div className="plan-footer">
                <button
                  className={`plan-button ${plan.id}-button`}
                  onClick={plan.onSelect}
                  style={{ background: plan.buttonColor }}
                >
                  <span className="button-text">{plan.buttonText}</span>
                  <i className="fa-solid fa-arrow-right button-arrow"></i>
                </button>

                {plan.id !== "basic" && (
                  <div className="auto-renewal">
                    <i className="fa-solid fa-sync"></i>
                    <span>Auto-renewal • Cancel anytime</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="comparison-section" id="plan-comparison">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-table"></i>
            Detailed Comparison
          </div>
          <h2>Plan Feature Comparison</h2>
          <p className="section-subtitle">
            Compare all features across our plans at a glance
          </p>
        </div>
        <div className="comparison-container">
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th className="feature-column">Features</th>
                  <th className="plan-column free">
                    <div className="plan-header-cell">
                      <div className="plan-icon-small">
                        <i className="fa-solid fa-user"></i>
                      </div>
                      <span className="plan-name-cell">Free</span>
                      <span className="plan-price-cell">$0/month</span>
                    </div>
                  </th>
                  <th className="plan-column standard">
                    <div className="plan-header-cell">
                      <div className="plan-icon-small">
                        <i className="fa-solid fa-user-check"></i>
                      </div>
                      <span className="plan-name-cell">Standard</span>
                      <span className="plan-price-cell">$10/month</span>
                      <span className="plan-popular">Most Popular</span>
                    </div>
                  </th>
                  <th className="plan-column premium">
                    <div className="plan-header-cell">
                      <div className="plan-icon-small">
                        <i className="fa-solid fa-crown"></i>
                      </div>
                      <span className="plan-name-cell">Premium</span>
                      <span className="plan-price-cell">$20/month</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className="feature-name">Email Storage Duration</span>
                    <span className="feature-desc">
                      How long emails are stored
                    </span>
                  </td>
                  <td className="free">
                    <span className="feature-value">10 Minutes</span>
                    <i className="feature-icon fa-solid fa-clock"></i>
                  </td>
                  <td className="standard">
                    <span className="feature-value">12 Hours</span>
                    <i className="feature-icon fa-solid fa-clock"></i>
                  </td>
                  <td className="premium">
                    <span className="feature-value highlight">24 Hours</span>
                    <i className="feature-icon fa-solid fa-clock"></i>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="feature-name">Inbox Storage</span>
                    <span className="feature-desc">
                      Maximum email storage capacity
                    </span>
                  </td>
                  <td className="free">
                    <span className="feature-value">None</span>
                  </td>
                  <td className="standard">
                    <span className="feature-value">20 Emails</span>
                  </td>
                  <td className="premium">
                    <span className="feature-value highlight">100+ Emails</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="feature-name">Custom Email Address</span>
                    <span className="feature-desc">
                      Personalized email addresses
                    </span>
                  </td>
                  <td className="free">
                    <i className="fa-solid fa-times unavailable"></i>
                  </td>
                  <td className="standard">
                    <i className="fa-solid fa-check available"></i>
                  </td>
                  <td className="premium">
                    <i className="fa-solid fa-check available"></i>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="feature-name">Attachment Support</span>
                    <span className="feature-desc">
                      Maximum file attachment size
                    </span>
                  </td>
                  <td className="free">
                    <i className="fa-solid fa-times unavailable"></i>
                  </td>
                  <td className="standard">
                    <span className="feature-value">Up to 1MB</span>
                  </td>
                  <td className="premium">
                    <span className="feature-value highlight">Up to 10MB</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="feature-name">Customer Support</span>
                    <span className="feature-desc">
                      Support availability and type
                    </span>
                  </td>
                  <td className="free">
                    <span className="feature-value">None</span>
                  </td>
                  <td className="standard">
                    <span className="feature-value">Priority Email</span>
                  </td>
                  <td className="premium">
                    <span className="feature-value highlight">
                      Priority 24/7
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="pricing-faq-section">
        <div className="faq-container">
          <div className="faq-header">
            <div className="faq-badge">
              <i className="fa-solid fa-circle-question"></i>
              Frequently Asked Questions
            </div>
            <h2>Need More Information?</h2>
            <p className="faq-subtitle" style={{color:"whitesmoke"}}>
              Get answers to common questions about our pricing and
              subscriptions
            </p>
          </div>

          <div className="faq-content">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                active={active}
                handleToggle={handleToggle}
                faq={faq}
              />
            ))}
          </div>

          <div className="faq-footer">
            <div className="faq-contact">
              <i className="fa-solid fa-comments"></i>
              <div>
                <p>Still have questions?</p>
                <Link to="/contact" className="contact-link">
                  Contact our support team
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="pricing-cta">
        <div className="cta-background">
          <div className="cta-shape cta-shape-1"></div>
          <div className="cta-shape cta-shape-2"></div>
          <div className="cta-shape cta-shape-3"></div>
        </div>
        <div className="cta-content">
          <div className="cta-badge">
            <i className="fa-solid fa-rocket"></i>
            Ready to Get Started?
          </div>
          <h2>Start Protecting Your Privacy Today</h2>
          <p>
            Join thousands of satisfied users who trust Temp-MailHub for their
            temporary email needs. Experience the difference with our
            award-winning service.
          </p>
          <div className="cta-buttons">
            <button className="cta-button primary" onClick={handleSignUpClick}>
              <i className="fa-solid fa-play"></i>
              Start Free Plan
            </button>
            <Link to="/contact">
              <button className="cta-button secondary">
                <i className="fa-solid fa-comments"></i>
                Contact us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;