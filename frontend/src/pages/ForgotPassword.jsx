import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/style/Auth.css"; 

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setMessage(`✅ ${data.msg || "Password reset link sent to your email."}`); // <-- FIXED
        setEmail("");
      } else {
        setError(data.msg || "Something went wrong. Please try again."); // <-- FIXED
      }
    } catch (err) {
      setLoading(false);
      setError("Server error: " + err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Forgot Password</h2>
        <p className="text-muted">
          Enter your registered email address and we’ll send you a link to reset your password.
        </p>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage(""); // Clear previous messages on change
                setError("");
              }}
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-3 text-center">
          <button
            className="btn btn-link"
            onClick={() => navigate("/login")}
            disabled={loading}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
