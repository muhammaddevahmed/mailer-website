import React, { useState } from "react";
import "./PagesCss/Profile.css";
import avatarGif from "../assets/Favicon/logo.gif"

const Profile = () => {
  const [activeTab, setActiveTab] = useState("user"); // Default tab
  const [avatar, setAvatar] = useState(avatarGif);
  const [email, setEmail] = useState("user@example.com");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [receiveNewsletter, setReceiveNewsletter] = useState(true);

  // Handle file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  // Toggle Edit Mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle Save
  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleReceiveNewsletterChange = (event) => {
    setReceiveNewsletter(event.target.checked);
  };

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <label htmlFor="avatar-upload" className="avatar-label">
          <img src={avatar} alt="User Avatar" className="avatar" />
          <div className="upload-overlay">Upload</div>
        </label>
        <input
          type="file"
          id="avatar-upload"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <h2>John Doe</h2>
      </div>

      {/* Tab Buttons */}
      <div className="tab-buttons">
        <button
          className={`tab-btn ${activeTab === "user" ? "active" : ""}`}
          onClick={() => setActiveTab("user")}
        >
          <i className="fa-solid fa-user" style={{ marginRight: "8px" }}></i> 
          User Details
        </button>
        <button
          className={`tab-btn ${activeTab === "subscription" ? "active" : ""}`}
          onClick={() => setActiveTab("subscription")}
        >
          <i class="fa-solid fa-cart-shopping" style={{ marginRight: "8px" }}></i>
          Subscription
        </button>
      </div>

      {/* User Details Tab */}
      {activeTab === "user" && (
        <div className="tab-content"> 
          <div className="content-center"> 
          <h3>
          <i class="fa-solid fa-user" style={{ marginRight: "8px" }}></i>
          Account Details
            </h3>
          </div>
          <hr />
          {/* Email Field */}
          <div className="input-group">
            <label>
            <i class="fa-solid fa-envelope" style={{ marginRight: "8px" }}></i>
              Email
              </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!isEditing}
            />
          </div>
          {/* New Password Field */}
          <div className="input-group">
            <label>
            <i class="fa-solid fa-lock" style={{ marginRight: "8px" }}></i>
              New Password
              </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={!isEditing}
            />
          </div>

          {/* Confirm Password Field */}
          <div className="input-group">
            <label>
            <i class="fa-solid fa-lock" style={{ marginRight: "8px" }}></i>
              Confirm Password
              </label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <hr />
          {/* Edit & Save Buttons */}
          <div className="button-group">
            {!isEditing ? (
              <button className="btns btns-yellow" onClick={toggleEdit}>
                <i class="fa-solid fa-pen-to-square" style={{ marginRight: "8px" }}></i>
                Edit
              </button>
            ) : (
              <>
                <button className="btns btns-blue" onClick={handleSave}>
                <i class="fa-solid fa-check" style={{ marginRight: "8px" }}></i>
                  Save
                </button>
                <button className="btns btns-red" onClick={toggleEdit}>
                <i class="fa-solid fa-xmark" style={{ marginRight: "8px" }}></i>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Subscription Tab */}
      {activeTab === "subscription" && (
        <div className="tab-content">
          <div className="content-center"> 
          <h3>
          <i class="fa-solid fa-dollar-sign" style={{ marginRight: "8px" }}></i>
            Subscription Plan
            </h3>
          </div>
          <hr />
          <div className="subscription-info">
    <p><strong>
    <i class="fa-solid fa-hexagon-nodes" style={{ marginRight: "8px" }}></i>
      Current Plan:</strong> <span className="premium-plan">Premium</span></p>
    <p><strong>
    <i class="fa-solid fa-dollar-sign" style={{ marginRight: "8px" }}></i>
      Price:</strong> $19.99/month</p>
    <p><strong>
    <i class="fa-solid fa-chart-simple" style={{ marginRight: "8px" }}></i>
      Status:</strong> <span className="active-status">Active</span></p>
    <p><strong>
    <i class="fa-solid fa-file-invoice-dollar" style={{ marginRight: "8px" }}></i>
      Next Billing Date:</strong> March 10, 2025</p>
  </div>
  <hr/>
  <div className="newsletter-section">
  <h2>Notifications <i class="fa fa-bell" aria-hidden="true"></i></h2>
  <div className="plan-section">
            <p>Receive Newsletters, Promotions & News From D-Tech Studios Company :
            <label className="switch">
              <input
                type="checkbox"
                checked={receiveNewsletter}
                onChange={handleReceiveNewsletterChange}
              />
              <span className="slider"></span>
              
            </label>
            </p>
            </div>
          </div>
          <hr/>
  <div className="subscription-info-para">
      <p>Your Payment Will Be Automatically Renewed Each Month.</p>
          <p>* VAT & Local Taxes Are Included.</p>
          </div>
          <hr />
          <div className="button-group">
            <button className="btns btns-green">
            <i class="fa-solid fa-pause" style={{ marginRight: "8px" }}></i>
              Pause Subscription
              </button>
            <button className="btns btns-red">
            <i class="fa-solid fa-xmark" style={{ marginRight: "8px" }}></i>
              Cancel Subscription
              </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
