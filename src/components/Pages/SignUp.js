import React, { useState } from "react";
import "./PagesCss/SignUp.css"

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(true); // State to track if it's login or signup

  // Toggle between login and signup
  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between login and signup
  };

  return (
    <div className="container">
    <div className="wrapper">
    <div className="title-text">
          {/* Conditionally render the titles based on isLogin state */}
          {isLogin ? (
            <div className="title login">Login Form</div>
          ) : (
            <div className="title signup">Signup Form</div>
          )}
        </div>
      {/* Social Media Login Row */}
  <div className="social-login">
    <button className="social-btn google">
      <i className="fab fa-google"></i>
    </button>
    <button className="social-btn facebook">
      <i className="fab fa-facebook-f"></i>
    </button>
    <button className="social-btn apple">
      <i className="fab fa-apple"></i>
    </button>
  </div>
  {/* Divider with "or" */}
<div className="divider">
  <span>or</span>
</div>

      <div className="form-container">
        <div className="slide-controls">
          <input
            type="radio"
            name="slide"
            id="login"
            checked={isLogin}
            onChange={toggleForm}
          />
          <input
            type="radio"
            name="slide"
            id="signup"
            checked={!isLogin}
            onChange={toggleForm}
          />
          <label htmlFor="login" className="slide login">
            Login
          </label>
          <label htmlFor="signup" className="slide signup">
            Signup
          </label>
          <div className="slider-tab" style={{ left: isLogin ? "0%" : "50%" }}></div>
        </div>

        <div className="form-inner">
          {/* Login Form */}
          {isLogin && (
            <form action="#" className="login">
              <div className="field">
                <input type="text" placeholder="Email Address" required />
              </div>
              <div className="field">
                <input type="password" placeholder="Password" required />
              </div>
              <div className="pass-link">
                <a href="#">Forgot password?</a>
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Login" />
              </div>
              <div className="signup-link">
                Not a member? <a href="#" onClick={toggleForm}>Signup now</a>
              </div>
            </form>
          )}

          {/* Signup Form */}
          {!isLogin && (
            <form action="#" className="signup">
              <div className="field">
                <input type="text" placeholder="Email Address" required />
              </div>
              <div className="field">
                <input type="password" placeholder="Password" required />
              </div>
              <div className="field">
                <input type="password" placeholder="Confirm password" required />
              </div>
              {/* Terms and Conditions Checkbox */}
<div className="terms-container">
  <input type="checkbox" id="terms" defaultChecked />
  <label htmlFor="terms">You accept terms and conditions</label>
</div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Signup" />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
