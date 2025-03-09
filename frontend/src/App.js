import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Skills from "./Skills";
import LandingPage from "./landingpage";
import Jobseeking from "./jobseeking";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/job-seeking" element={<Jobseeking />} />
      <Route path="/skills/:userId" element={<Skills />} />
    </Routes>
  );
};

export default App;
