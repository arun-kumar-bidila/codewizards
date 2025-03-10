import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Skills = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Categorized Skills
  const skillsCategories = {
    "Basic Languages": ["C", "C++", "Java", "Python", "JavaScript"],
    "Advanced Languages": ["TypeScript", "Go", "Rust", "Swift", "Kotlin"],
    "Frameworks": ["React", "Angular", "Vue", "Flutter", "Django", "Spring Boot"],
    "Database & Tools": ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Docker"],
    "Testing Tools": ["Jest", "Mocha", "Selenium", "Cypress"],
    "Designing Skills": ["Adobe Photoshop", "Figma", "Sketch", "Canva"]
  };

  // Load selected skills from localStorage
  useEffect(() => {
    const savedSkills = JSON.parse(localStorage.getItem("selectedSkills")) || [];
    setSelectedSkills(savedSkills);
  }, []);

  // Handle Checkbox Change
  const handleSkillChange = (skill) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];

    setSelectedSkills(updatedSkills);
    localStorage.setItem("selectedSkills", JSON.stringify(updatedSkills));
  };

  // Handle Update and send directly to backend
  const handleUpdate = async () => {
    try {
      console.log("Sending Skills:", selectedSkills); // Debugging output

      const response = await fetch(`http://localhost:2000/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: selectedSkills }),
      });

      const data = await response.json();
      console.log("Response:", data); // Log response

      if (response.ok) {
        alert("Skills updated successfully!");

        // Send skills to predict job
        const predictionResponse = await fetch("http://localhost:2000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input: selectedSkills }),
        });

        const predictionData = await predictionResponse.json();
        console.log("Job Prediction Response:", predictionData);

        if (predictionResponse.ok) {
          // navigate(`/job-suggestions/${userId}`, { state: { predictedJob: predictionData.prediction, selectedSkills } });
          navigate('/home')
        } else {
          alert("Error getting job prediction.");
        }
      } else {
        alert("Error updating skills.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update skills.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center">Select Your Skills</h2>

        {Object.keys(skillsCategories).map((category) => (
          <div key={category} className="mb-4">
            <h5 className="fw-bold">{category}</h5>
            <div className="row">
              {skillsCategories[category].map((skill) => (
                <div className="col-md-4" key={skill}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={skill}
                      checked={selectedSkills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                    />
                    <label className="form-check-label" htmlFor={skill}>
                      {skill}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button className="btn btn-success w-100 mt-3" onClick={handleUpdate}>
          Add Skills & Get Job Suggestion
        </button>
      </div>
    </div>
  );
};

export default Skills;
