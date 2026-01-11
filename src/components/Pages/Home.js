import React, { useState, useRef, useEffect } from "react";
import "./PagesCss/Home.css";
import "./PagesCss/f&q.css";
import gifEmptyInbox from "../assets/Favicon/empty-inbox.gif";
import qrCode from "../assets/Favicon/qr-code.gif";
import domainVerificationService from "../../services/domainVerificationService";

const faqs = [
  {
    id: 1,
    header: "What is a Temporary Email?",
    text: "A temporary email is a disposable email address that allows you to receive emails without revealing your personal email address. It's ideal for protecting your privacy while signing up for websites or services that might send unwanted emails or spam.",
  },
  {
    id: 2,
    header: "How long will my Temporary Email last?",
    text: "Your temporary email will last for 10 minutes. After this time, the email address will expire, and you will need to refresh or generate a new one if needed.",
  },
  {
    id: 3,
    header: "How do I view my incoming emails?",
    text: "After generating a temporary email, all incoming messages will appear in your inbox for the duration of the email's validity. Once the email expires, you won't be able to view any further incoming messages unless you refresh or generate a new temporary email.",
  },
  {
    id: 4,
    header: "Can I reply to the emails?",
    text: "No, temporary emails are one-way communication channels only. You can receive emails, but you cannot reply to them. They are designed to protect your personal email from spam and unnecessary exposure.",
  },
  {
    id: 5,
    header: "Is it safe to use a temporary email?",
    text: "Yes, temporary emails help protect your privacy by keeping your real email address hidden. However, avoid using them for critical communications, such as bank accounts or other important services.",
  },
  {
    id: 6,
    header: "How can I delete my temporary email?",
    text: "You can delete your temporary email by clicking the 'Delete' button, which will remove all emails associated with it. If you want to stop using the service, just change or refresh the email.",
  },
  {
    id: 7,
    header: "Can I use this email for verification purposes?",
    text: "Yes, you can use the temporary email for verification or sign-up purposes. However, keep in mind that some websites might block disposable email services, so it may not work for all types of verification.",
  },
  {
    id: 8,
    header: "How do I copy my temporary email?",
    text: "Simply click on the 'Copy' button next to your temporary email address. This will copy it to your clipboard, and you can paste it wherever you need.",
  },
  {
    id: 9,
    header: "What happens when my temporary email expires?",
    text: "Once your temporary email expires after 10 minutes, it will no longer receive incoming messages. You can refresh or generate a new email address to continue using the service.",
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
          className={`rc-accordion-toggle p-3 ${active === id ? "active" : ""}`}
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

const Home = () => {
  const [tempEmail, setTempEmail] = useState("mokoh16217@numerobo.com");
  const [inbox, setInbox] = useState([
    {
      id: 1,
      sender: "example@domain.com",
      senderName: "Temp Mail Service",
      subject: "Welcome to Temp Mail",
      content:
        "Thank you for using our temporary email service. This is a welcome email to show you how incoming messages will appear in your inbox. You can safely use this temporary email for all your verification needs without exposing your personal email address.",
      timestamp: "10:30 AM, Today",
      attachments: [],
    },
    {
      id: 2,
      sender: "no-reply@newsletter.com",
      senderName: "Tech Newsletter",
      subject: "Get our latest updates",
      content:
        "Stay updated with the latest technology trends and news. Our newsletter brings you curated content about web development, cybersecurity, and emerging technologies. Click here to learn more about our premium features.",
      timestamp: "09:15 AM, Today",
      attachments: [],
    },
    {
      id: 3,
      sender: "admin@website.com",
      senderName: "Website Admin",
      subject: "Your account has been activated",
      content:
        "Your account registration has been successfully processed and activated. You can now log in and start using all the features available. Please keep this email for your records. If you did not create this account, please contact our support team immediately.",
      timestamp: "Yesterday, 3:45 PM",
      attachments: [],
    },
  ]);

  const [selectedEmail, setSelectedEmail] = useState(null);
  const [active, setActive] = useState(null);
  const [emailValidity, setEmailValidity] = useState(10 * 60);
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const [verifiedDomains, setVerifiedDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [showCustomEmailInput, setShowCustomEmailInput] = useState(false);
  const [customEmailName, setCustomEmailName] = useState("");
  const [customEmailFeedback, setCustomEmailFeedback] = useState("");
  const [showDomainDropdown, setShowDomainDropdown] = useState(false);
  const [viewMode, setViewMode] = useState("inbox"); // 'inbox' or 'email-details'

  // Load verified domains on component mount
  useEffect(() => {
    const domains = domainVerificationService.getVerifiedDomains();
    setVerifiedDomains(domains);
    if (domains.length > 0 && !selectedDomain) {
      setSelectedDomain(domains[0].domain);
      const randomName = Math.random().toString(36).substring(2, 10);
      const newEmail = `${randomName}@${domains[0].domain}`;
      setTempEmail(newEmail);
    }
  }, [selectedDomain]);

  // Timer countdown effect
  useEffect(() => {
    let intervalId;

    if (timerRunning && emailValidity > 0) {
      intervalId = setInterval(() => {
        setEmailValidity((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            setTimerRunning(false);
            alert("Your temporary email has expired! Generate a new one.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [timerRunning, emailValidity]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(tempEmail);
    setIsEmailCopied(true);
    setTimeout(() => setIsEmailCopied(false), 2000);
  };

  const refreshEmail = () => {
    const domains =
      verifiedDomains.length > 0
        ? verifiedDomains.map((d) => d.domain)
        : ["numerobo.com", "tempinbox.com", "maildrop.cc", "guerrillamail.com"];

    const randomName = Math.random().toString(36).substring(2, 10);
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const newEmail = `${randomName}@${randomDomain}`;

    setTempEmail(newEmail);
    setEmailValidity(10 * 60);
    setTimerRunning(true);
    setCustomEmailName("");
    setShowCustomEmailInput(false);
  };

  const changeEmail = () => {
    const domains =
      verifiedDomains.length > 0
        ? verifiedDomains.map((d) => d.domain)
        : [
            "secure-temp.com",
            "anonmail.net",
            "privaterelay.io",
            "shieldmail.pro",
          ];

    const randomName = Math.random().toString(36).substring(2, 12);
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const newEmail = `${randomName}@${randomDomain}`;

    setTempEmail(newEmail);
    setEmailValidity(10 * 60);
    setTimerRunning(true);
    setCustomEmailName("");
    setShowCustomEmailInput(false);
  };

  const deleteEmail = () => {
    setInbox([]);
    if (viewMode === "email-details") {
      setViewMode("inbox");
      setSelectedEmail(null);
    }
  };

  const deleteSingleEmail = (id) => {
    setInbox(inbox.filter((email) => email.id !== id));
    if (selectedEmail && selectedEmail.id === id) {
      setSelectedEmail(null);
      setViewMode("inbox");
    }
  };

  const handleToggle = (id) => {
    setActive(active === id ? null : id);
  };

  const openEmailDetails = (email) => {
    setSelectedEmail(email);
    setViewMode("email-details");
  };

  const goBackToInbox = () => {
    setViewMode("inbox");
    setSelectedEmail(null);
  };

  const generateNewEmail = () => {
    const domains =
      verifiedDomains.length > 0
        ? verifiedDomains.map((d) => d.domain)
        : ["freshinbox.co", "tempcloak.com", "maskmail.live", "ghostbox.me"];

    const randomName =
      Math.random().toString(36).substring(2, 8) +
      Math.floor(Math.random() * 1000);
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const newEmail = `${randomName}@${randomDomain}`;

    setTempEmail(newEmail);
    setEmailValidity(10 * 60);
    setTimerRunning(true);
    setCustomEmailName("");
    setShowCustomEmailInput(false);
  };

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
    const randomName = Math.random().toString(36).substring(2, 10);
    const newEmail = `${randomName}@${domain}`;
    setTempEmail(newEmail);
    setEmailValidity(10 * 60);
    setTimerRunning(true);
    setCustomEmailName("");
    setShowCustomEmailInput(false);
    setShowDomainDropdown(false);
  };

  const quickUseDomain = (domain, e) => {
    e.stopPropagation();
    const randomName = Math.random().toString(36).substring(2, 10);
    const newEmail = `${randomName}@${domain}`;
    setTempEmail(newEmail);
    copyEmail();
  };

  const toggleCustomEmailInput = () => {
    setShowCustomEmailInput(!showCustomEmailInput);
    setCustomEmailName("");
    setCustomEmailFeedback("");
    setShowDomainDropdown(false);
  };

  const handleCustomEmailSubmit = () => {
    if (!customEmailName.trim()) {
      setCustomEmailFeedback("Please enter a username for your custom email");
      return;
    }

    // Validate custom email name
    const usernameRegex = /^[a-zA-Z0-9._-]+$/;
    if (!usernameRegex.test(customEmailName)) {
      setCustomEmailFeedback(
        "Username can only contain letters, numbers, dots, hyphens, and underscores"
      );
      return;
    }

    if (customEmailName.length < 3) {
      setCustomEmailFeedback("Username must be at least 3 characters long");
      return;
    }

    if (customEmailName.length > 30) {
      setCustomEmailFeedback("Username cannot exceed 30 characters");
      return;
    }

    if (!selectedDomain) {
      setCustomEmailFeedback("Please select a domain first");
      return;
    }

    const newEmail = `${customEmailName}@${selectedDomain}`;
    setTempEmail(newEmail);
    setEmailValidity(10 * 60);
    setTimerRunning(true);
    setCustomEmailFeedback(`Custom email created: ${newEmail}`);

    setTimeout(() => {
      setCustomEmailFeedback("");
      setShowCustomEmailInput(false);
    }, 3000);
  };

  const handleCustomEmailKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCustomEmailSubmit();
    }
  };

  const toggleDomainDropdown = () => {
    setShowDomainDropdown(!showDomainDropdown);
  };

  const handleDomainSelectFromDropdown = (domain) => {
    setSelectedDomain(domain);
    setShowDomainDropdown(false);
  };

  return (
    <div className="home-page">
      {/* Main Content */}
      <div className="home-container">
        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="hero-title">
            <span className="highlight">Secure</span> Temporary Email Service
          </h1>
          <p className="hero-subtitle">
            Protect your privacy with disposable email addresses that keep your
            inbox clean and secure
          </p>
        </div>

        {/* Email Section */}
        <div className="email-section">
          <div className="email-header">
            <h2>Your Temporary Email Address</h2>
            <div className="validity-timer">
              <i className="fa-solid fa-clock"></i>
              <span className="timer-text">
                Valid for: {formatTime(emailValidity)}
              </span>
              <div
                className={`timer-dot ${timerRunning ? "running" : "paused"}`}
              ></div>
            </div>
          </div>

          <div className="email-display-container">
            <div className="email-display-box">
              <div className="email-text">
                <i className="fa-solid fa-envelope"></i>
                <span className="email-address">{tempEmail}</span>
                {isEmailCopied && <span className="copied-badge">Copied!</span>}
              </div>
              <div className="email-actions">
                <button className="qr-button" title="Show QR Code">
                  <img src={qrCode} alt="QR Code" className="qr-code-gif" />
                </button>
                <button
                  className={`copy-button ${isEmailCopied ? "copied" : ""}`}
                  onClick={copyEmail}
                >
                  <i
                    className={`fa-solid ${
                      isEmailCopied ? "fa-check" : "fa-copy"
                    }`}
                  ></i>
                  {isEmailCopied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Timer Progress Bar */}
            <div className="timer-progress-container">
              <div className="timer-progress-bar">
                <div
                  className="timer-progress-fill"
                  style={{ width: `${(emailValidity / (10 * 60)) * 100}%` }}
                ></div>
              </div>
              <div className="timer-progress-labels">
                <span>0 min</span>
                <span>10 min</span>
              </div>
            </div>
          </div>

          {/* Custom Email Creation Section */}
          {verifiedDomains.length > 0 && selectedDomain && (
            <div className="custom-email-section">
              <div className="custom-email-header">
                <h3>
                  <i className="fa-solid fa-user-edit"></i>
                  Create Custom Email
                </h3>
                <button
                  className="toggle-custom-email-btn"
                  onClick={toggleCustomEmailInput}
                >
                  <i
                    className={`fa-solid fa-${
                      showCustomEmailInput ? "minus" : "plus"
                    }`}
                  ></i>
                  {showCustomEmailInput ? "Hide" : "Create Custom Email"}
                </button>
              </div>

              {showCustomEmailInput && (
                <div className="custom-email-input-container">
                  <div className="custom-email-input-group">
                    <input
                      type="text"
                      className="custom-email-input"
                      placeholder="Enter username (e.g., john.doe)"
                      value={customEmailName}
                      onChange={(e) => setCustomEmailName(e.target.value)}
                      onKeyPress={handleCustomEmailKeyPress}
                    />

                    {/* Domain Dropdown */}
                    <div className="custom-email-domain-dropdown">
                      <button
                        className="domain-dropdown-toggle"
                        onClick={toggleDomainDropdown}
                        type="button"
                      >
                        <span className="domain-selected">
                          @{selectedDomain}
                        </span>
                        <i
                          className={`fa-solid fa-chevron-${
                            showDomainDropdown ? "up" : "down"
                          }`}
                        ></i>
                      </button>

                      {showDomainDropdown && (
                        <div className="domain-dropdown-menu">
                          {verifiedDomains.map((domain) => (
                            <button
                              key={domain.id}
                              className={`domain-dropdown-item ${
                                selectedDomain === domain.domain ? "active" : ""
                              }`}
                              onClick={() =>
                                handleDomainSelectFromDropdown(domain.domain)
                              }
                            >
                              <i className="fa-solid fa-globe"></i>
                              <span>@{domain.domain}</span>
                              {selectedDomain === domain.domain && (
                                <i className="fa-solid fa-check"></i>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      className="create-custom-email-btn"
                      onClick={handleCustomEmailSubmit}
                    >
                      <i className="fa-solid fa-check"></i>
                      Create
                    </button>
                  </div>

                  {customEmailFeedback && (
                    <div
                      className={`custom-email-feedback ${
                        customEmailFeedback.includes("created")
                          ? "success"
                          : "error"
                      }`}
                    >
                      <i
                        className={`fa-solid ${
                          customEmailFeedback.includes("created")
                            ? "fa-check-circle"
                            : "fa-exclamation-circle"
                        }`}
                      ></i>
                      <span>{customEmailFeedback}</span>
                    </div>
                  )}

                  <div className="custom-email-tips">
                    <div className="tip">
                      <i className="fa-solid fa-lightbulb"></i>
                      <span>
                        Username can contain letters, numbers, dots, hyphens,
                        and underscores
                      </span>
                    </div>
                    <div className="tip">
                      <i className="fa-solid fa-lightbulb"></i>
                      <span>Must be 3-30 characters long</span>
                    </div>
                    <div className="tip">
                      <i className="fa-solid fa-lightbulb"></i>
                      <span>
                        Select your preferred domain from the dropdown
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Verified Domains Section */}
          {verifiedDomains.length > 0 && (
            <div className="verified-domains-section">
              <div className="verified-domains-header">
                <h3>
                  <i className="fa-solid fa-shield-check"></i>
                  Your Verified Domains
                </h3>
                <span className="domains-count">
                  {verifiedDomains.length} domains
                </span>
              </div>

              <div className="domains-grid-home">
                {verifiedDomains.map((domain, index) => (
                  <div
                    key={domain.id}
                    className={`domain-item ${
                      selectedDomain === domain.domain ? "selected" : ""
                    }`}
                    onClick={() => handleDomainSelect(domain.domain)}
                  >
                    <div className="domain-item-header">
                      <div className="domain-icon-container">
                        <i className="fa-solid fa-globe"></i>
                      </div>
                      <div className="domain-info">
                        <h4>{domain.domain}</h4>
                        <p className="domain-status">
                          <i className="fa-solid fa-check-circle"></i>
                          Verified
                        </p>
                      </div>
                    </div>
                    <div className="domain-item-footer">
                      <span className="domain-expiry">
                        Expires:{" "}
                        {new Date(domain.expiresAt).toLocaleDateString()}
                      </span>
                      <button
                        className="use-domain-btn"
                        onClick={(e) => quickUseDomain(domain.domain, e)}
                      >
                        <i className="fa-solid fa-bolt"></i>
                        Quick Use
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="description">
            <strong>
              Say goodbye to spam, unsolicited marketing, and potential security
              threats.
            </strong>
            With Temp-MailHub, you can keep your personal inbox clean, secure,
            and free from unwanted emails.
          </p>

          <div className="email-stats">
            <div className="stat-item">
              <i className="fa-solid fa-shield-halved"></i>
              <div>
                <h4>100% Anonymous</h4>
                <p>No personal data required</p>
              </div>
            </div>
            <div className="stat-item">
              <i className="fa-solid fa-bolt"></i>
              <div>
                <h4>Instant Access</h4>
                <p>No registration needed</p>
              </div>
            </div>
            <div className="stat-item">
              <i className="fa-solid fa-infinity"></i>
              <div>
                <h4>Unlimited</h4>
                <p>Generate unlimited emails</p>
              </div>
            </div>
          </div>

          <div className="button-row">
            <button className="button btn-primary" onClick={copyEmail}>
              <i className="fa-solid fa-copy"></i> Copy
            </button>
            <button className="button btn-secondary" onClick={refreshEmail}>
              <i className="fa-solid fa-arrows-rotate"></i> Refresh
            </button>
            <button className="button btn-secondary" onClick={changeEmail}>
              <i className="fa-solid fa-pen"></i> Change
            </button>
            <button className="button btn-danger" onClick={deleteEmail}>
              <i className="fa-solid fa-trash"></i> Delete All
            </button>
            <button className="button btn-success" onClick={generateNewEmail}>
              <i className="fa-solid fa-plus"></i> New Email
            </button>
          </div>
        </div>

        {/* Unified Inbox & Email Details Section */}
        <div className="email-content-section">
          <div className="unified-inbox-section">
            {/* Header with Back Button and Title */}
            <div className="inbox-header">
              <div className="inbox-title">
                {viewMode === "email-details" ? (
                  <button className="back-to-inbox-btn" onClick={goBackToInbox}>
                    <i className="fa-solid fa-arrow-left"></i> Back to Inbox
                  </button>
                ) : (
                  <>
                    <i className="fa-solid fa-inbox"></i>
                    <h2>Inbox</h2>
                    <span className="email-count" style={{ color: 'white' }}>{inbox.length} emails</span>
                  </>
                )}
              </div>
              
              {viewMode === "inbox" && (
                <button
                  className="refresh-inbox"
                  onClick={() => alert("Inbox refreshed!")}
                >
                  <i className="fa-solid fa-sync-alt"></i> Refresh
                </button>
              )}
            </div>

            {/* Content Area */}
            <div className="unified-inbox-content">
              {viewMode === "inbox" ? (
                <>
                  {/* Inbox List View */}
                  <div className="inbox-header-row">
                    <span className="header-item">
                      <i className="fa-solid fa-user"></i> Sender
                    </span>
                    <span className="header-item">
                      <i className="fa-solid fa-file-alt"></i> Subject
                    </span>
                    <span className="header-item">
                      <i className="fa-solid fa-clock"></i> Time
                    </span>
                    <span className="header-item">
                      <i className="fa-solid fa-eye"></i> View
                    </span>
                  </div>

                  <div className="inbox-content">
                    {inbox.length === 0 ? (
                      <div className="empty-inbox-container">
                        <div className="empty-inbox-animation">
                          <img
                            src={gifEmptyInbox}
                            alt="Empty inbox"
                            className="empty-inbox-gif"
                          />
                          <div className="pulse-ring"></div>
                        </div>
                        <h3 className="empty-inbox-title">Your Inbox is Empty</h3>
                        <p className="empty-inbox-subtitle">
                          Waiting for incoming emails...
                        </p>
                      </div>
                    ) : (
                      inbox.map((mail) => (
                        <div
                          className="inbox-item"
                          key={mail.id}
                        >
                          <div className="sender-info">
                            <div className="sender-avatar">
                              <i className="fa-solid fa-user-circle"></i>
                            </div>
                            <div className="sender-details">
                              <span className="sender-name" style={{ color: 'white' }}>{mail.senderName}</span>
                              <span className="sender-email">{mail.sender}</span>
                            </div>
                          </div>
                          <span className="email-subject">{mail.subject}</span>
                          <span className="email-time" style={{ color: 'white' }}>{mail.timestamp}</span>
                          <div className="email-actions">
                            <button
                              className="view-button"
                              onClick={() => openEmailDetails(mail)}
                            >
                              <i className="fa-solid fa-eye"></i> View
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Email Details View */}
                  {selectedEmail ? (
                    <div className="email-details-container">
                      <div className="email-details-header">
                        <h3>{selectedEmail.subject}</h3>
                      </div>
                      <div className="email-details-body">
                        <div className="email-sender-info">
                          <div className="sender-avatar">
                            <i className="fa-solid fa-user-circle"></i>
                          </div>
                          <div className="sender-details">
                            <h4>{selectedEmail.senderName}</h4>
                            <p className="sender-email">{selectedEmail.sender}</p>
                            <p className="email-time">{selectedEmail.timestamp}</p>
                          </div>
                        </div>
                        <div className="email-content">
                          <p>{selectedEmail.content}</p>
                        </div>
                        {selectedEmail.attachments &&
                          selectedEmail.attachments.length > 0 && (
                            <div className="email-attachments">
                              <h5>
                                <i className="fa-solid fa-paperclip"></i> Attachments
                              </h5>
                              <div className="attachments-list">
                                {selectedEmail.attachments.map(
                                  (attachment, index) => (
                                    <div key={index} className="attachment-item">
                                      <i className="fa-solid fa-file"></i>
                                      <span>{attachment.name}</span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                      <div className="email-details-footer">
                        <button
                          className="btn-secondary"
                          onClick={() => deleteSingleEmail(selectedEmail.id)}
                        >
                          <i className="fa-solid fa-trash"></i> Delete Email
                        </button>
                        
                      </div>
                    </div>
                  ) : (
                    <div className="no-email-selected">
                      <i className="fa-solid fa-envelope-open-text"></i>
                      <h3>No email selected</h3>
                      <p>Please select an email to view details</p>
                      <button className="btn-primary" onClick={goBackToInbox}>
                        <i className="fa-solid fa-arrow-left"></i> Back to Inbox
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h2 className="section-title">Why Choose Temp-MailHub?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fa-solid fa-user-shield"></i>
              </div>
              <h3>Privacy Protection</h3>
              <p>
                Keep your personal email address private and avoid spam and
                tracking
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fa-solid fa-mobile-screen"></i>
              </div>
              <h3>Mobile Friendly</h3>
              <p>Works perfectly on all devices and screen sizes</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <h3>Fast & Free</h3>
              <p>No registration required, instant email generation</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <div className="faq-header">
            <h2 className="section-title" style={{ color: "white" }}>
              <i
                className="fa-solid fa-circle-question"
                style={{ color: "white" }}
              ></i>
              Frequently Asked Questions
            </h2>
            <p className="section-subtitle" style={{ color: "white" }}>
              Quick answers to common questions
            </p>
          </div>

          <div className="faq-container">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                active={active}
                handleToggle={handleToggle}
                faq={faq}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;