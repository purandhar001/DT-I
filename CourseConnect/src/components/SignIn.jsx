import React, { useRef, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import './Registration.css'; // Importing Registration CSS



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
        } catch (error) {
            setError("Failed to sign in");

        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        <div className="reg-container">
            <div className="card">


            <h2 className="hd">Sign In</h2>

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
                    <button disabled={loading} className="btn btn-primary w-100 mt-3" type="submit">
                        Sign In
                    </button>
                </form>
                <div style={{padding: "10px"}}>
                    Need an account? <Link to={"/CourseConnect/signup"}>Sign up</Link>
                </div>
            </div>

            
            
            
</div>
        </>
    );
}

export default SignIn;
