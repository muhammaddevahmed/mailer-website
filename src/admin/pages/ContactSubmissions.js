// ContactSubmissions.jsx - Enhanced Version
import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaFileAlt,
  FaCalendarAlt,
  FaEye,
  FaArchive,
  FaSearch,
} from "react-icons/fa";
import { contactSubmissionsData } from "../data/contactSubmissionsData";
import "./ContactSubmissions.css";

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState(contactSubmissionsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedMessage, setExpandedMessage] = useState(null);

  const toggleMessage = (id) => {
    setExpandedMessage(expandedMessage === id ? null : id);
  };

  const archiveSubmission = (id) => {
    if (window.confirm("Delete this submission?")) {
      setSubmissions(submissions.filter((sub) => sub.id !== id));
    }
  };

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div className="contact-submissions-container">
      <div className="submissions-header">
        <div className="header-content">
          <h2>
            <FaEnvelope className="header-icon" />
            Contact Form Submissions
          </h2>
          <p className="header-subtitle">Review and manage user inquiries</p>
        </div>
      </div>

      <div className="submissions-controls">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search submissions..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">📭</div>
          <h3>No submissions found</h3>
          <p>Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="submissions-table-container">
          <div className="table-responsive">
            <table className="submissions-table">
              <thead>
                <tr>
                  <th className="name-column">Sender</th>
                  <th className="subject-column">Subject</th>
                  <th className="date-column">Date</th>
                  <th className="actions-column">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map((submission) => (
                  <React.Fragment key={submission.id}>
                    <tr className={`submission-row ${submission.status}`}>
                      <td className="sender-cell">
                        <div className="sender-info">
                          <div className="sender-avatar">
                            {submission.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="sender-details">
                            <div className="sender-name">{submission.name}</div>
                            <div className="sender-email">
                              {submission.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="subject-cell">
                        <div className="subject-wrapper">
                          <FaFileAlt className="subject-icon" />
                          <span className="subject-text">
                            {submission.subject}
                          </span>
                        </div>
                      </td>
                      <td className="date-cell">
                        <div className="date-wrapper">
                          <FaCalendarAlt className="date-icon" />
                          <div className="date-info">
                            <div className="date-formatted">
                              {submission.date}
                            </div>
                            <div className="date-relative">
                              {getTimeAgo(submission.date)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="actions-cell">
                        <div className="action-buttons">
                          <button
                            className="action-btn view-btn"
                            onClick={() => toggleMessage(submission.id)}
                            title="View Message"
                          >
                            <FaEye />
                          </button>
                          <button
                            className="action-btn archive-btn"
                            onClick={() => archiveSubmission(submission.id)}
                            title="Delete"
                          >
                            <FaArchive />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {expandedMessage === submission.id && (
                      <tr className="message-expand-row">
                        <td colSpan="4">
                          <div className="message-expand-content">
                            <div className="message-header">
                              <h4>Message Details</h4>
                            </div>
                            <div className="message-content">
                              <p>{submission.message}</p>
                            </div>
                            <div className="message-meta">
                              <span className="meta-item">
                                <strong>Received:</strong> {submission.date}
                              </span>
                              <span className="meta-item">
                                <strong>IP Address:</strong>{" "}
                                {submission.ip || "N/A"}
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="submissions-footer">
        <div className="footer-info">
          Showing {filteredSubmissions.length} of {submissions.length}{" "}
          submissions
        </div>
        <div className="footer-actions">
          <button className="footer-btn export-btn">Export as CSV</button>
        </div>
      </div>
    </div>
  );
};

export default ContactSubmissions;
