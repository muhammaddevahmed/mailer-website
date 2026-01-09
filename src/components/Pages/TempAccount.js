import React, { useState, useRef } from "react";
import "./PagesCss/TempAccount.css"; 
import './PagesCss/f&q.css';
import { useNavigate } from 'react-router-dom';

const faqs = [
    {
      id: 1,
      header: "What is a Temporary Account?",
      text: "A temporary account is a disposable account that allows you to generate a random username, full name, password, and email for temporary use. It is ideal for testing or quick sign-ups without using your personal credentials.",
    },
    {
      id: 2,
      header: "How long will my Temporary Account last?",
      text: "For free users, the temporary account lasts for 10 minutes before it is automatically deleted. Subscribers can create multiple accounts that last longer based on their plan.",
    },
    {
      id: 3,
      header: "Can I generate multiple accounts?",
      text: "Free users can generate only one temporary account at a time. Subscribers can generate and manage multiple temporary accounts based on their plan.",
    },
    {
      id: 4,
      header: "Can I delete my Temporary Account?",
      text: "Yes, you can manually delete your temporary account before it expires by clicking the 'Delete' button. Free accounts will be deleted automatically after 10 minutes.",
    },
    {
      id: 5,
      header: "Can I recover my Temporary Account after deletion?",
      text: "No, once a temporary account is deleted (either manually or automatically), it cannot be recovered. If needed, you can generate a new account.",
    },
    {
      id: 6,
      header: "How do I copy my account details?",
      text: "Each generated account has a 'Copy' button next to the username, full name, password, and email. Simply click the button to copy the information to your clipboard.",
    },
    {
      id: 7,
      header: "What happens if I don’t delete my Temporary Account?",
      text: "If you are on the free plan, your account will automatically expire and be deleted after 10 minutes. Subscribers can keep accounts based on their plan duration.",
    },
    {
      id: 8,
      header: "Is my Temporary Account secure?",
      text: "Temporary accounts are randomly generated and not linked to your personal information, making them secure for temporary use. However, they should not be used for sensitive or important accounts.",
    },
    {
      id: 9,
      header: "Can I use a Temporary Account for verification?",
      text: "You can use a temporary account for sign-ups and verification on some websites. However, some platforms may block disposable accounts, so it might not work everywhere.",
    },
    {
      id: 10,
      header: "What additional benefits do subscribers get?",
      text: "Subscribers can create multiple accounts, extend the account lifespan, and manage accounts beyond the 10-minute limit of the free plan.",
    },
  ];

  const AccordionItem = (props) => {
    const contentEl = useRef();
    const { handleToggle, active, faq } = props;
    const { header, id, text } = faq;
  
    return (
      <div className="rc-accordion-card">
        <div className="rc-accordion-header">
          <div
            className={`rc-accordion-toggle p-3 ${
              active === id ? "active" : ""
            }`}
            onClick={() => handleToggle(id)}
          >
            <h5 className="rc-accordion-title">{header}</h5>
            <i className="fa fa-chevron-down rc-accordion-icon"></i>
          </div>
        </div>
        <div
          ref={contentEl}
          className={`rc-collapse ${active === id ? "show" : ""}`}
          style={
            active === id
              ? { height: contentEl.current.scrollHeight }
              : { height: "0px" }
          }
        >
          <div className="rc-accordion-body">
            <p className="mb-0">{text}</p>
          </div>
        </div>
      </div>
    );
  };

const TempAccount = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]); // Array to store user cards

  // Function to generate random data for each field
  const generateRandomUsername = () => {
    const randomString = Math.random().toString(36).substring(2, 10);
    setUsername(`user_${randomString}`);
  };

  const generateRandomFullName = () => {
    const firstNames = ["John", "Jane", "Alice", "Bob", "Charlie", "Diana"];
    const lastNames = ["Doe", "Smith", "Johnson", "Brown", "Lee", "Garcia"];
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    setFullName(`${randomFirstName} ${randomLastName}`);
  };

  const generateRandomPassword = () => {
    const randomString = Math.random().toString(36).substring(2, 12);
    setPassword(randomString);
  };

  const generateRandomEmail = () => {
    const domains = ["example.com", "test.com", "demo.com", "mail.com"];
    const randomString = Math.random().toString(36).substring(2, 10);
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    setEmail(`${randomString}@${randomDomain}`);
  };

  // Function to add a new user card
  const addUserCard = () => {
    if (username && fullName && password && email) {
      const newUser = { username, fullName, password, email };
      setUsers([...users, newUser]); // Add new user to the array
      // Clear input fields after adding
      setUsername("");
      setFullName("");
      setPassword("");
      setEmail("");
    } else {
      alert("Please fill all fields before adding a user!");
    }
  };

  // Function to delete a specific user card
  const deleteUserCard = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  // Function to delete all user cards
  const deleteAllUserCards = () => {
    setUsers([]);
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const [active, setActive] = useState(null);

const handleToggle = (id) => {
  setActive(active === id ? null : id);
};

const navigate = useNavigate(); // Initialize navigate function

 

  return (
    <div>
        <div className="home-container">
        <div className="temp-account-container">
        <h1>Create Your Temporary Account</h1>
        <p class="subtit">Generate a disposable account instantly with auto-expiry.</p>
      {/* Input Fields */}
      <div className="input-group">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={generateRandomUsername} className="generate-btn">
          <i className="fa-solid fa-rotate"></i> Generate
        </button>
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <button onClick={generateRandomFullName} className="generate-btn">
          <i className="fa-solid fa-rotate"></i> Generate
        </button>
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={generateRandomPassword} className="generate-btn">
          <i className="fa-solid fa-rotate"></i> Generate
        </button>
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={generateRandomEmail} className="generate-btn">
          <i className="fa-solid fa-rotate"></i> Generate
        </button>
      </div>

      {/* Add Button */}
      <button onClick={addUserCard} className="add-btn">
        <i className="fa-solid fa-plus"></i> Add User
      </button>

      {/* Delete All Button (visible only if there are more than one user cards) */}
      {users.length > 1 && (
        <button onClick={deleteAllUserCards} className="delete-all-btn">
          <i className="fa-solid fa-trash"></i> Delete All
        </button>
      )}
</div>
      {/* Display User Cards */}
      <div className="user-cards">
        {users.map((user, index) => (
          <div key={index} className="user-card">
            {/* Account Label */}
            <div className="account-label">
              <h2>
              <i class="fa-solid fa-user-tie" style={{ marginRight: '10px' }}></i>
                Account - {index + 1}
                </h2>

                {/* Delete Button for each card */}
            <button onClick={() => deleteUserCard(index)} className="delete-btn">
              <i className="fa-solid fa-trash"></i> Delete
            </button>
            </div>

            

            {/* User Details with Copy Buttons */}
            <div className="user-details">
              <p>
                <strong>
                <i class="fa-solid fa-image-portrait" style={{ marginRight: "8px" }}></i>
                    Username:
                    </strong> {user.username}
                <button onClick={() => copyToClipboard(user.username)} className="copy-btn">
                  <i className="fa-solid fa-copy"></i> Copy
                </button>
              </p>
              <p>
                <strong>
                <i class="fa-solid fa-id-card" style={{ marginRight: "8px" }}></i>
                    Full Name:
                    </strong> {user.fullName}
                <button onClick={() => copyToClipboard(user.fullName)} className="copy-btn">
                  <i className="fa-solid fa-copy"></i> Copy
                </button>
              </p>
              <p>
                <strong>
                <i class="fa-solid fa-lock" style={{ marginRight: "8px" }}></i>
                    Password:
                    </strong> {user.password}
                <button onClick={() => copyToClipboard(user.password)} className="copy-btn">
                  <i className="fa-solid fa-copy"></i> Copy
                </button>
              </p>
              <p>
                <strong>
                <i class="fa-solid fa-envelope" style={{ marginRight: "8px" }}></i>
                    Email:
                    </strong> {user.email}
                <button onClick={() => copyToClipboard(user.email)} className="copy-btn">
                  <i className="fa-solid fa-copy"></i> Copy
                </button>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="container-fluid mt-5 mb-5">
    <div className="row d-flex justify-content-center align-items-center">
    <div className="col-md-8 col-lg-6 col-sm-10 mt-2 mx-auto">
            <div className="card">
              <div className="card-body">
                <h4 className="form-heading mb-4 text-primary text-center mt-3">
                FAQ
                </h4>
                <p className="praText">The frequent questions and you can find quick guidance here</p>
                {faqs.map((faq, index) => {
                  return (
                    <AccordionItem
                      key={index}
                      active={active}
                      handleToggle={handleToggle}
                      faq={faq}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempAccount;