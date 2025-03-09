import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Skills from "./Skills";

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/skills/:userId" element={<Skills />} />
      </Routes>
    </div>
  );
};

export default App;
