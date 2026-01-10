import React, { useState, useRef } from "react";
import "./PagesCss/PrivateDomains.css";
import "./PagesCss/f&q.css";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    id: 1,
    header: "What are Private Domains?",
    text: "Private Domains are domains that belong exclusively to your account. They are not shared with other users and can only be managed by you.",
  },
  {
    id: 2,
    header: "How do I add a Private Domain?",
    text: "To add a Private Domain, enter the domain name in the input field and click the 'Add Domain' button. The domain will then be saved to your list.",
  },
  {
    id: 3,
    header: "Why am I seeing an error when adding a domain?",
    text: "If you see an error message, ensure that the domain field is not empty and that you are entering a valid domain name.",
  },
  {
    id: 4,
    header: "Can I delete a specific domain?",
    text: "Yes, you can delete a domain by clicking the 'Delete' button next to it in your list.",
  },
  {
    id: 5,
    header: "How do I delete all my Private Domains at once?",
    text: "If you have more than one domain saved, a 'Delete All' button will appear. Clicking it will remove all saved domains.",
  },
  {
    id: 6,
    header: "Can I copy my domain easily?",
    text: "Yes, each domain has a 'Copy' button next to it. Clicking this button will copy the domain name to your clipboard for easy access.",
  },
  {
    id: 7,
    header: "Will my Private Domains be saved permanently?",
    text: "Currently, Private Domains are stored temporarily within the session. If you refresh or leave the page, your domains may not be saved permanently.",
  },
  {
    id: 8,
    header: "Can I add multiple domains?",
    text: "Yes, you can add multiple domains to your list and manage them individually.",
  },
  {
    id: 9,
    header: "Is there a limit to how many domains I can add?",
    text: "There is no strict limit in the current version. However, adding too many domains may affect usability.",
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

const PrivateDomains = () => {
  const [domain, setDomain] = useState("");
  const [domains, setDomains] = useState([]);
  const [showError, setShowError] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(null);
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  const addDomain = () => {
    if (domain.trim() === "") {
      setShowError(true);
      return;
    }
    setShowError(false);
    setDomains([...domains, domain.trim()]);
    setDomain("");
  };

  const deleteDomain = (index) => {
    const newDomains = domains.filter((_, i) => i !== index);
    setDomains(newDomains);
  };

  const deleteAllDomains = () => {
    if (window.confirm("Are you sure you want to delete all domains?")) {
      setDomains([]);
    }
  };

  const handleCopy = (domain) => {
    navigator.clipboard
      .writeText(domain)
      .then(() => {
        setCopyFeedback(`Copied: ${domain}`);
        setTimeout(() => setCopyFeedback(null), 2000);
      })
      .catch((err) => console.error("Copy failed:", err));
  };

  const handleToggle = (id) => {
    setActive(active === id ? null : id);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addDomain();
    }
  };

  return (
    <div className="private-domains-container">
      {/* Header Section */}
      <div className="domains-header-section">
        <div className="header-content">
          <h1 className="main-title">Private Domains</h1>
          <p className="subtitle">
            Exclusive domains managed solely by your account
          </p>
        </div>
      </div>

      <div className="domains-content-wrapper">
        {/* Left Side - Domain Management */}
        <div className="domains-management-section">
          <div className="domain-input-section">
            <div className="input-header">
              <h2>
                <i className="fa-solid fa-circle-plus"></i> Add New Domain
              </h2>
              <p className="input-description">
                Enter your domain name below to add it to your private
                collection
              </p>
            </div>

            <div className="domain-input-container">
              <div className="domain-input-group">
                <i className="fa-solid fa-link input-icon"></i>
                <input
                  type="text"
                  className="domain-input"
                  placeholder="example.com"
                  value={domain}
                  onChange={(e) => {
                    setDomain(e.target.value);
                    setShowError(false);
                  }}
                  onKeyPress={handleKeyPress}
                />
                <button
                  onClick={addDomain}
                  className="add-domain-btn"
                  aria-label="Add domain"
                >
                  <i className="fa-solid fa-plus"></i> Add
                </button>
              </div>

              {showError && (
                <div className="error-message">
                  <i className="fa-solid fa-exclamation-circle"></i>
                  <span>Please enter a valid domain name</span>
                </div>
              )}
            </div>
          </div>

          {/* Domains List Section */}
          {domains.length > 0 && (
            <div className="domains-list-section">
              <div className="list-header">
                <h3>
                  <i className="fa-solid fa-list-check"></i>
                  Your Private Domains ({domains.length})
                </h3>
                {domains.length > 1 && (
                  <button
                    onClick={deleteAllDomains}
                    className="delete-all-btn"
                    aria-label="Delete all domains"
                  >
                    <i className="fa-solid fa-trash-can"></i> Clear All
                  </button>
                )}
              </div>

              {copyFeedback && (
                <div className="copy-feedback">
                  <i className="fa-solid fa-check-circle"></i>
                  {copyFeedback}
                </div>
              )}

              <div className="domains-grid">
                {domains.map((domain, index) => (
                  <div key={index} className="domain-card">
                    <div className="domain-card-header">
                      <div className="domain-number">
                        <span className="number-badge">{index + 1}</span>
                        <h4>Domain</h4>
                      </div>
                      <div className="card-actions">
                        <button
                          onClick={() => handleCopy(domain)}
                          className="copy-domain-btn"
                          aria-label="Copy domain"
                        >
                          <i className="fa-solid fa-copy"></i>
                        </button>
                        <button
                          onClick={() => deleteDomain(index)}
                          className="delete-domain-btn"
                          aria-label="Delete domain"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                    <div className="domain-card-body">
                      <div className="domain-content">
                        <i className="fa-solid fa-globe domain-icon"></i>
                        <div className="domain-info">
                          <span className="domain-label">Domain Address</span>
                          <p className="domain-value" title={domain}>
                            {domain}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {domains.length === 0 && !showError && (
            <div className="empty-state">
              <i className="fa-solid fa-cloud domain-empty-icon"></i>
              <h3>No Domains Added Yet</h3>
              <p>Start by adding your first private domain above</p>
            </div>
          )}
        </div>

        {/* Right Side - FAQ Section */}
        <div className="faq-section">
          <div className="faq-header">
            <h2  style={{ color: "white" }}>
              <i className="fa-solid fa-circle-question"></i> Frequently Asked
              Questions
            </h2>
            <p className="faq-subtitle"  style={{ color: "white" }}>Quick guidance for common questions</p>
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

export default PrivateDomains;
