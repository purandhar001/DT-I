import React from "react";

const PostGraduationPrompt = ({ setPostGraduate, setStep }) => {
    const handleChoice = (choice) => {
        setPostGraduate(choice);
        if (choice === "yes") {
            setStep("postgrad");
        } else {
            setStep("Cdashboard");
        }
    };

    return (
        <div className="career-card">
            <h2>Are you interested in Postgraduate Studies?</h2>
            <button onClick={() => handleChoice("yes")}>Yes</button>
            <button onClick={() => handleChoice("no")}>No</button>
        </div>
    );
};

export default PostGraduationPrompt;
