import React, { useState } from 'react';
import { usersData } from '../data/usersData';
import './UsersManagement.css';

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="modal-overlay user-details-modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>User Details</h2>
          <button onClick={onClose} className="close-modal-btn">&times;</button>
        </div>
        <div className="user-details-grid">
          <div className="user-avatar-section">
            <div className="user-avatar">{getInitials(user.name)}</div>
            <span className={`plan-badge ${user.currentPlan.toLowerCase()}`}>{user.currentPlan}</span>
          </div>
          <div className="user-info-section">
            <h3>{user.name}</h3>
            <div className="user-info-grid">
              <div className="info-item">
                <label>Email</label>
                <p>{user.email}</p>
              </div>
              <div className="info-item">
                <label>Signup Date</label>
                <p>{user.signupDate}</p>
              </div>
              <div className="info-item">
                <label>Account Status</label>
                <p>
                  <span className={`status-dot ${user.accountStatus.toLowerCase()}`}></span>
                  {user.accountStatus}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UsersManagement = () => {
  const [users] = useState(usersData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const viewDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div>
      <h2>Users Management</h2>
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Signup Date</th>
              <th>Current Plan</th>
              <th>Account Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="user-name">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.signupDate}</td>
                <td><span className={`plan-badge ${user.currentPlan.toLowerCase()}`}>{user.currentPlan}</span></td>
                <td>
                  <span className={`status-dot ${user.accountStatus.toLowerCase()}`}></span>
                  {user.accountStatus}
                </td>
                <td>
                  <button onClick={() => viewDetails(user)} className="view-details-btn">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UserDetailsModal isOpen={isModalOpen} onClose={closeModal} user={selectedUser} />
    </div>
  );
};

export default UsersManagement;

