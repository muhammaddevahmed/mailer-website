import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PagesCss/SignUp.css";

const SignUp = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Toggle between login and signup
  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Reset form when toggling
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      termsAccepted: false,
    });
    setErrors({});
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Calculate password strength
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  // Calculate password strength
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!isLogin) {
      if (!formData.username) {
        newErrors.username = "Username is required";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = "You must accept the terms and conditions";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin && formData.email === 'admin@demo.com' && formData.password === 'admin123') {
      if(onLogin) onLogin();
      navigate('/admin/dashboard');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (isLogin) {
        console.log("Login data:", {
          email: formData.email,
          password: formData.password,
        });
        // Show success message
        showToast("Login successful! Redirecting...");
      } else {
        console.log("Signup data:", formData);
        // Show success message
        showToast("Account created successfully! Welcome aboard!");
      }

      // Reset form after successful submission
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
        termsAccepted: false,
      });
      setPasswordStrength(0);
    } catch (error) {
      console.error("Submission error:", error);
      showToast("An error occurred. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show toast notification
  const showToast = (message, type = "success") => {
    const toast = document.createElement("div");
    toast.className = `form-toast ${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${
        type === "success" ? "fa-circle-check" : "fa-circle-exclamation"
      }"></i>
      <span>${message}</span>
    `;
    document.querySelector(".auth-container").appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // Handle social login
  const handleSocialLogin = (provider) => {
    showToast(`Connecting with ${provider}...`, "info");
    // Implement social login logic here
  };

  // Get password strength text
  const getPasswordStrengthText = () => {
    if (formData.password.length === 0) return "";
    const texts = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
    return texts[passwordStrength] || "";
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {/* Hero Section */}
          <div className="auth-hero">
            <div className="hero-content">
              <h1 className="hero-title">Welcome Back</h1>
              <p className="hero-subtitle">
                <i className="fa-solid fa-shield-alt hero-icon"></i>
                {isLogin
                  ? "Sign in to access your account and manage your temporary emails"
                  : "Join us today and experience secure, disposable email service"}
              </p>
              <div className="hero-features">
                <div className="feature">
                  <i className="fa-solid fa-lock"></i>
                  <span>Secure & Private</span>
                </div>
                <div className="feature">
                  <i className="fa-solid fa-bolt"></i>
                  <span>Instant Setup</span>
                </div>
                <div className="feature">
                  <i className="fa-solid fa-infinity"></i>
                  <span>Unlimited Accounts</span>
                </div>
              </div>
            </div>
            <div className="hero-graphic">
              <div className="graphic-circle"></div>
              <i className="fa-solid fa-envelope-open-text"></i>
            </div>
          </div>

          {/* Form Section */}
          <div className="auth-form-section">
            {/* Form Header */}
            <div className="form-header">
              <div className="tab-switch">
                <button
                  className={`tab-btn ${isLogin ? "active" : ""}`}
                  onClick={() => setIsLogin(true)}
                >
                  <i className="fa-solid fa-right-to-bracket"></i>
                  <span>Login</span>
                </button>
                <button
                  className={`tab-btn ${!isLogin ? "active" : ""}`}
                  onClick={() => setIsLogin(false)}
                >
                  <i className="fa-solid fa-user-plus"></i>
                  <span>Sign Up</span>
                </button>
                <div
                  className={`active-slider ${isLogin ? "login" : "signup"}`}
                ></div>
              </div>

              {/* Social Login */}
              <div className="social-auth">
                <p className="social-title">Continue with</p>
                <div className="social-buttons">
                  <button
                    className="social-btn google"
                    onClick={() => handleSocialLogin("Google")}
                  >
                    <i className="fab fa-google"></i>
                    <span>Google</span>
                  </button>
                  <button
                    className="social-btn facebook"
                    onClick={() => handleSocialLogin("Facebook")}
                  >
                    <i className="fab fa-facebook"></i>
                    <span>Facebook</span>
                  </button>
                  <button
                    className="social-btn apple"
                    onClick={() => handleSocialLogin("Apple")}
                  >
                    <i className="fab fa-apple"></i>
                    <span>Apple</span>
                  </button>
                </div>
              </div>

              <div className="divider">
                <span>or use email</span>
              </div>
            </div>

            {isLogin && (
              <div className="demo-credentials">
                <h4>Demo Admin Credentials</h4>
                <p><strong>Email:</strong> admin@demo.com</p>
                <p><strong>Password:</strong> admin123</p>
              </div>
            )}

            {/* Form Content */}
            <form className="auth-form" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="username" style={{ color: "black" }}>
                    <i className="fa-solid fa-user"></i>
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Choose a username"
                    className={errors.username ? "error" : ""}
                  />
                  {errors.username && (
                    <span className="error-message">
                      <i className="fa-solid fa-circle-exclamation"></i>
                      {errors.username}
                    </span>
                  )}
                </div>
              )}

              <div className="form-group">
                <label
                  htmlFor="email"
                  className="label-email"
                  style={{ color: "black" }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={errors.email ? "error" : ""}
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="error-message">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" style={{ color: "black" }}>
                  <i className="fa-solid fa-key"></i>
                  Password
                </label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className={errors.password ? "error" : ""}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`fa-solid ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
                {errors.password && (
                  <span className="error-message">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {errors.password}
                  </span>
                )}
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div
                        className={`strength-fill strength-${passwordStrength}`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      ></div>
                    </div>
                    <span className="strength-text">
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                )}
              </div>

              {!isLogin && (
                <>
                  <div className="form-group">
                    <label htmlFor="confirmPassword" style={{ color: "black" }}>
                      <i className="fa-solid fa-key"></i>
                      Confirm Password
                    </label>
                    <div className="password-input">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        className={errors.confirmPassword ? "error" : ""}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <i
                          className={`fa-solid ${
                            showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <span className="error-message">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>

                  <div className="form-group terms-group">
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        id="terms"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleInputChange}
                        className={errors.termsAccepted ? "error" : ""}
                      />
                      <label htmlFor="terms" className="terms-label" style={{ color:"black" }}>
                        I agree to the
                        <Link
                          to="/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {" "}
                          Terms of Service
                        </Link>{" "}
                        and
                        <Link
                          to="/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {" "}
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    {errors.termsAccepted && (
                      <span className="error-message">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        {errors.termsAccepted}
                      </span>
                    )}
                  </div>
                </>
              )}

              {isLogin && (
                <div className="form-options">
                  <label className="remember-me">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="forgot-password">
                    <i className="fa-solid fa-question-circle"></i>
                    Forgot Password?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                <div className="btn-content">
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <i
                        className={`fa-solid ${
                          isLogin ? "fa-right-to-bracket" : "fa-user-plus"
                        }`}
                      ></i>
                      <span>{isLogin ? "Sign In" : "Create Account"}</span>
                    </>
                  )}
                </div>
                <div className="btn-gradient"></div>
              </button>

              {isLogin && (
                <div className="form-footer">
                  <span>Don't have an account? </span>
                  <button
                    type="button"
                    className="switch-form"
                    onClick={toggleForm}
                  >
                    Sign up now
                  </button>
                </div>
              )}
            </form>

            {/* Security Note */}
            <div className="security-note">
              <i className="fa-solid fa-shield-halved"></i>
              <p>Your data is protected with 256-bit SSL encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

