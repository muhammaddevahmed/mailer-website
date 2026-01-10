import React from 'react';
import { FaUsers, FaUserTag, FaUserShield, FaUserNinja, FaEnvelopeOpenText, FaPaperPlane } from 'react-icons/fa';
import { summaryData } from '../data/dashboardData';
import './AdminDashboard.css';

const SummaryCard = ({ icon, title, value, iconClass }) => (
  <div className="summary-card">
    <div className={`card-icon ${iconClass}`}>{icon}</div>
    <div className="card-info">
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className="dashboard-grid">
        <SummaryCard icon={<FaUsers />} title="Total Users Signed Up" value={summaryData.totalUsers.toLocaleString()} iconClass="total-users" />
        <SummaryCard icon={<FaUserTag />} title="Total Basic Users" value={summaryData.basicUsers.toLocaleString()} iconClass="basic-users" />
        <SummaryCard icon={<FaUserShield />} title="Total Standard Users" value={summaryData.standardUsers.toLocaleString()} iconClass="standard-users" />
        <SummaryCard icon={<FaUserNinja />} title="Total Premium Users" value={summaryData.premiumUsers.toLocaleString()} iconClass="premium-users" />
        <SummaryCard icon={<FaEnvelopeOpenText />} title="Emails Generated Today" value={summaryData.emailsGeneratedToday.toLocaleString()} iconClass="emails-today" />
        <SummaryCard icon={<FaPaperPlane />} title="Free Emails Generated" value={summaryData.freeEmailsGeneratedToday.toLocaleString()} iconClass="free-emails" />
      </div>
    </div>
  );
};

export default AdminDashboard;
