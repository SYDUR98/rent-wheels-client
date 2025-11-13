import React from "react";
import { Link } from "react-router";


const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-base-300 mb-6">
        Oops! Page Not Found
      </h2>
      <p className="text-base-300 mb-8 text-center">
        The page you are looking for does not exist. It might have been removed or the URL is incorrect.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary-content transition duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
