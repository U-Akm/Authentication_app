import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./Auth.css"; // Shared CSS for Login & Signup

function Signup() {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Both fields are required");
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/signup", { email, password });
            if (response.data === "exist") {
                setError("User already exists");
            } else if (response.data === "notexist") {
                history("/home", { state: { id: email } });
            }
        } catch (err) {
            setError("Error during signup");
            console.error(err);
        }
    };

    return (
        <div className="auth-container d-flex justify-content-center align-items-center vh-100">
            <div className="auth-card text-center p-4 shadow-lg">
                <h2 className="text-success mb-4">Signup</h2>
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
                    {error && <div className="text-danger mb-3">{error}</div>}
                    <button type="submit" className="btn btn-success w-100">Sign Up</button>
                </form>
                <div className="text-center mt-3">
                    <p className="small">Already have an account? <Link to="/" className="text-success">Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
