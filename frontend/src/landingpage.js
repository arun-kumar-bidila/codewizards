import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
            <h1 className="mb-4 fw-bold">Welcome!</h1>
            <p className="lead text-center">Are you looking to hire talent or seeking job opportunities?</p>

            <div className="d-flex gap-4 mt-3">
                <button className="btn btn-primary btn-lg" onClick={() => navigate("/hiring")}>
                    I'm Hiring
                </button>

                <button className="btn btn-success btn-lg" onClick={() => navigate("/job-seeking")}>Job Seeking</button>

            </div>
        </div>
    );
};

export default LandingPage;
