// src/routes/UserRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Forbidden from "../Coponents/Shared/Forbidden";

const UserRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, roleLoading, isError } = useRole();
  const location = useLocation();

  // Loading state
  if (authLoading || roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <span
          className="loading loading-spinner loading-xl"
          aria-label="loading"
        />
      </div>
    );
  }

  //  Not logged in
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  //  Role fetch error
  if (isError) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600">Failed to verify role. Please try again.</p>
      </div>
    );
  }

  //  Not a normal user
  if (role !== "user") {
    return <Forbidden />;
  }

  //  Authorized user
  return children;
};

export default UserRoute;
