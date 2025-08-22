import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState({ _id: "", name: "", email: "", role: "" });

  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login first.");
        setLoading(false);
        return;
      }

      const res = await fetch("https://netflix-clone-backend-topaz.vercel.app/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch users");

      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`https://netflix-clone-backend-topaz.vercel.app/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete user");

      setSuccess(data.message);
      setTimeout(() => setSuccess(""), 3000);

      fetchUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  // Block / Unblock user
  const toggleBlockUser = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`https://netflix-clone-backend-topaz.vercel.app/api/users/block/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
   

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to block/unblock user");

      setSuccess(data.message);
      setTimeout(() => setSuccess(""), 3000);

      fetchUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  const openUpdateModal = (user) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`https://netflix-clone-backend-topaz.vercel.app/api/users/${editUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editUser.name,
          email: editUser.email,
          role: editUser.role,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update user");

      setSuccess("User updated successfully");
      setTimeout(() => setSuccess(""), 3000);

      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4">All Users</h2>

      {loading && <div className="text-primary">Loading users...</div>}
      {error && <div className="text-danger">{error}</div>}
      {success && <div className="text-success">{success}</div>}

      {!loading && !error && users.length > 0 && (
        <input
          type="text"
          placeholder="Search by name, email, or role"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control mb-3"
        />
      )}

      {!loading && !error && filteredUsers.length === 0 && (
        <div className="text-muted">No users found.</div>
      )}

      {!loading && !error && filteredUsers.length > 0 && (
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="text-capitalize">{user.role}</td>
                <td className="text-center">
                  <div className="btn-group" role="group">
                <div className="d-flex gap-2">
                <button
                  onClick={() => openUpdateModal(user)}
                  className="btn btn-primary rounded-pill shadow-sm px-4 py-2"
                  style={{ transition: "all 0.2s ease-in-out" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  Update
                </button>

                <button
                  onClick={() => deleteUser(user._id)}
                  className="btn btn-danger rounded-pill shadow-sm px-4 py-2"
                  style={{ transition: "all 0.2s ease-in-out" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  Delete
                </button>

                <button
                  onClick={() => toggleBlockUser(user._id)}
                  className={`btn rounded-pill shadow-sm px-4 py-2 ${user.blocked ? "btn-warning text-dark" : "btn-secondary text-white"}`}
                  style={{ transition: "all 0.2s ease-in-out" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  {user.blocked ? "Unblock" : "Block"}
                </button>
              </div>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Update Modal */}
      {isModalOpen && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <form onSubmit={updateUser}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editUser.name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editUser.email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      name="role"
                      value={editUser.role}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
