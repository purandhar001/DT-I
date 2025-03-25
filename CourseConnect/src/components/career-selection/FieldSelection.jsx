import React from "react";

const FieldSelection = ({ educationLevel, setField, setStep }) => {
    const fields = {
        higherSecondary: ["Science", "Commerce", "Arts", "Others"],
        undergraduate: ["Engineering", "Medical", "Management", "Law", "Arts", "Sciences"],
        postgraduate: ["Science", "Engineering", "Management", "Law", "Arts"]
    };

    const handleSelection = (field) => {
        setField(field);
        setStep("course");
    };

    return (
        <div className="career-card">
            <h2>Select Your Field of Study</h2>
            {fields[educationLevel].map((field, index) => (
                <button key={index} onClick={() => handleSelection(field)}>
                    {field}
                </button>
            ))}
        </div>
    );
};

export default FieldSelection;
