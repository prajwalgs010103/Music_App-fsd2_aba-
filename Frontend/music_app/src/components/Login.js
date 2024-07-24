import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // State variables for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Hook for navigation
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Example of form validation
    if (!email || !password) {
      setMessage("Both email and password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Login failed. Please check your credentials and try again."
        );
      }

      // Save the token to localStorage
      localStorage.setItem("token", data.token);

      // Reset form fields
      setEmail("");
      setPassword("");
      setMessage("Login successful!");

      // Navigate to tracks page
      navigate("/inserttrack"); // Adjust the path based on your app's routes
    } catch (error) {
      console.error(error);
      setMessage("Login failed. Please sign in again.");

      // Wait for 2 seconds to show the error message
      setTimeout(() => {
        // Navigate to signup page
        navigate("/signup");
      }, 2000); // 2000 milliseconds = 2 seconds
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="text-center">Login Page</h4>
            </div>
            <div className="card-body">
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Click to Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
