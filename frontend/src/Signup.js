import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [educationLevel, setEducationLevel] = useState("Undergraduate");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        // Load saved email from localStorage (if available)
        const savedEmail = localStorage.getItem("userEmail");
        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);

    const handleSubmit =async (e) =>  {
        e.preventDefault();

        // Simulating user object for local storage
        const userData = {
            _id: "12345", // Simulated user ID (Replace with actual ID from backend if needed)
            name,
            email,
            educationLevel,
        };

        // Save user data locally
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userData", JSON.stringify(userData)); // Save entire user object

        navigate(`/skills/${userData._id}`); // Redirect after account creation

        // Uncomment this part to enable backend API call
        
        try {
            const response = await fetch("http://localhost:2000/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, educationLevel }),
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("userEmail", email);
                localStorage.setItem("userData", JSON.stringify(data.user));
                navigate(`/skills/${data.user._id}`);
            } else {
                setError(data.message || "Signup failed");
            }
        } catch (err) {
            setError("Server error. Please try again.");
        }
        
    };

    return (
        <div className="container mt-5" style={{ width: "50%" }}>
            <div className="card shadow p-4">
                <h2 className="text-center">Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Education Level</label>
                        <select
                            className="form-select"
                            value={educationLevel}
                            onChange={(e) => setEducationLevel(e.target.value)}
                        >
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Graduate">Graduate</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Create Account
                    </button>
                    {error && <p className="text-danger mt-2 text-center">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Signup;
