import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

export default function PrivateRoute() {
    const { currentUser } = useAuth();
    return currentUser ? <Outlet /> : <Navigate to="/CourseConnect/signin" />;
}

