import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    /* Added bg-base-100 and text-base-content */
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-base-100 text-base-content transition-colors duration-300">
      
      {/* Glow effect for 404 text in dark mode */}
      <h1 className="text-8xl font-black text-primary mb-4 drop-shadow-md">
        404
      </h1>
      
      {/* Changed text-base-300 to base-content */}
      <h2 className="text-2xl font-semibold mb-6">
        Oops! Page Not Found
      </h2>
      
      {/* text-base-content/70 for a subtle look */}
      <p className="text-base-content/70 mb-8 text-center max-w-md">
        The page you are looking for does not exist. It might have been removed or the URL is incorrect.
      </p>
      
      <Link
        to="/"
        className="px-8 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition duration-300 shadow-lg hover:shadow-primary/20"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;