import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Pages/PagesCss/NavBar.css';
import gifLogo from '../components/assets/Favicon/logo.gif';

const NavBar = () => {
  const [click, setClick] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { path: '/', label: 'Temp Email', icon: '✉️' },
    { path: '/privateDomains', label: 'Domains', icon: '🌐' },
    { path: '/TempAccount', label: 'Temp Account', icon: '👤' },
    { path: '/Pricing', label: 'Pricing', icon: '💰' },
    { path: '/Profile', label: 'Profile', icon: '⚙️' },
  ];

  return (
    <>
      <div className={`nav-overlay ${click ? 'active' : ''}`} onClick={Close} />
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <NavLink 
            exact 
            to="/" 
            className="nav-logo"
            onClick={Close}
          >
            <div className="logo-wrapper">
              <img 
                src={gifLogo} 
                alt="Temp-MailHub Logo" 
                className="nav-logo-image" 
              />
              <div className="logo-glow"></div>
            </div>
            <div className="logo-text-wrapper">
              <h1 className="nav-logo-text">
                Temp-MailHub
              </h1>
              <span className="logo-subtitle">Secure & Temporary</span>
            </div>
          </NavLink>

          <div className="nav-menu-wrapper">
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              {menuItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <NavLink
                    exact
                    to={item.path}
                    activeClassName="active"
                    className="nav-links"
                    onClick={click ? handleClick : null}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                    <span className="nav-underline"></span>
                  </NavLink>
                </li>
              ))}
              
              <li className="nav-item nav-button-item">
                <NavLink
                  exact
                  to="/sign"
                  activeClassName="active"
                  className="sign-up-button"
                  onClick={click ? handleClick : null}
                >
                  <span className="button-content">
                    <span className="button-icon">🚀</span>
                    <span className="button-text">SignUp/SignIn</span>
                  </span>
                  <span className="button-glow"></span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="nav-icon" onClick={handleClick}>
            <div className="hamburger">
              <span className={`bar bar1 ${click ? 'active' : ''}`}></span>
              <span className={`bar bar2 ${click ? 'active' : ''}`}></span>
              <span className={`bar bar3 ${click ? 'active' : ''}`}></span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;