import React from "react";
import { Link } from "react-router-dom";
import './DashBoard.css';

const Layout = ({ children }) => {
  return (
    <div className="db-container">
      <div className="header">
        <h1>CourseConnect</h1>
        <div className="reg-btns">
            <Link to={"/CourseConnect/courses"} >
                <button className='btn'>
                    Courses
                </button>
            </Link>
            <Link to="/CourseConnect/Routine">
                <button className="btn">
                    Routine
                </button>
            </Link>
            <Link to={"/CourseConnect/network"}>
                <button className="btn">
                    Network
                </button>
            </Link>
            <Link to={"/CourseConnect/chatbot"}>
                    <button className="btn">
                        AI chatbot
                    </button>
                </Link>
        </div>
        <div className="profile"></div>
      </div>
      <div className="main-content" style={{marginTop:"25px",minWidth:"100%"}}>
        {children} {/* This will render the content of the specific page */}
      </div>
    </div>
  );
};

export default Layout;
