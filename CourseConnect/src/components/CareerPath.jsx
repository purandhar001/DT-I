import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CareerPath.css"; // Add styles if needed

const CareerPath = () => {
    const [educationLevel, setEducationLevel] = useState("");
    const [interest, setInterest] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleEducationSelect = (level) => {
        setEducationLevel(level);
        setStep(2);
    };

    const handleInterestSelect = (field) => {
        setInterest(field);
        let nextSteps = [];
        
        if (educationLevel === "Secondary Education") {
            if (field === "Software Development") {
                nextSteps = ["Intermediate (MPC) → Engineering (CSE, IT)", "Polytechnic Diploma in Software Engineering"];
            } else if (field === "Animation & Film Making") {
                nextSteps = ["Intermediate (MPC/CEC) → Bachelor in Animation & Film Making", "Diploma in Animation"];
            }
        } else if (educationLevel === "Senior Secondary Education") {
            if (field === "Software Development") {
                nextSteps = ["Bachelor's in Computer Science / IT", "BCA (Bachelor of Computer Applications)"];
            } else if (field === "Animation & Film Making") {
                nextSteps = ["Bachelor's in Animation & Film Making", "B.Sc in Multimedia"];
            }
        } else if (educationLevel === "Undergraduate Education") {
            if (field === "Software Development") {
                nextSteps = ["Master's in Computer Science / IT", "Join Internship / Get Certifications"];
            } else if (field === "Animation & Film Making") {
                nextSteps = ["Master's in Animation", "Join Film Studio Internship"];
            }
        } else if (educationLevel === "Postgraduate Education") {
            nextSteps = ["Apply for Jobs", "Consider PhD or Research"];
        }

        setSuggestions(nextSteps);
        setStep(3);
    };

    return (
        <div className="career-container">
            <div className="career-card">
                {step === 1 && (
                    <>
                        <h2>Select Your Education Level</h2>
                        <button onClick={() => handleEducationSelect("Secondary Education")}>Secondary Education</button>
                        <button onClick={() => handleEducationSelect("Senior Secondary Education")}>Senior Secondary Education</button>
                        <button onClick={() => handleEducationSelect("Undergraduate Education")}>Undergraduate Education</button>
                        <button onClick={() => handleEducationSelect("Postgraduate Education")}>Postgraduate Education</button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2>What Interests You?</h2>
                        <button onClick={() => handleInterestSelect("Software Development")}>Software Development</button>
                        <button onClick={() => handleInterestSelect("Animation & Film Making")}>Animation & Film Making</button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h2>Recommended Next Steps</h2>
                        {suggestions.map((step, index) => (
                            <button key={index} className="next-step-btn" onClick={() => navigate("/CourseConnect/")}>{step}</button>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default CareerPath;
