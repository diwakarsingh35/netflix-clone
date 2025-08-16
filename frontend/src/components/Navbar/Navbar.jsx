import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../components/Navbar/Navbar.css';
import logo from "../../assets/logo.svg";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleSignIn = () => {
    navigate("/login"); // your login route
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/"); // redirect to home after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-4 navbar-transparent">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          <img src={logo} alt="Netflix Logo" style={{ height: '40px' }} />
        </a>
        <div className="ms-auto d-flex align-items-center gap-3">
          <select
            onChange={handleChange}
            className="form-select border-secondary"
            style={{ width: "120px" }}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>

          {isLoggedIn ? (
            <button className="btn btn-outline-light" onClick={handleSignOut}>
              {t("navbar.signOut")}
            </button>
          ) : (
            <button className="btn btn-danger" onClick={handleSignIn}>
              {t("navbar.signIn")}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
