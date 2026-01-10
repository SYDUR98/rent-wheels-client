// CarsDealerRoute.jsx
import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

import { Navigate, useLocation } from "react-router";
import Forbidden from "../Coponents/Shared/Forbidden";

const CarsDealerRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, roleLoading, isError } = useRole();
  const location = useLocation();

  // show a centered spinner while auth/role loading
  if (authLoading || roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <span className="loading loading-spinner loading-xl" aria-label="loading" />
      </div>
    );
  }

  // not logged in
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // role fetching error
  if (isError) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600">Failed to verify role. Please try again.</p>
      </div>
    );
  }

  // check role
  if (role !== "carsDealer") {
    return <Forbidden />;
  }

  // allowed
  return children;
};

export default CarsDealerRoute;
