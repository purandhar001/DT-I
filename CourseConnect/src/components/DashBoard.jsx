import React from 'react'
import { Link } from 'react-router-dom'
import './DashBoard.css'

export default function DashBoard() {
  return (
    <>
    <div className="db-container">
        <div className='header'>
            
                <h1 style={{display:"inline"}}>CourseConnect</h1>
                <div className="reg-btns">
                <Link to={"/CourseConnect/courses"}>
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
                </div>
                <div className="profile">
                    
                </div>

        </div >
        <div className="footer">


        </div>
    </div>
    </>
  )
}
