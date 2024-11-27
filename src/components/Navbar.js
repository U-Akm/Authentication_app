import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container-fluid">
        {/* Left side: MyApp, Home, and Customer */}
        <Link className="navbar-brand" to="/">MyApp</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customer">Customer</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/feedback">Feedback</Link>
            </li>
          </ul>
        </div>

        {/* Right side: Login and Signup as buttons */}
        <div className="d-flex">
          <Link to="/" className="btn btn-light me-2">Login</Link>
          <Link to="/signup" className="btn btn-light">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
