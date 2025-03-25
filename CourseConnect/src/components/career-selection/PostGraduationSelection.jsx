import React from "react";

const PostGraduationSelection = ({ field, setStep }) => {
    const postgradCourses = {
        Science: ["M.Sc Physics", "M.Sc Chemistry", "M.Sc Biology"],
        Engineering: ["M.Tech", "MS in Engineering"],
        Management: ["MBA", "MMS"],
        Law: ["LLM", "Corporate Law"],
        Arts: ["MA Psychology", "MA History"]
    };

    return (
        <div className="career-card">
            <h2>Select Your Postgraduate Course</h2>
            {postgradCourses[field]?.map((course, index) => (
                <button key={index} onClick={() => setStep("Cdashboard")}>
                    {course}
                </button>
            ))}
        </div>
    );
};

export default PostGraduationSelection;
