import React, { useEffect, useState } from "react";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        // Get user data from localStorage
        const storedUser = localStorage.getItem("userData");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Get selected skills from localStorage
        const savedSkills = JSON.parse(localStorage.getItem("selectedSkills")) || [];
        setSkills(savedSkills);
    }, []);

    return (
        <div className="container mt-5" style={{ width: "50%" }}>
            <h2 className="text-center">Profile</h2>
            {user ? (
                <div className="card p-3 shadow">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Education Level:</strong> {user.educationLevel}</p>
                    <p><strong>Skills:</strong> {skills.length > 0 ? skills.join(", ") : "No skills added yet."}</p>
                </div>
            ) : (
                <p className="text-muted text-center">No user data found. Please log in.</p>
            )}
        </div>
    );
};

export default Profile;
