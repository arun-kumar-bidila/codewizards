import React from "react";
import { useLocation } from "react-router-dom";

const JobSuggestion = () => {
  const location = useLocation();
  const { predictedJob, selectedSkills } = location.state || {};

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center">The Job that suits your skills</h2>
        <h5>Your Selected Skills:</h5>
        <ul className="list-group">
          {selectedSkills && selectedSkills.length > 0 ? (
            selectedSkills.map((skill, index) => (
              <li key={index} className="list-group-item">{skill}</li>
            ))
          ) : (
            <li className="list-group-item">No skills found</li>
          )}
        </ul>

        {/* Suggested Job Section */}
        <div className="mt-4">
          <h5>Suggested Job:</h5>
          <div className="alert alert-success">
            {predictedJob ? predictedJob : "No job suggestion available"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSuggestion;
