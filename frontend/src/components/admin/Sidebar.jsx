import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-dark text-white p-3" style={{ width: "250px", minHeight: "100vh" }}>
      <h4>Admin Dashboard</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin" className="nav-link text-white">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/users" className="nav-link text-white">Users</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/settings" className="nav-link text-white">Settings</Link>
        </li>
      </ul>
    </div>
  );
}

