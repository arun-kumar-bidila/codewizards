import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Skills = () => {
  const { userId } = useParams();
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const availableSkills = ["React", "Node.js", "MongoDB", "Flutter", "Python"];

  const handleSkillChange = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:2000/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills: selectedSkills }),
    });
    alert("Skills updated successfully!");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center">Select Your Skills</h2>
        <div className="mb-3">
          {availableSkills.map((skill) => (
            <div className="form-check" key={skill}>
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
          ))}
        </div>
        <button className="btn btn-success w-100" onClick={handleUpdate}>
          Update Skills
        </button>
      </div>
    </div>
  );
};

export default Skills;
