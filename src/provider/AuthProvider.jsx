import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../utilities/firebase.init';
import { AuthContext } from './AuthContext';



const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logInWithEmailPass = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logInWithGoogle = ()=>{
        return signInWithPopup(auth,googleProvider)
    }

    const logOut = () =>{
        return signOut(auth)
    }

  useEffect(()=>{
    const unsubscriber = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        setLoading(false)
    })
    return unsubscriber
  },[])


   const authInfo = {
    user,
    setUser,
    logInWithGoogle,
    loading,
    setLoading,
    logOut,
    createUser,
    logInWithEmailPass

    }

    return (
        <div>
            <AuthContext value={authInfo}>
                 {loading ? <p className="text-center mt-10">Loading</p> : children}
            </AuthContext>
        </div>
    );
};

export default AuthProvider;