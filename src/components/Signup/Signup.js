import React, { useState, useEffect } from "react";
import { useNavigate as useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const history = useHistory();

  useEffect(() => {
    // Check if user is already logged in
    const jwtToken = Cookies.get("swpjwt");
    if (jwtToken) {
      history("/"); // Redirect to home page if logged in
    }
  }, [history]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      try {
        const response = await fetch("https://edtestzassignmentmongodb1.onrender.com/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Form data submitted successfully");
          // Reset form fields after successful submission if needed
          setFormData({
            email: "",
            password: "",
            confirmPassword: "",
          });
          // Redirect to login page after successful submission
          history("/signin");
        } else {
          console.error("Form submission failed");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      setError("Password and confirm password do not match");
    }
  };

  const onClickLogin = () => {
    history("/signin");
  };

  return (
    <div className="d1">
      <div className="d2">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
            />
          </label>
          <br />
          <label>
            Create password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create password"
            />
          </label>
          <br />
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm password"
            />
          </label>
          <br />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="b1">
            <button type="submit">Signup</button>
            <p>
              Already have an account? <span onClick={onClickLogin}>Login</span>
            </p>
            {/* <button type="button" onClick={onClickLogin}>
            Login Form
          </button> */}
          </div>
        </form>
        <button className="facebook" >
          <a href="https://www.facebook.com/">
            Login with facebook{" "}
          </a>
        </button>
        <button className="google" >
        <a href="https://www.google.co.in/" className="google">
        Login with Google

        </a>
        </button>
      </div>
    </div>
  );
};

export default Signup;
