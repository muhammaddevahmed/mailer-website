import React, { useState } from 'react';
import { contactSubmissionsData } from '../data/contactSubmissionsData';
import './ContactSubmissions.css';

const ContactSubmissions = () => {
  const [submissions] = useState(contactSubmissionsData);

  return (
    <div>
      <h2>Contact Form Submissions</h2>
      <div className="submissions-container">
        <table className="submissions-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(submission => (
              <tr key={submission.id}>
                <td>{submission.name}</td>
                <td>{submission.email}</td>
                <td>{submission.subject}</td>
                <td className="message-cell">{submission.message}</td>
                <td>{submission.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactSubmissions;

