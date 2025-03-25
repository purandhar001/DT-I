import React, { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";

import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import "./DashBoard.css";

export default function DashBoard() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [careerSelected, setCareerSelected] = useState(null);

    useEffect(() => {
        if (currentUser) {
            const checkCareerSelection = async () => {
                const userDocRef = doc(db, "users", currentUser.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists() && userDoc.data().careerPath) {
                    setCareerSelected(true);
                } else {
                    await updateDoc(userDocRef, { needsCareerSelection: true });
                    setCareerSelected(false);
                    navigate('/CourseConnect/careerpath');
                }
            };
            checkCareerSelection();
        }
    }, [currentUser, navigate]);

    if (careerSelected === null) {
        return <p>Loading...</p>;
    }

    return (
        <div className="db-container">
            <div className="header">
                <h1>CourseConnect</h1>
                <div className="reg-btns">
                    <Link to={"/CourseConnect/courses"}>
                        <button className='btn'>Courses</button>
                    </Link>
                    <Link to="/CourseConnect/routine">
                        <button className="btn">Routine</button>
                    </Link>
                    <Link to={"/CourseConnect/network"}>
                        <button className="btn">Network</button>
                    </Link>
                    <Link to={"/CourseConnect/chatbot"}>
                        <button className="btn">AI chatbot</button>
                    </Link>
                </div>
            </div>

            <div className="content">
                <h2>Welcome to CourseConnect</h2>
                <p>Explore courses, set routines, connect with peers, and get AI assistance.</p>
            </div>
        </div>
    );
}