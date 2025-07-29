import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import "./Login.css";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUsername: setUserContext } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setUserContext(username);
      setIsLoading(false);
      navigate("/home");
    }, 1500);
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className="login-wrapper">
        <div className="login-card">
          <div className="card-header">
            <div className="brand">
              <div className="brand-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </div>
              <div className="brand-text">
                <h1>TextRact</h1>
                <p>Smart Text Extraction</p>
              </div>
            </div>
            
            <div className="mode-selector">
              <div className="selector-track">
                <div className={`selector-thumb ${isSignUp ? 'signup' : 'login'}`}></div>
                <button 
                  type="button"
                  className={`mode-btn ${!isSignUp ? 'active' : ''}`}
                  onClick={() => setIsSignUp(false)}
                  disabled={isLoading}
                >
                  Login
                </button>
                <button 
                  type="button"
                  className={`mode-btn ${isSignUp ? 'active' : ''}`}
                  onClick={() => setIsSignUp(true)}
                  disabled={isLoading}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="welcome-text">
              <h2>{isSignUp ? "Create Your Account" : "Welcome Back"}</h2>
              <p>{isSignUp ? "Join us to start extracting text from your documents" : "Sign in to continue to your dashboard"}</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <div className="input-container">
                  <div className="input-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isLoading}
                    className="auth-input"
                  />
                  <div className="input-border"></div>
                </div>
              </div>

              <div className="input-group">
                <div className="input-container">
                  <div className="input-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <circle cx="12" cy="16" r="1"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="auth-input"
                  />
                  <div className="input-border"></div>
                </div>
              </div>

              <button type="submit" className="auth-submit" disabled={isLoading}>
                <div className="submit-content">
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12,5 19,12 12,19"/>
                      </svg>
                    </>
                  )}
                </div>
              </button>
            </form>
          </div>

          <div className="card-footer">
            <div className="features-preview">
              <div className="feature">
                <div className="feature-icon">🚀</div>
                <span>Fast Processing</span>
              </div>
              <div className="feature">
                <div className="feature-icon">🔒</div>
                <span>Secure & Private</span>
              </div>
              <div className="feature">
                <div className="feature-icon">📱</div>
                <span>Multi-Format</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;