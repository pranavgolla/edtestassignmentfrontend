import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate directly
import Cookies from "js-cookie";
import "./Signin.css";
// import LoginPageb from '../../componentsb/Loginb';

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const history = useNavigate(); // Use useNavigate directly

  useEffect(() => {
    // Check if user is already logged in
    const jwtToken = Cookies.get("swpjwt");
    if (jwtToken) {
      history("/"); // Redirect to home page if logged in
    }
  }, [history]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulating authentication with a fake API call
    try {
      const response = await fetch("https://edtestzassignmentmongodb1.onrender.com/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Redirect to home page upon successful login
        // Extract JWT from response
        const jwt = data.token; // Assuming the JWT is stored in a property called 'token'
        // Store JWT in a cookie
        Cookies.set("swpjwt", jwt); // Set a cookie named 'jwt' with the JWT value
        Cookies.set("user", email);
        // Redirect to home page
        history("/"); // Use history function directly
      } else {
        // Handle authentication failure
        setError("Invalid email or password");

        console.error("Authentication failed");
      }
    } catch (error) {
      setError("Error during authentication");
      console.error("Error during authentication:", error);
    }
  };

  const onClickRegisterForm = () => {
    history("/signup");
  };

  return (
    <div className="d1">
      <div className="d2">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label className="email">
            Email:
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="Email"
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder="Password"
            />
          </label>
          {error && <div style={{ color: "red" }}>{error}</div>}{" "}
          <p>
            <span>Forgot password</span>
          </p>
          {/* Display error message if present */}
          <div className="b1">
            <button type="submit">Login</button>

            <p>
              Don't have an account?{" "}
              <span onClick={onClickRegisterForm}>Signup</span>
            </p>
          </div>
        </form>
        <button className="facebook">
          <a href="https://www.facebook.com/">Login with facebook </a>
        </button>
        <button className="google">
          <a href="https://www.google.co.in/" className="google">
            Login with Google
          </a>
        </button>
      </div>
    </div>
  );
}

export default Signin;
