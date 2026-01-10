import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaUsers, FaChartLine, FaEnvelope, FaSignOutAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isCollapsed, onToggle, onLogout }) => {
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h1 className="sidebar-logo">{isCollapsed ? 'A' : 'Admin'}</h1>
        <button className="sidebar-toggle" onClick={onToggle}>
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard" className="nav-item">
          <FaTachometerAlt />
          <span className="nav-text">Dashboard</span>
        </NavLink>
        <NavLink to="/admin/packages" className="nav-item">
          <FaBox />
          <span className="nav-text">Packages</span>
        </NavLink>
        <NavLink to="/admin/users" className="nav-item">
          <FaUsers />
          <span className="nav-text">Users</span>
        </NavLink>
        <NavLink to="/admin/analytics" className="nav-item">
          <FaChartLine />
          <span className="nav-text">Analytics</span>
        </NavLink>
        <NavLink to="/admin/contact" className="nav-item">
          <FaEnvelope />
          <span className="nav-text">Submissions</span>
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <button className="logout-button" onClick={onLogout}>
          <FaSignOutAlt />
          <span className="nav-text">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
