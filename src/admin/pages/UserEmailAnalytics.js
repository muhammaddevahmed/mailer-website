import React from 'react';
import { emailAnalyticsSummary, userEmailActivity } from '../data/emailAnalyticsData';
import './UserEmailAnalytics.css';

const AnalyticsCard = ({ title, count }) => (
  <div className="analytics-card">
    <h3>{title}</h3>
    <div className="count">{count.toLocaleString()}</div>
  </div>
);

const UserEmailAnalytics = () => {
  return (
    <div>
      <div className="analytics-header">
        <h2>User Email Analytics</h2>
      </div>

      <div className="analytics-summary-grid">
        <AnalyticsCard title="Standard Users Emails Today" count={emailAnalyticsSummary.standardUsersEmails} />
        <AnalyticsCard title="Premium Users Emails Today" count={emailAnalyticsSummary.premiumUsersEmails} />
        <AnalyticsCard title="Free Temp Users Emails Today" count={emailAnalyticsSummary.freeUsersEmails} />
      </div>

      <div className="user-activity-table-container">
        <h3>Single User Email Activity (Today)</h3>
        <table className="user-activity-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Emails Generated</th>
            </tr>
          </thead>
          <tbody>
            {userEmailActivity.map(activity => (
              <tr key={activity.id}>
                <td>{activity.userName}</td>
                <td>{activity.emailsGenerated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserEmailAnalytics;
