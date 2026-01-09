import React from 'react';
import './Pages/PagesCss/Footer.css';
import appleLogo from '../components/assets/apple-store.png'; 
import googleLogo from '../components/assets/google-play.png'; 
import gifLogo from '../components/assets/Favicon/logo.gif';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="brand-section">
            <div className="brand-logo">
              <img src={gifLogo} alt="Temp-MailHub Logo" className="logo-image" />
              <h2 className="brand-name">Temp-MailHub</h2>
            </div>
            <p className="brand-description">
            Effortless Temporary Email for Your Privacy & Security. Instantly generate disposable email addresses to keep your inbox spam-free and your personal data secure.
                Our Website Is Develop and Maintained by D-Tech Studios.
            </p>
            <div className="app-badges">
              <a href="#" className="store-link">
                <img src={appleLogo} alt="App Store" className="store-image" />
              </a>
              <a href="#" className="store-link">
                <img src={googleLogo} alt="Google Play" className="store-image" />
              </a>
            </div>
            <div className="social-links">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

         
          <div className="footer-column">
              <h5 className="nav-title">About Us</h5>
              <ul className="nav-list">
                <li><a href="/" className="nav-link">Home</a></li>
                <li><a href="/about" className="nav-link">About</a></li>
                <li><a href="#" className="nav-link">Team</a></li>
                <li><a href="/contact" className="nav-link">Contact</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h5 className="nav-title">Legal Information</h5>
              <ul className="nav-list">
                <li><a href="/privacy" className="nav-link">Privacy Policy</a></li>
                <li><a href="/terms" className="nav-link">Terms of Service</a></li>
                <li><a href="/content" className="nav-link">Content Policy</a></li>
                <li><a href="/disclaimer" className="nav-link">Disclaimer</a></li>
              </ul>
            </div>
          </div>

        <div className="copyright-section">
          <p className="copyright-text">
            © {new Date().getFullYear()} Temp-MailHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;