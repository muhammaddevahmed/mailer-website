import React, { useState, useRef, useEffect } from "react";
import "./PagesCss/PrivateDomains.css";
import "./PagesCss/f&q.css";
import { useNavigate } from "react-router-dom";
import domainVerificationService from '../../services/domainVerificationService';

const faqs = [
  {
    id: 1,
    header: "What are Private Domains?",
    text: "Private Domains are exclusive domains that belong solely to your account. Once verified through MX record check, they can be used for generating temporary emails.",
  },
  {
    id: 2,
    header: "How do I add a Private Domain?",
    text: "Enter your domain in the input field and click 'Add Domain'. The system will automatically verify MX records to ensure email functionality.",
  },
  {
    id: 3,
    header: "What is MX Record Verification?",
    text: "MX (Mail Exchange) record verification ensures that your domain is properly configured to receive emails. This is required for the domain to be usable.",
  },
  {
    id: 4,
    header: "How long does verification take?",
    text: "Verification typically completes within a few seconds. If verification fails, you can retry or check your domain's DNS settings.",
  },
  {
    id: 5,
    header: "Can I use unverified domains?",
    text: "No, only verified domains with proper MX records can be used for generating temporary email addresses.",
  },
  {
    id: 6,
    header: "How do I delete a domain?",
    text: "Click the delete button next to any domain to remove it. This will also remove it from your available domains on the home page.",
  },
  {
    id: 7,
    header: "Will domains expire?",
    text: "Verified domains remain active for 30 days. You'll receive notifications before expiration to renew if needed.",
  },
  {
    id: 8,
    header: "Can I add multiple domains?",
    text: "Yes, you can add and verify multiple domains. All verified domains will appear in your home page for selection.",
  },
  {
    id: 9,
    header: "Why is my domain verification pending?",
    text: "Pending verification usually means MX records aren't properly configured. Check your domain's DNS settings and retry verification.",
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
  const [active, setActive] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState({});
  const [isVerifying, setIsVerifying] = useState({});
  const navigate = useNavigate();

  // Load domains from verification service
  useEffect(() => {
    loadDomains();
  }, []);

  const loadDomains = () => {
    const allDomains = domainVerificationService.getAllDomains();
    const combinedDomains = [
      ...allDomains.verified.map(d => ({ ...d, type: 'verified' })),
      ...allDomains.pending.map(d => ({ ...d, type: 'pending' }))
    ];
    setDomains(combinedDomains);
  };

  const validateDomain = (domain) => {
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
    return domainRegex.test(domain);
  };

  const addDomain = async () => {
    const trimmedDomain = domain.trim().toLowerCase();
    
    if (!trimmedDomain) {
      setShowError(true);
      setCopyFeedback("Please enter a domain name");
      return;
    }
    
    if (!validateDomain(trimmedDomain)) {
      setShowError(true);
      setCopyFeedback("Please enter a valid domain name (e.g., example.com)");
      return;
    }
    
    // Check if domain already exists
    if (domains.some(d => d.domain === trimmedDomain)) {
      setShowError(true);
      setCopyFeedback("This domain is already added");
      return;
    }
    
    setShowError(false);
    setIsVerifying(prev => ({ ...prev, [trimmedDomain]: true }));
    
    try {
      const result = await domainVerificationService.verifyMXRecords(trimmedDomain);
      
      setVerificationStatus(prev => ({
        ...prev,
        [trimmedDomain]: result.status
      }));
      
      // Add temporary domain with loading state
      const tempDomain = {
        id: result.id,
        domain: trimmedDomain,
        status: result.status,
        type: result.status === 'verified' ? 'verified' : 'pending',
        addedAt: new Date().toISOString()
      };
      
      setDomains(prev => [...prev, tempDomain]);
      setCopyFeedback(`Domain added! Status: ${result.status === 'verified' ? 'Verified ✓' : 'Pending verification'}`);
      
    } catch (error) {
      setCopyFeedback("Verification failed. Please try again.");
    } finally {
      setIsVerifying(prev => ({ ...prev, [trimmedDomain]: false }));
      setDomain("");
    }
    
    setTimeout(() => setCopyFeedback(null), 3000);
  };

  const deleteDomain = (domainToDelete) => {
    domainVerificationService.removeDomain(domainToDelete);
    setDomains(prev => prev.filter(d => d.domain !== domainToDelete));
    setCopyFeedback(`Domain "${domainToDelete}" deleted`);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const retryVerification = async (domainId, domainName) => {
    setIsVerifying(prev => ({ ...prev, [domainName]: true }));
    
    try {
      const result = await domainVerificationService.retryVerification(domainId);
      if (result) {
        setVerificationStatus(prev => ({
          ...prev,
          [domainName]: result.status
        }));
        
        // Update the domain in the list
        setDomains(prev => prev.map(d => 
          d.id === domainId 
            ? { ...d, status: result.status, type: result.status === 'verified' ? 'verified' : 'pending' }
            : d
        ));
        
        setCopyFeedback(`Verification ${result.status === 'verified' ? 'successful!' : 'still pending'}`);
      }
    } catch (error) {
      setCopyFeedback("Retry failed. Please try again.");
    } finally {
      setIsVerifying(prev => ({ ...prev, [domainName]: false }));
    }
    
    setTimeout(() => setCopyFeedback(null), 3000);
  };

  const deleteAllDomains = () => {
    if (window.confirm("Are you sure you want to delete all domains? This cannot be undone.")) {
      domainVerificationService.clearAll();
      setDomains([]);
      setCopyFeedback("All domains deleted");
      setTimeout(() => setCopyFeedback(null), 2000);
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
            Add and verify domains for exclusive temporary email addresses
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
                Enter your domain name below. MX record verification will be performed automatically.
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
                  disabled={isVerifying[domain]}
                >
                  {isVerifying[domain] ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i> Verifying...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-plus"></i> Add Domain
                    </>
                  )}
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
                  Your Domains ({domains.filter(d => d.type === 'verified').length} verified, {domains.filter(d => d.type === 'pending').length} pending)
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
                  <div key={domain.id} className="domain-card">
                    <div className="domain-card-header">
                      <div className="domain-number">
                        <span className="number-badge">{index + 1}</span>
                        <div className="domain-status-container">
                          <h4>Domain</h4>
                          <span className={`status-badge status-${domain.type}`}>
                            {domain.type === 'verified' ? '✓ Verified' : '⏳ Pending'}
                          </span>
                        </div>
                      </div>
                      <div className="card-actions">
                        <button
                          onClick={() => handleCopy(domain.domain)}
                          className="copy-domain-btn"
                          aria-label="Copy domain"
                        >
                          <i className="fa-solid fa-copy"></i>
                        </button>
                        <button
                          onClick={() => deleteDomain(domain.domain)}
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
                          <p className="domain-value" title={domain.domain}>
                            {domain.domain}
                          </p>
                        </div>
                      </div>
                      
                      <div className="verification-details">
                        {domain.type === 'verified' ? (
                          <div className="verified-info">
                            <i className="fa-solid fa-check-circle verified-icon"></i>
                            <span>MX records verified • Expires in 30 days</span>
                          </div>
                        ) : (
                          <div className="pending-info">
                            <i className="fa-solid fa-clock pending-icon"></i>
                            <span>MX verification required</span>
                            <button
                              onClick={() => retryVerification(domain.id, domain.domain)}
                              className="retry-btn"
                              disabled={isVerifying[domain.domain]}
                            >
                              {isVerifying[domain.domain] ? (
                                <i className="fa-solid fa-spinner fa-spin"></i>
                              ) : (
                                'Retry'
                              )}
                            </button>
                          </div>
                        )}
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
              <p>Add your first domain to start using verified domains for temporary emails</p>
              <div className="empty-state-tips">
                <div className="tip">
                  <i className="fa-solid fa-lightbulb"></i>
                  <span>Verified domains will appear on the home page for selection</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - FAQ Section */}
        <div className="faq-section">
          <div className="faq-header">
            <h2 style={{ color: "white" }}>
              <i className="fa-solid fa-circle-question"></i> Domain Verification FAQ
            </h2>
            <p className="faq-subtitle" style={{ color: "white" }}>
              Learn about MX record verification and domain management
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

export default PrivateDomains;