import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [educationLevel, setEducationLevel] = useState("Undergraduate");

  const navigate = useNavigate(); // ✅ useNavigate is now inside <Router>

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:2000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, educationLevel }),
    });
    const data = await response.json();
    if (response.ok) {
      navigate(`/skills/${data.user._id}`); // ✅ Redirect after account creation
    }
  };

  return (
    <div className="container mt-5">
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
        </form>
      </div>
    </div>
  );
};

export default Signup;
