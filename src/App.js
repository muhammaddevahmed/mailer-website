import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Pages/Home';
import TempAccount from './components/Pages/TempAccount';
import Pricing from './components/Pages/Pricing';
import Footer from './components/Footer';
import SignUp from './components/Pages/SignUp';
import Profile from './components/Pages/Profile';
import PrivateDomains from './components/Pages/PrivateDomains';
import AboutUs from './components/Pages/AboutUs';
import ContentPolicy from './components/Pages/ContentPolicy';
import PrivacyPolicy from './components/Pages/PrivacyPolicy';
import TermsOfService from './components/Pages/TermsOfService';
import Disclaimer from './components/Pages/Disclaimer';
import Contact from './components/Pages/Contact';
import AdminRouter from './admin/AdminRouter';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAdminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAdminAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAdminAuthenticated');
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminRouter isAuthenticated={isAuthenticated} onLogin={handleLogin} onLogout={handleLogout} />} />
          <Route path="/*" element={
            <>
              <NavBar />
              <div className="pages">
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="TempAccount" element={<TempAccount />} />
                  <Route path="/pricing" element={<Pricing/>} />
                  <Route path="/profile" element={<Profile/>} />
                  <Route path="/sign" element={<SignUp onLogin={handleLogin} />} />
                  <Route path="/privateDomains" element={<PrivateDomains/>} />
                  <Route path="/about" element={<AboutUs/>} />
                  <Route path="/content" element={<ContentPolicy/>} />
                  <Route path="/privacy" element={<PrivacyPolicy/>} />
                  <Route path="/terms" element={<TermsOfService/>} />
                  <Route path="/disclaimer" element={<Disclaimer/>} />
                  <Route path="/contact" element={<Contact/>} />
                </Routes>
              </div>
              <Footer />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

