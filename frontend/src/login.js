
import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Load saved email from localStorage (if available)
        const savedEmail = localStorage.getItem("userEmail");
        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/login", { email });
            if (res.data.success) {
                // Save user details locally
                localStorage.setItem("userEmail", email);
                localStorage.setItem("userData", JSON.stringify(res.data.user)); // Save entire user object
                
                onLogin(res.data.user); // Pass user data to parent component
            } else {
                setError("Invalid email");
            }
        } catch (err) {
            setError("Email not registered");
        }
    };

    return (
        <div className="container mt-5" style={{ width: "50%" }}>
            <h2 className="text-center">Login</h2>
            <div className="mb-3">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="text-center">
                <button className="btn btn-primary" style={{ width: "80%" }} onClick={handleLogin}>
                    Login
                </button>
                {error && <p className="text-danger mt-2">{error}</p>}
            </div>
        </div>
    );
};

export default Login;
