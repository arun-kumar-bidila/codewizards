import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Jobseeking = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">

            <div className="d-flex gap-4 mt-3">
                <button className="btn btn-primary btn-lg" onClick={() => navigate("/signup")}>
                    signup
                </button>
                <button className="btn btn-success btn-lg" onClick={() => navigate("/login")}>
                    login                </button>
            </div>
        </div>
    );
};

export default Jobseeking;
