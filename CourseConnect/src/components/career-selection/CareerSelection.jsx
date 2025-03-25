import React from "react";
import "./CareerSelection.css"; // Import the new CSS file

const CareerSelection = ({ setEducationLevel, setStep }) => {
    const handleSelection = (level) => {
        setEducationLevel(level);
        if (level === "secondary" || level === "higherSecondary") {
            setStep("careerOptions");
        } else {
            setStep("field");
        }
    };

    return (
        <div className="career-container">
            <div className="header">
                <h1>Career Selection</h1>
            </div>
            <div className="career-content">
                <h2>Select Your Education Level</h2>
                <div className="career-section">
                    <button className="styled-button" onClick={() => handleSelection("secondary")}>Secondary School</button>
                    <button className="styled-button" onClick={() => handleSelection("higherSecondary")}>Higher Secondary School (Intermediate)</button>
                    <button className="styled-button" onClick={() => handleSelection("undergraduate")}>Undergraduate</button>
                    <button className="styled-button" onClick={() => handleSelection("postgraduate")}>Postgraduate</button>
                </div>
            </div>
        </div>
    );
};

export default CareerSelection;
