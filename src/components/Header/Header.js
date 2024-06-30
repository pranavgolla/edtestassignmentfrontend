import React, { useEffect } from "react";
import { useNavigate as useHistory, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./Header.css";

const Header = () => {
  const history = useHistory();

  useEffect(() => {
    const token = Cookies.get("swpjwt");
    if (!token) {
      history("/signin");
    }
  }, [history]);

  const handleLogout = () => {
    Cookies.remove("swpjwt");
    Cookies.remove("user");
    history("/signin");
  };

  return (
    <>
    <div className="header1">
      <div className="header ab">
        <h1 className="a1">Though</h1>
        <p className="b1">Framework</p>
      </div>

      <div className="header">
        <Link to="/">Home</Link>
        <Link to="/aboutus">About Us</Link>
        <div className="dropdown">
          <button className="dropbtn">Services</button>
          <div className="dropdown-content">
            <Link to="/services/servicea">Servicea</Link>
            <Link to="/services/serviceb">Serviceb</Link>
          </div>
        </div>
        <Link to="/insights">Insights</Link>
        <Link to="/contactus">Contact Us</Link>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      </div>
    </>
  );
};

export default Header;
