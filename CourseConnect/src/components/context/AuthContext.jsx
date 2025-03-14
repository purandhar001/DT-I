import React, { useContext, useEffect, useState } from 'react';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged 
} from 'firebase/auth';



const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth();

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function signin(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function signout(){
        auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, [auth]);

    const value = {
        currentUser,
        signin,
        signout,
        signup
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
