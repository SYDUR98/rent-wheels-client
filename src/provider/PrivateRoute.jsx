import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({children}) => {
    const {user,loading} = use(AuthContext)
    const location = useLocation()
    if(loading){
        return <p>loading...</p>
    }

    if(user && user.email){
        return children
    }
    else{
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }
};

export default PrivateRoute;