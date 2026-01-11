// Sidebar.jsx - Enhanced
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaUsers, FaChartLine, FaEnvelope, FaSignOutAlt, FaChevronLeft, FaChevronRight, FaCog, FaBell, FaUserCog } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, isMobile, isOpen, onToggle, onLogout }) => {
  const menuItems = [
    { path: '/admin/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/admin/packages', icon: <FaBox />, label: 'Packages' },
    { path: '/admin/users', icon: <FaUsers />, label: 'Users' },
    { path: '/admin/analytics', icon: <FaChartLine />, label: 'Analytics' },
    { path: '/admin/contact', icon: <FaEnvelope />, label: 'Submissions' },
    { path: '/admin/profile', icon: <FaUserCog />, label: 'Profile' },
    
  ];

  return (
    <aside className={`navigation-sidebar ${isCollapsed ? 'nav-collapsed' : ''} ${isMobile ? 'nav-mobile' : ''} ${isOpen ? 'nav-open' : ''}`}>
      <div className="nav-sidebar-inner">
        {/* Header */}
        <div className="nav-sidebar-header">
          <div className="nav-logo-container">
            <div className="nav-logo-icon">
              <span className="nav-logo-letter">A</span>
            </div>
            {(!isCollapsed || isMobile) && (
              <h2 className="nav-logo-text">Temp-MailHub</h2>
            )}
          </div>
          
          {!isMobile && (
            <button className="nav-collapse-toggle" onClick={onToggle}>
              {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
          )}
        </div>

     

        {/* Navigation Menu */}
        <nav className="nav-menu-container">
          <ul className="nav-menu-list">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-menu-item">
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `nav-menu-link ${isActive ? 'nav-active' : ''}`
                  }
                >
                  <span className="nav-menu-icon">{item.icon}</span>
                  {(!isCollapsed || isMobile) && (
                    <span className="nav-menu-label">{item.label}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="nav-sidebar-footer">
          <div className="nav-user-profile">
            {(!isCollapsed || isMobile) && (
              <div className="nav-user-info">
                <div className="nav-user-avatar">
                  <span className="nav-user-initials">AD</span>
                </div>
                <div className="nav-user-details">
                  <p className="nav-user-name">Administrator</p>
                  <p className="nav-user-role">Super Admin</p>
                </div>
              </div>
            )}
          </div>
          
          <button className="nav-logout-button" onClick={onLogout}>
            <FaSignOutAlt />
            {(!isCollapsed || isMobile) && <span>Sign Out</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;