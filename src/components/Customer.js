import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Customer() {
  const location = useLocation();
  const { id } = location.state || {}; // Access the user email passed during login
  const [user, setUser] = useState({});
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const history = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch user details from the backend
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/user/${id}`);
          setUser(response.data);
          setNewName(response.data.name);
          setNewEmail(response.data.email);
        } catch (error) {
          console.error("Error fetching user details", error);
        }
      };
      fetchUserDetails();
    }
  }, [id]);

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put("http://localhost:3000/update-profile", {
        email: newEmail,
        name: newName,
      });
      alert(response.data.message || "Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const handleChangePassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/update-password",
        {
          userId: user._id,
          newPassword: newPassword,
        }
      );
      alert(response.data || "Password updated successfully");
    } catch (error) {
      console.error("Error updating password", error);
    }
  };

  const handleLogout = () => {
    history("/feedback"); // Redirect to feedback page on logout
  };

  return (
    <div className="container mt-5">
      <h2 className="text-white">Welcome to the Customer Dashboard</h2>
      <h4 className="text-white">Name: {user.name}</h4>
      <h5 className="text-white">Email: {user.email}</h5>

      <hr />

      <h5 className="text-white">Update Profile</h5>
      <input
        type="text"
        className="form-control"
        placeholder="New Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="email"
        className="form-control mt-2"
        placeholder="New Email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <button onClick={handleUpdateProfile} className="btn btn-primary mt-3">
        Update Profile
      </button>

      <hr />

      <h5 className="text-white">Change Password</h5>
      <input
        type="password"
        className="form-control"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleChangePassword} className="btn btn-warning mt-3">
        Change Password
      </button>

      <hr />

      <button onClick={handleLogout} className="btn btn-danger mt-3">
        Logout
      </button>
    </div>
  );
}

export default Customer;
