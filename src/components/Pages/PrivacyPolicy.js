import React from 'react';
import './PagesCss/LegalInformation.css'

const PrivacyPolicy = () => {
  return (
    <div className="policy">
      <h2>Privacy Policy</h2>
      <p>Effective Date: 04/1/2025</p>
      <hr></hr>
      <p>Welcome to Temp-MailHub, a platform by D-Tech Studios. Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and share information about you when you use our app or website.</p>

      <h3>Information We Collect</h3>
      <p>We may collect the following types of personal information:</p>
      <ul>
        <li><b>a. Personal Information:</b> Information you provide during account creation, such as your name, email address, and login credentials (via Facebook, Google, or Apple).</li>
        <li><b>b. Temporary Email Data:</b> We generate temporary email addresses for your use. Messages received are stored temporarily and deleted after a set duration.</li>
        <li><b>c. Device Information:</b> We may collect device-related data such as operating system, browser type, and IP address.</li>
        <li><b>d. Usage Data:</b> Information regarding how you interact with Temp-MailHub, including features used and time spent on the platform.</li>
      </ul>

      <h3>How We Use Your Information</h3>
      <p>We use your information to:</p>
      <ul>
        <li>- Provide and improve Temp-MailHub’s services.</li>
        <li>- Authenticate your login using Facebook, Google, or Apple.</li>
        <li>- Ensure a smooth user experience.</li>
        <li>- Maintain platform security and prevent abuse.</li>
        <li>- Display relevant ads and analytics insights.</li>
      </ul>

      <h3>Sharing Your Information</h3>
      <p>We do not sell your personal data. However, we may share information with:</p>
      <ul>
        <li><b>a. Service Providers:</b> To facilitate platform operations.</li>
        <li><b>b. Legal Authorities:</b> When required by law or to enforce platform policies.</li>
        <li><b>c. Advertising Networks:</b> For displaying relevant ads via third-party providers.</li>
      </ul>

      <h3>Data Retention</h3>
      <p>- <b>Temporary emails:</b> Deleted automatically after a short duration.</p>
      <p>- <b>Device and usage data:</b> Retained for analytics and security purposes.</p>

      <h3>Security</h3>
      <p>We implement security measures to safeguard data; however, no system is completely secure.</p>

      <h3>Your Choices</h3>
      <p>- <b>Data Access:</b> You can review your usage within the app.</p>
      <p>- <b>Delete Account:</b> You can delete your account at any time.</p>
      <p>- <b>Opt-Out:</b> You may opt out of ad tracking through your device settings.</p>

      <h3>Children’s Privacy</h3>
      <p>Temp-MailHub is not intended for children under 13, and we do not knowingly collect their information.</p>

      <h3>Changes to This Policy</h3>
      <p>We may update this policy periodically. Continued use after changes means acceptance of the revised policy.</p>

      <h3>Contact Us</h3>
      <p>If you have any questions, contact us at:</p>
      <p><b>Email:</b> support@temp-mailhub.com</p>
      <p>D-Tech Studios © 2025</p>
    </div>
  );
};

export default PrivacyPolicy;