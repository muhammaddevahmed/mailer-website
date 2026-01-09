import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Pages/PagesCss/NavBar.css';
import gifLogo from '../components/assets/Favicon/logo.gif';

const NavBar = () => {
  const [click, setClick] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('ENG');

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div>
      <div className={click ? 'main-container' : ''} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
          <img src={gifLogo} alt="Temp-MailHub Logo" className="nav-logo-image" />
          <h1 className="nav-logo-text">
  <span className="green">Temp</span><span className="white">-</span><span className="blue">MailHub</span>
</h1>

          </NavLink>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Temp Email
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                exact
                to="/privateDomains"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Domains
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                exact
                to="/TempAccount"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Temp Acc
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                exact
                to="/Pricing"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Pricing
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                exact
                to="/Profile"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Profile
              </NavLink>
            </li>
            
            <li className="nav-item">
            <NavLink
    exact
    to="/sign"
    activeClassName="active"
    className="nav-links2"
    onClick={click ? handleClick : null}
    style={{
      background: '#6A9C89',
      border: 'none',
      borderRadius: '30px',
      cursor: 'pointer',
      color: '#fff',
      padding: '1rem',
      textDecoration: 'none',
      transition: 'background-color 0.3s',
      fontWeight:'bolder',
      fontSize:'15px',
      margin: '0.5rem'
    }}
    onMouseEnter={(e) => e.target.style.backgroundColor = '#6A9C89'}
    onMouseLeave={(e) => e.target.style.backgroundColor = '#16423C'}
  >
    Sign-Up / Sign-In
  </NavLink>
  </li>

          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? 'fa fa-times' : 'fa fa-bars'}></i>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
