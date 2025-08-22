import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // if your API needs auth
        const res = await fetch("https://netflix-clone-backend-topaz.vercel.appapi/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Compute stats
  const totalUsers = users.length;
  const blockedUsers = users.filter((u) => u.blocked).length;
  const adminCount = users.filter((u) => u.role === "admin").length;

  return (
    <div className="container py-4" style={{ color: "white" }}>
      <h2 className="mb-4">Welcome to Admin Dashboard</h2>
      <p className="mb-4">Here you can manage everything efficiently.</p>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text fs-3">{totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-dark bg-warning mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Blocked Users</h5>
              <p className="card-text fs-3">{blockedUsers}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Admins</h5>
              <p className="card-text fs-3">{adminCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card shadow-sm text-dark">
        <div className="card-body">
          <h5 className="card-title">Quick Actions</h5>
          <p className="card-text">
            You can manage users, check reports, and configure settings from
            here.
          </p>
          <div className="d-flex gap-2">
            {/* The links are added here */}
            <Link to="/admin/users" className="btn btn-primary">
              Manage Users
            </Link>
            <Link to="/reports" className="btn btn-success">
              View Reports
            </Link>
            <Link to="/admin/settings " className="btn btn-secondary">
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}