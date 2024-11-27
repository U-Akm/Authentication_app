import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/", {
        email,
        password,
      });
      
      if (response.data === "exist") {
        // Redirect to customer page after successful login
        history("/customer", { state: { id: email } });
      } else if (response.data === "notexist") {
        alert("User has not signed up. Please sign up first.");
      } else if (response.data === "incorrect") {
        alert("Incorrect password. Please try again.");
      }
    } catch (err) {
      alert("Error during login. Please try again later.");
      console.error(err);
    }
  }

  return (
    <div className="auth-container d-flex justify-content-center align-items-center vh-100">
      <div className="auth-card text-center p-4 shadow-lg">
        <h2 className="mb-4" style={{ color: "#001f3f" }}>Login</h2>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#001f3f",
              color: "white",
              borderColor: "#001f3f",
            }}
          >
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="small">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
