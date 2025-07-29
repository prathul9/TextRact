import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import UserContext from "./UserContext";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername: setUserContext } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserContext(username);
    alert(`${isSignUp ? "Signed up" : "Logged in"} as ${username}`);
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isSignUp ? "Create an Account" : "TextRact"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
        </form>
        <p>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
