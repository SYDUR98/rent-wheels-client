import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../utilities/firebase.init';
import { AuthContext } from './AuthContext';
import LoadingSpinner from '../Coponents/LoadingSpinner/LoadingSpinner';



const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logInWithEmailPass = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

     const updateUser = (profileData) => {
    return updateProfile(auth.currentUser, profileData);
  };

    const logInWithGoogle = ()=>{
        setLoading(true)
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
    logInWithEmailPass,
    updateUser

    }

    return (
        <div>
            
            <AuthContext value={authInfo}>
                 {loading ? <LoadingSpinner></LoadingSpinner> : children}
            </AuthContext>,
            

        </div>
    );
};

export default AuthProvider;