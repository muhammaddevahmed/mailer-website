import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminProfile.css';

const AdminProfile = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
    navigate('/admin/dashboard');
  };

  return (
    <div className="admin-profile-container">
      <div className="admin-profile-card">
        <h2 className="admin-profile-title">Admin Profile</h2>
        <p className="admin-profile-subtitle">Update your email and password</p>
        <form className="admin-profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" defaultValue="admin@example.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="current-password">Current Password</label>
            <input type="password" id="current-password" placeholder="Enter current password" required />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input type="password" id="new-password" placeholder="Enter new password" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm New Password</label>
            <input type="password" id="confirm-password" placeholder="Confirm new password" required />
          </div>
          <button type="submit" className="btn-update">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
