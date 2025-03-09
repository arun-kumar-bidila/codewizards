import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Skills = () => {
  const { userId } = useParams();
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Categorized Skills
  const skillsCategories = {
    "Basic Languages": ["C", "C++", "Java", "Python", "JavaScript"],
    "Advanced Languages": ["TypeScript", "Go", "Rust", "Swift", "Kotlin"],
    Frameworks: ["React", "Angular", "Vue", "Flutter", "Django", "Spring Boot"],
    "Database & Tools": ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Docker"],
    "Testing Tools": ["Jest", "Mocha", "Selenium", "Cypress"],
    "Designing Skills": ["Adobe Photoshop", "Figma", "Sketch", "Canva"]
  };

  // Handle Checkbox Change
  const handleSkillChange = (skill) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill) // Remove skill
        : [...prevSkills, skill] // Add skill
    );
  };

  // Handle Update
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:2000/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: selectedSkills }),
      });

      if (response.ok) {
        alert("Skills updated successfully!");
      } else {
        alert("Error updating skills.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center">Select Your Skills</h2>

        {/* Loop Through Skill Categories */}
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
          Update Skills
        </button>
      </div>
    </div>
  );
};

export default Skills;
