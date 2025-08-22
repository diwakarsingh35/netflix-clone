import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div
      className="bg-dark text-white p-3 d-flex flex-column"
      style={{ width: "250px", minHeight: "100vh", justifyContent: "space-between" }}
    >
      {/* Sidebar Top */}
      <div>
          <Link to="/" className="nav-link text-white">
              <h4>Admin Dashboard</h4>
          </Link>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/admin" className="nav-link text-white">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/users" className="nav-link text-white">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/settings" className="nav-link text-white">
              Settings
            </Link>
          </li>
        </ul>
      </div>

      {/* Sidebar Bottom - Logout */}
      <div>
        <button
          onClick={handleLogout}
          style={{
            background: "red",
            color: "white",
            padding: "6px 12px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
