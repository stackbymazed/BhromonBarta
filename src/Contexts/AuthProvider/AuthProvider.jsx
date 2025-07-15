import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../Firebase/Firebase.init';
import { AuthContext } from '../AuthContext/AuthContext';

const provider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(null)


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const userSignin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userSignOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const signUpWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    const upDateUser = (upDatedData) => {
        return updateProfile(auth.currentUser, upDatedData)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe()
        }
    }, [])

    // console.log(currentUser)
    const userinfo = {
        createUser,
        userSignin,
        userSignOut,
        user,
        token,
        loading,
        signUpWithGoogle,
        upDateUser,
        resetPassword
    }
    return (
        <AuthContext value={userinfo}>
            {
                children
            }
        </AuthContext>
    );
};

export default AuthProvider;