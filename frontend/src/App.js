import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import JobSuggestion from "./jobSuggestion";  
import Signup from "./Signup";
import Skills from "./Skills";
import LandingPage from "./landingpage";
import Jobseeking from "./jobseeking";
import Profile from "./profile";
import Login from "./login";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />}>
                <Route path="suggested-job" element={<JobSuggestion />} />
                <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/job-seeking" element={<Jobseeking />} />
            <Route path="/skills/:userId" element={<Skills />} />
            <Route path="/login" element={<Login />} />
            <Route path="/job-suggestions" element={<JobSuggestion />} />  
        </Routes>
    );
};

export default App;
