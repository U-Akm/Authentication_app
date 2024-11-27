import React, { useState, useEffect } from "react";
import axios from "axios";

const Feedback = () => {
  const [formData, setFormData] = useState({ name: "", email: "", description: "" });
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
  const [error, setError] = useState(""); // Error message state

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Fetch feedbacks from API
  const fetchFeedbacks = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.get("http://localhost:3000/api/feedback/get-feedback"); // Full API URL
      if (response.data.success) {
        setFeedbacks(response.data.feedbacks);
      } else {
        setError("Failed to fetch feedbacks.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching feedbacks.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading for form submission
    setError(""); // Clear previous errors
    try {
      const response = await axios.post("http://localhost:3000/api/feedback/submit-feedback", formData);
      if (response.data.success) {
        fetchFeedbacks(); // Refresh feedback list
        setFormData({ name: "", email: "", description: "" }); // Reset form
      } else {
        setError("Failed to submit feedback. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Error submitting feedback.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="container mt-5">
      {/* Feedback Form */}
      <div className="feedback-card p-4 shadow-lg">
        <h2 className="text-center mb-4" style={{ color: "White" }}>Feedback</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>} {/* Error Message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Enter your feedback"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn w-100"
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? "#999" : "#001f3f", // Grey out button during loading
              color: "white",
              borderColor: "#001f3f",
            }}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

{/* Feedback List */}
<div className="mt-5">
  <h3 className="text-center" style={{ color: "White" }}>All Feedback</h3>
  {isLoading && !feedbacks.length ? ( // Show loader only when loading initial data
    <div className="text-center mt-4">
      <div className="spinner-border text-primary" role="status"></div>
      <p>Loading feedback...</p>
    </div>
  ) : (
    <ul className="list-group mt-3">
      {feedbacks.map((feedback) => (
        <li
          key={feedback._id}
          className="list-group-item"
          style={{
            backgroundColor: "black", // Feedback item background
            color: "white", // Feedback text color
          }}
        >
          <strong>{feedback.name}</strong>
          <span style={{ color: "yellow" }}> ({feedback.email})</span>
          <p>{feedback.description}</p>
        </li>
      ))}
    </ul>
  )}
</div>
    </div>
  );
};

export default Feedback;
