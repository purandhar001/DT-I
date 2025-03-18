import React, { useRef, useState } from "react";
import './Registration.css';

import { useAuth } from "./context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
    const { signup } = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }
    
        try {
            setError("");
            setLoading(true);
            const userCredential = await signup(emailRef.current.value, passwordRef.current.value);
            navigate("/CourseConnect/careerpath"); // ✅ Redirect to Career Path instead of Dashboard
        } catch (error) {
            setError("Failed to sign up"); 
        } finally {
            setLoading(false);
        }
    }
    

    return (
        <>
        <div className="reg-container">
            <div className="card">
                <h2 className="hd">Sign Up</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group" id="email">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" ref={emailRef} required />
                    </div>
                    <div className="form-group" id="password">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" ref={passwordRef} required />
                    </div>
                    <div className="form-group" id="password-confirm">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" placeholder="Confirm password" ref={passwordConfirmRef} required />
                    </div>
                    <button disabled={loading} className="btn btn-primary w-100 mt-3" type="submit">
                        Sign Up
                    </button>
                </form>
                <div style={{padding:"10px"}}>
                    Already have an account? <Link to={"/CourseConnect/signin"}>Sign in</Link>
                </div>
            </div>

            
</div>
        </>
    );
}

export default SignUp;
