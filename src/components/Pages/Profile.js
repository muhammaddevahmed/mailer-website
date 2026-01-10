import React, { useState, useEffect } from "react";
import "./PagesCss/Profile.css";
import avatarGif from "../assets/Favicon/logo.gif";
import { Link } from "react-router-dom";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("user");
  const [avatar, setAvatar] = useState(avatarGif);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "user@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState({
    newsletter: true,
    marketing: false,
    securityAlerts: true,
    accountUpdates: true,
  });
  const [subscription, setSubscription] = useState({
    plan: "Premium",
    price: 19.99,
    status: "active",
    nextBillingDate: "March 10, 2025",
    renewalType: "monthly",
    features: [
      "Unlimited temporary accounts",
      "24-hour account lifespan",
      "Priority email support",
      "Advanced spam filtering",
      "Custom domain support",
    ],
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Handle file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      // In real app, upload to server here
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field) => {
    setNotifications((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Toggle Edit Mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Reset password fields when starting edit
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  // Handle Save
  const handleSave = () => {
    if (
      passwordData.newPassword &&
      passwordData.newPassword !== passwordData.confirmPassword
    ) {
      alert("Passwords do not match!");
      return;
    }

    if (passwordData.newPassword && passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    // In real app, make API call to update profile
    setIsEditing(false);

    // Show success toast
    showToast("Profile updated successfully!");
  };

  const showToast = (message) => {
    // Create toast element
    const toast = document.createElement("div");
    toast.className = "profile-toast show";
    toast.innerHTML = `
      <i class="fa-solid fa-circle-check"></i>
      <span>${message}</span>
    `;
    document.querySelector(".profile-container").appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePlanAction = (action) => {
    if (action === "pause") {
      if (window.confirm("Are you sure you want to pause your subscription?")) {
        setSubscription((prev) => ({ ...prev, status: "paused" }));
        showToast("Subscription paused successfully!");
      }
    } else if (action === "cancel") {
      if (
        window.confirm("Are you sure you want to cancel your subscription?")
      ) {
        setSubscription((prev) => ({ ...prev, status: "cancelled" }));
        showToast("Subscription cancelled successfully!");
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#4CAF50";
      case "paused":
        return "#FF9800";
      case "cancelled":
        return "#f44336";
      default:
        return "#666";
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="header-content">
            <div className="avatar-section">
              <label htmlFor="avatar-upload" className="avatar-label">
                <div className="avatar-wrapper">
                  <img src={avatar} alt="User Avatar" className="avatar" />
                  <div className="avatar-overlay">
                    <i className="fa-solid fa-camera"></i>
                    <span>Change</span>
                  </div>
                </div>
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <div className="user-info">
              <h2>{userData.name}</h2>
              <p className="user-email">
                <i className="fa-solid fa-envelope"></i>
                {userData.email}
              </p>
              <p className="user-membership">
                <i className="fa-solid fa-crown"></i>
                Premium Member • Joined Jan 2024
              </p>
            </div>
            <div className="header-stats">
              <div className="stat-item">
                <i className="fa-solid fa-shield-halved"></i>
                <div>
                  <h3>100%</h3>
                  <p>Security Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="profile-nav">
          <div className="nav-tabs">
            <button
              className={`nav-tab ${activeTab === "user" ? "active" : ""}`}
              onClick={() => setActiveTab("user")}
            >
              <i className="fa-solid fa-user-gear"></i>
              <span>Profile Settings</span>
            </button>
            <button
              className={`nav-tab ${
                activeTab === "subscription" ? "active" : ""
              }`}
              onClick={() => setActiveTab("subscription")}
            >
              <i className="fa-solid fa-credit-card"></i>
              <span>Subscription</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          {/* Profile Settings Tab */}
          {activeTab === "user" && (
            <div className="content-card">
              <div className="card-header">
                <h3>
                  <i className="fa-solid fa-user-circle"></i> Personal
                  Information
                </h3>
                <button
                  className={`edit-toggle-btn ${isEditing ? "editing" : ""}`}
                  onClick={toggleEdit}
                >
                  {isEditing ? (
                    <>
                      <i className="fa-solid fa-times"></i>
                      Cancel Edit
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-pen"></i>
                      Edit Profile
                    </>
                  )}
                </button>
              </div>

              <div className="form-section">
                <div className="form-grid">
                  <div className="form-group">
                    <label style={{ color: "black" }}>
                      <i className="fa-solid fa-user"></i>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={userData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      disabled={!isEditing}
                      className={isEditing ? "editable" : ""}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ color: "black" }}>
                      <i className="fa-solid fa-envelope"></i>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      disabled={!isEditing}
                      className={isEditing ? "editable" : ""}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="password-section">
                    <h4>
                      <i className="fa-solid fa-key"></i> Change Password
                    </h4>
                    <div className="password-grid">
                      <div className="form-group">
                        <label style={{ color: "black" }}>
                          Current Password
                        </label>
                        <div className="password-input">
                          <input
                            type={showPassword.current ? "text" : "password"}
                            placeholder="Enter current password"
                            value={passwordData.currentPassword}
                            onChange={(e) =>
                              handlePasswordChange(
                                "currentPassword",
                                e.target.value
                              )
                            }
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => togglePasswordVisibility("current")}
                          >
                            <i
                              className={`fa-solid ${
                                showPassword.current ? "fa-eye-slash" : "fa-eye"
                              }`}
                            ></i>
                          </button>
                        </div>
                      </div>

                      <div className="form-group">
                        <label style={{ color: "black" }}>New Password</label>
                        <div className="password-input">
                          <input
                            type={showPassword.new ? "text" : "password"}
                            placeholder="Enter new password"
                            value={passwordData.newPassword}
                            onChange={(e) =>
                              handlePasswordChange(
                                "newPassword",
                                e.target.value
                              )
                            }
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => togglePasswordVisibility("new")}
                          >
                            <i
                              className={`fa-solid ${
                                showPassword.new ? "fa-eye-slash" : "fa-eye"
                              }`}
                            ></i>
                          </button>
                        </div>
                        {passwordData.newPassword && (
                          <div className="password-strength">
                            <div
                              className={`strength-bar ${
                                passwordData.newPassword.length >= 8
                                  ? "strong"
                                  : "weak"
                              }`}
                            ></div>
                            <span>
                              Password strength:{" "}
                              {passwordData.newPassword.length >= 8
                                ? "Strong"
                                : "Weak"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="form-group">
                        <label style={{ color: "black" }}>
                          Confirm Password
                        </label>
                        <div className="password-input">
                          <input
                            type={showPassword.confirm ? "text" : "password"}
                            placeholder="Confirm new password"
                            value={passwordData.confirmPassword}
                            onChange={(e) =>
                              handlePasswordChange(
                                "confirmPassword",
                                e.target.value
                              )
                            }
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => togglePasswordVisibility("confirm")}
                          >
                            <i
                              className={`fa-solid ${
                                showPassword.confirm ? "fa-eye-slash" : "fa-eye"
                              }`}
                            ></i>
                          </button>
                        </div>
                        {passwordData.confirmPassword &&
                          passwordData.newPassword !==
                            passwordData.confirmPassword && (
                            <span className="error-text">
                              Passwords do not match
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                )}

                {isEditing && (
                  <div className="form-actions">
                    <button className="btn btn-save" onClick={handleSave}>
                      <i className="fa-solid fa-floppy-disk"></i>
                      Save Changes
                    </button>
                    <button className="btn btn-cancel" onClick={toggleEdit}>
                      <i className="fa-solid fa-times"></i>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Subscription Tab */}
          {activeTab === "subscription" && (
            <div className="content-card">
              <div className="card-header">
                <h3>
                  <i className="fa-solid fa-crown"></i> Subscription Management
                </h3>
                <div
                  className="status-badge"
                  style={{
                    backgroundColor: getStatusColor(subscription.status),
                  }}
                >
                  {subscription.status.charAt(0).toUpperCase() +
                    subscription.status.slice(1)}
                </div>
              </div>

              <div className="subscription-details">
                <div className="plan-card">
                  <div className="plan-header">
                    <div className="plan-icon">
                      <i className="fa-solid fa-diamond"></i>
                    </div>
                    <div>
                      <h4>{subscription.plan} Plan</h4>
                      <p className="plan-price">
                        ${subscription.price}/month
                        <span className="billing-cycle">
                          Billed {subscription.renewalType}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="plan-features">
                    <h5>Plan Features:</h5>
                    <ul>
                      {subscription.features.map((feature, index) => (
                        <li key={index}>
                          <i className="fa-solid fa-check"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="plan-info">
                    <div className="info-item">
                      <i className="fa-solid fa-calendar-check"></i>
                      <div>
                        <span>Next Billing</span>
                        <strong>{subscription.nextBillingDate}</strong>
                      </div>
                    </div>
                    <div className="info-item">
                      <i className="fa-solid fa-credit-card"></i>
                      <div>
                        <span>Payment Method</span>
                        <strong>•••• 4567 (Visa)</strong>
                      </div>
                    </div>
                    <div className="info-item">
                      <i className="fa-solid fa-clock-rotate-left"></i>
                      <div>
                        <span>Renewal Type</span>
                        <strong>Auto-renewal</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="subscription-actions">
                 <Link to="/pricing" style={{ textDecoration: "none" }}>
  <button className="btn btn-upgrade">
    <i className="fa-solid fa-arrow-up"></i>
    Upgrade Plan
  </button>
</Link>

                  <button
                    className="btn btn-pause"
                    onClick={() => handlePlanAction("pause")}
                    disabled={subscription.status !== "active"}
                  >
                    <i className="fa-solid fa-pause"></i>
                    {subscription.status === "paused" ? "Resume" : "Pause"}{" "}
                    Subscription
                  </button>
                  <button
                    className="btn btn-cancel-sub"
                    onClick={() => handlePlanAction("cancel")}
                    disabled={subscription.status === "cancelled"}
                  >
                    <i className="fa-solid fa-times"></i>
                    Cancel Subscription
                  </button>
                </div>

                <div className="billing-note">
                  <p>
                    <i className="fa-solid fa-info-circle"></i> Your
                    subscription will auto-renew. You can cancel anytime.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
