import React, { useState } from "react";
import CareerSelection from "./CareerSelection";
import FieldSelection from "./FieldSelection";
import CourseSelection from "./CourseSelection";
import CareerOptions from "./CareerOptions";
import PostGraduationPrompt from "./PostGraduationPrompt";
import PostGraduationSelection from "./PostGraduationSelection";
import CDashboard from "./CDashboard";
import "./CareerPath.css"; // Import the new CSS file

const CareerPath = () => {
    const [step, setStep] = useState("career");
    const [educationLevel, setEducationLevel] = useState(null);
    const [field, setField] = useState(null);
    const [course, setCourse] = useState(null);
    const [postGraduate, setPostGraduate] = useState(null);

    const renderStep = () => {
        switch (step) {
            case "career":
                return <CareerSelection setEducationLevel={setEducationLevel} setStep={setStep} />;
            case "field":
                return <FieldSelection educationLevel={educationLevel} setField={setField} setStep={setStep} />;
            case "course":
                return <CourseSelection field={field} setCourse={setCourse} setStep={setStep} />;
            case "careerOptions":
                return <CareerOptions educationLevel={educationLevel} setStep={setStep} />;
            case "postgradPrompt":
                return <PostGraduationPrompt setPostGraduate={setPostGraduate} setStep={setStep} />;
            case "postgrad":
                return <PostGraduationSelection field={field} setStep={setStep} />;
            case "dashboard":
                return <CDashboard />;
            default:
                return <CareerSelection setEducationLevel={setEducationLevel} setStep={setStep} />;
        }
    };

    return (
        <div className="career-path-container">
            <div className="header">
                <h1>Career Path Selection</h1>
            </div>
            <div className="career-content">
                {renderStep()}
                <div className="button-container">
                    <button className="styled-button" onClick={() => setStep("field")}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default CareerPath;
