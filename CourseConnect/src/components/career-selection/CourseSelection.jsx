import React from "react";

const CourseSelection = ({ field, setCourse, setStep }) => {
    const courses = {
        Science: ["B.Sc Physics", "B.Sc Chemistry", "B.Sc Biology", "B.Tech"],
        Commerce: ["B.Com", "BBA", "CA", "CFA"],
        Arts: ["BA Psychology", "BA History", "BA Journalism"],
        Engineering: ["B.Tech CSE", "B.Tech Mechanical", "B.Tech Civil"],
        Medical: ["MBBS", "BDS", "BAMS", "Pharmacy"],
        Management: ["BBA", "MBA", "Hospitality Management"],
        Law: ["LLB", "BA-LLB", "BBA-LLB"]
    };

    const handleSelection = (course) => {
        setCourse(course);
        setStep("postgradPrompt");
    };

    return (
        <div className="career-card">
            <h2>Select Your Course</h2>
            {courses[field]?.map((course, index) => (
                <button key={index} onClick={() => handleSelection(course)}>
                    {course}
                </button>
            ))}
        </div>
    );
};

export default CourseSelection;
