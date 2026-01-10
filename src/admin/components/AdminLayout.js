import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './AdminLayout.css';

const AdminLayout = ({ children, onLogout }) => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`admin-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} onLogout={onLogout} />
      <main className="admin-main-content">
        <button className="sidebar-toggle-mobile" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
