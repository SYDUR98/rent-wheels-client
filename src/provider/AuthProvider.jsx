import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../utilities/firebase.init';
import { AuthContext } from './AuthContext';
import LoadingSpinner from '../Coponents/LoadingSpinner/LoadingSpinner';
import { FacebookAuthProvider } from "firebase/auth";
import LoadingPage from '../Coponents/Shared/LoadingPage';



const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const createUser = (email, password)=>{
        
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logInWithEmailPass = (email, password)=>{
        
        return signInWithEmailAndPassword(auth, email, password)
    }

     const updateUser = (profileData) => {
    return updateProfile(auth.currentUser, profileData);
  };

    const logInWithGoogle = ()=>{
        
        return signInWithPopup(auth,googleProvider)
    }

    const logInWithFacebook = () => {
        setLoading(true);
        return signInWithPopup(auth, facebookProvider);
    };

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
    updateUser,
    logInWithFacebook

    }

    return (
        <div>
            
            <AuthContext value={authInfo}>
                 {loading ? <LoadingPage></LoadingPage> : children}
            </AuthContext>,
            

        </div>
    );
};

export default AuthProvider;