import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

function Home() {
  return (
    <div className="home-container d-flex align-items-center justify-content-center vh-100">
      <div className="home-card text-center p-5 shadow-lg rounded-4 bg-dark text-white">
        {/* Hero Section */}
        <h1 className="display-4 fw-bold mb-4">Welcome to Our Platform!</h1>
        <p className="fs-5 mb-4">
          Discover features, connect, and grow with us.
        </p>

        {/* Call to Actions */}
        <div className="d-flex justify-content-center gap-3 mb-4">
          <button className="btn btn-primary btn-lg">Get Started</button>
          <button className="btn btn-outline-light btn-lg">Learn More</button>
        </div>

        {/* Features */}
        <div className="features mt-5">
          <h3>Our Features</h3>
          <ul
            className="list-unstyled text-start mx-auto mt-3"
            style={{ maxWidth: "500px" }}
          >
            <li>🚀 Fast and Reliable</li>
            <li>🔒 Secure Platform</li>
            <li>🌟 Excellent Support</li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="social-icons mt-5">
          <h5>Follow Us</h5>
          <div className="d-flex justify-content-center gap-3">
            <a
              href="https://www.facebook.com/ubaid.aziz.779"
              className="text-white fs-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.linkedin.com/in/ubaid-ahmed-146338311/"
              className="text-white fs-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/ubaid_aziz207/"
              className="text-white fs-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
