import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">MyApp</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <button className="btn btn-outline-light me-2" onClick={() => navigate("/job-selection")}>
                                    Job Selection
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-outline-light me-2" onClick={() => navigate("/resume-builder")}>
                                    Resume Builder
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-outline-light" onClick={() => navigate("/profile")}>
                                    Profile
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <div className="container mt-5 text-center">
                <h1>Welcome to the Home Page</h1>
                <p>Select an option from the navigation bar to continue.</p>
            </div>
        </div>
    );
};

export default Home;
