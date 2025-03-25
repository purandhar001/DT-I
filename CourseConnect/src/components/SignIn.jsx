import React, { useRef, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css"; // Import the new CSS file

function SignIn() {
    const { signin } = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await signin(emailRef.current.value, passwordRef.current.value);
            navigate("/CourseConnect/");
        } catch {
            setError("Failed to sign in");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-header">Welcome back!</h1>
                
                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="auth-input-group">
                        <input id="email" type="email" ref={emailRef} className="auth-input" placeholder=" " required />
                        <label htmlFor="email" className="auth-label">Email address</label>
                    </div>

                    <div className="auth-input-group">
                        <input id="password" type="password" ref={passwordRef} className="auth-input" placeholder=" " required />
                        <label htmlFor="password" className="auth-label">Password</label>
                    </div>

                    <button disabled={loading} type="submit" className="auth-button">
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <div className="auth-footer">
                    Need an account? <Link to="/CourseConnect/signup" className="auth-link">Sign up</Link>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
