import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from './AuthContext';
import LoadingSpinner from '../Coponents/LoadingSpinner/LoadingSpinner';
import LoadingPage from '../Coponents/Shared/LoadingPage';

const PrivateRoute = ({children}) => {
    const {user,loading} = use(AuthContext)
    const location = useLocation()
    if(loading){
        return <LoadingPage></LoadingPage>
    }

    if(user && user.email){
        return children
    }
    else{
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }
};

export default PrivateRoute;