import React, { useRef, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import "./auth.css"; // Import the new CSS file

function SignUp() {
    const { signup } = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const usernameRef = useRef();
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
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                name: usernameRef.current.value,
                email: emailRef.current.value
            });
            navigate("/CourseConnect/careerpath");
        } catch {
            setError("Failed to sign up");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-header">Create account</h1>
                
                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="auth-input-group">
                        <input id="username" type="text" ref={usernameRef} className="auth-input" placeholder=" " required />
                        <label htmlFor="username" className="auth-label">Username</label>
                    </div>

                    <div className="auth-input-group">
                        <input id="email" type="email" ref={emailRef} className="auth-input" placeholder=" " required />
                        <label htmlFor="email" className="auth-label">Email address</label>
                    </div>

                    <div className="auth-input-group">
                        <input id="password" type="password" ref={passwordRef} className="auth-input" placeholder=" " required />
                        <label htmlFor="password" className="auth-label">Password</label>
                    </div>

                    <div className="auth-input-group">
                        <input id="password-confirm" type="password" ref={passwordConfirmRef} className="auth-input" placeholder=" " required />
                        <label htmlFor="password-confirm" className="auth-label">Confirm Password</label>
                    </div>

                    <button disabled={loading} type="submit" className="auth-button">
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <Link to="/CourseConnect/signin" className="auth-link">Sign in</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
