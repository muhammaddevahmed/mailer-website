import React, { useState, useRef } from 'react';
import './PagesCss/Home.css';
import './PagesCss/f&q.css';
import { useNavigate } from 'react-router-dom';
import gifEmptyInbox from '../assets/Favicon/empty-inbox.gif';
import qrCode from '../assets/Favicon/qr-code.gif';

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

const Home = () => {
  const [tempEmail, setTempEmail] = useState('mokoh16217@numerobo.com');
  const [inbox, setInbox] = useState([
    { sender: 'example@domain.com', subject: 'Welcome to Temp Mail', id: 1 },
    { sender: 'no-reply@newsletter.com', subject: 'Get our latest updates', id: 2 },
    { sender: 'admin@website.com', subject: 'Your account has been activated', id: 3 },
  ]);

  // Functions for buttons
  const copyEmail = () => {
    navigator.clipboard.writeText(tempEmail);
    alert('Email Address Copied!');
  };

  const refreshEmail = () => {
    setTempEmail('new-email@numerobo.com');
  };

  const changeEmail = () => {
    setTempEmail('another-email@numerobo.com');
  };

  const deleteEmail = () => {
    setInbox([]);
  };

  const [active, setActive] = useState(null);

const handleToggle = (id) => {
  setActive(active === id ? null : id);
};
  

const navigate = useNavigate(); // Initialize navigate function


  return (
    <div>
    <div className="home-container">
      <div className="email-section">
        <h1>Your Temporary Email Address</h1>
        <div className="email-box">
  <p className="email-address">{tempEmail}</p>
  <button className="gif-bg">
  <img src={qrCode} alt="QR-Code" className="qr-code-gif" />
  </button>
  <button className="copy-button" onClick={copyEmail}>
  <i className="fa-solid fa-copy"></i> Copy
</button>
</div>

        <p className="description">
        <strong>Say goodbye to spam, unsolicited marketing, and potential security threats.</strong>
        </p>
        <p className="description">
        With Temp-MailHub, you can keep your personal inbox clean, secure, and free from unwanted emails. Our <strong>temporary, anonymous, and disposable email addresses</strong> ensure that your primary email remains private while safeguarding you from malicious bots and privacy breaches. <strong>Protect your online presence</strong> with our free, reliable service designed to keep your digital life safe.
        </p>

        <div className="button-row">
        <button className="button" onClick={copyEmail}>
  <i className="fa-solid fa-copy"></i> Copy
</button>
<button className="button" onClick={refreshEmail}>
<i class="fa-solid fa-arrows-rotate"></i> Refresh
</button>
<button className="button" onClick={changeEmail}>
<i class="fa-solid fa-pen"></i> Change
</button>
<button className="button" onClick={deleteEmail}>
<i class="fa-solid fa-circle-xmark"></i> Delete
</button>
        </div>
      </div>

      <div className="inbox-section">
      <div className="inbox-header">
      <h2>
        <i className="fa-solid fa-inbox" style={{ marginRight: '10px' }}></i>
        Inbox
      </h2>
    </div>
    <div className="inbox-header1">
      <span>
        <i className="fa-solid fa-user"></i> Sender
      </span>
      <span>
        <i className="fa-solid fa-file-alt"></i> Subject
      </span>
      <span>
        <i className="fa-solid fa-eye"></i> View
      </span>
    </div>
        <div className="inbox-content">
        {inbox.length === 0 ? (
          <div className="empty-inbox-container">
          <img src={gifEmptyInbox} alt="No inbox" className="empty-inbox-gif" />
          <p className="empty-inbox">Your Inbox is Empty.</p>
          <p className="empty-inbox2">Waiting for Incoming Emails!</p>
        </div>
        ) : (
          inbox.map((mail) => (
            <div className="inbox-item" key={mail.id}>
              <span>{mail.sender}</span>
              <span>{mail.subject}</span>
              <button className="view-button">View</button>
            </div>
          ))
        )}
        </div>
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

export default Home;
