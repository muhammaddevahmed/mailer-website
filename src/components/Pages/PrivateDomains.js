import React, { useState, useRef } from "react";
import "./PagesCss/PrivateDomains.css";
import './PagesCss/f&q.css';
import { useNavigate } from 'react-router-dom';

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

const PrivateDomains = () => {
  const [domain, setDomain] = useState("");
  const [domains, setDomains] = useState([]);
  const [showError, setShowError] = useState(false);

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
    setDomains([]);
  };

  const navigate = useNavigate(); // Initialize navigate function


  const [active, setActive] = useState(null);

const handleToggle = (id) => {
  setActive(active === id ? null : id);
};


  return (
    <div>
    <div className="home-container">
        <div className="temp-account-container">
      <h1>Add Your Private Domains</h1>
      <p className="subtit">The private domains belong to your account only</p>

      <div className="input-group-container">
        <input
          type="text"
          className="domain-input"
          placeholder="Enter domain"
          value={domain}
          onChange={(e) => {
            setDomain(e.target.value);
            setShowError(false);
          }}
        />
        
      </div>

      {/* Add Button */}
      <button onClick={addDomain} className="add-btn">
        <i className="fa-solid fa-plus"></i> Add Domain
      </button>
      {showError && <p className="error-text">Please fill domain to add</p>}
      {/* Delete All Button (visible only if there are more than one user cards) */}
      {domains.length > 1 && (
        <button onClick={deleteAllDomains} className="delete-all-btn">
          <i className="fa-solid fa-trash"></i> Delete All
        </button>
      )}
      </div>
      <div className="user-cards">
      {domains.map((domain, index) => (
        <div key={index} className="user-card">
          {/* Domain Label */}
          <div className="account-label">
            <h2>
              <i className="fa-solid fa-globe" style={{ marginRight: "10px" }}></i>
              Domain - {index + 1}
            </h2>

            {/* Delete Button for each domain */}
            <button onClick={() => deleteDomain(index)} className="delete-btn">
              <i className="fa-solid fa-trash"></i> Delete
            </button>
          </div>

          {/* Domain Details with Copy Button */}
          <div className="user-details">
            <p>
              <strong>
                <i className="fa-solid fa-link" style={{ marginRight: "8px" }}></i>
                Domain:
              </strong>{" "}
              {domain}
              <button onClick={() => navigator.clipboard.writeText(domain)} className="copy-btn">
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

export default PrivateDomains;