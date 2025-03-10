import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    const navigate = useNavigate();
    const [showWelcome, setShowWelcome] = useState(true); // Track initial view

    const handleNavigation = (path) => {
        navigate(path);
        setShowWelcome(false); // Hide welcome message after first navigation
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Main Navigation">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav w-100 d-flex justify-content-between">
                            <li className="nav-item flex-grow-1">
                                <button className="btn btn-outline-light w-100 border-0" onClick={() => handleNavigation("/home/suggested-job")} aria-label="Navigate to Suggested Job">
                                    Suggested Job
                                </button>
                            </li>
                            <li className="nav-item flex-grow-1">
                                <button className="btn btn-outline-light w-100 border-0" onClick={() => handleNavigation("/home/resume-builder")} aria-label="Navigate to Resume Builder">
                                    Resume Builder
                                </button>
                            </li>
                            <li className="nav-item flex-grow-1">
                                <button className="btn btn-outline-light w-100 border-0" onClick={() => handleNavigation("/home/profile")} aria-label="Navigate to Profile">
                                    Profile
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Show Welcome Message Initially */}
            <div className="container mt-5">
                {showWelcome ? (
                    <div className="text-center">
                        <h1 className="mb-3">Welcome to CareerHub</h1>
                        <p className="text-muted small">
                            A platform designed to help you build a strong career. Navigate through job opportunities, 
                            enhance your resume, and manage your professional profile effortlessly.
                        </p>
                    </div>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
};

export default Home;
