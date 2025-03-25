import React from "react";
import { useNavigate } from "react-router-dom";
import "./CareerOptions.css"; // Import the new CSS file

const CareerOptions = ({ setStep }) => {
    const navigate = useNavigate();
    const options = [
        { category: "Arts and Humanities", careers: ["B.A. (History, Psychology, etc.)", "Journalism", "Fine Arts", "Literature"] },
        { category: "Commerce and Business", careers: ["B.Com", "BBA", "Economics", "Actuarial Science"] },
        { category: "Law", careers: ["BA-LLB", "BBA-LLB"] },
        { category: "Design and Fashion", careers: ["B.Des", "Fashion Design"] },
        { category: "Hospitality and Tourism", careers: ["BHM", "Hospitality Management"] },
        { category: "Social Work", careers: ["BSW (Social Work)"] },
        { category: "Education and Teaching", careers: ["B.Ed", "Integrated BA/B.Sc + B.Ed"] },
        { category: "Physical Education and Sports", careers: ["BPEd (Physical Education)"] },
        { category: "Culinary Arts", careers: ["Bachelor in Culinary Arts"] },
        { category: "Event Management", careers: ["BBA in Event Management"] },
        { category: "Aviation and Travel", careers: ["B.Sc in Aviation", "Diploma in Air Hostess Training"] },
        { category: "Defense and Civil Services", careers: ["NDA", "CDS", "Civil Services (IAS, IPS)"] },
        { category: "Creative Writing and Content Creation", careers: ["B.A. in Creative Writing", "Diploma in Content Writing"] },
        { category: "Psychology and Counseling", careers: ["B.A./B.Sc in Psychology"] },
        { category: "Library Science", careers: ["Bachelor in Library Science"] },
        { category: "Foreign Languages", careers: ["B.A. in Foreign Languages"] },
        { category: "Photography and Videography", careers: ["Diploma in Photography"] },
        { category: "Animation and Multimedia", careers: ["B.Sc in Animation", "Diploma in Multimedia"] },
        { category: "Public Administration", careers: ["B.A. in Public Administration"] },
        { category: "Entrepreneurship", careers: ["BBA in Entrepreneurship"] }
    ];

    const handleClick = (career, isLast) => {
        navigate("/CourseConnect/courses");
    };

    return (
        <div className="career-container">
            <div className="header">
                <h1>Career Selection</h1>
            </div>
            <div className="career-content">
                <h2>Choose a Career Path</h2>
                {options.map((option, index) => (
                    <div key={index} className="career-section">
                        <h3>{option.category}</h3>
                        {option.careers.map((career, i) => (
                            <button 
                                key={i} 
                                onClick={() => handleClick(career, index === options.length - 1 && i === option.careers.length - 1)}
                            >
                                {career}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CareerOptions;
