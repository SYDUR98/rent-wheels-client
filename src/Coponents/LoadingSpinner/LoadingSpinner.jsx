import React from "react";

const LoadingSpinner = () => {
  return (
    
    <div className="flex flex-col items-center justify-center w-full min-h-[300px] bg-base-100 transition-colors duration-300">
      
      {/* DaisyUI Spinner with Primary Color */}
      <span className="loading loading-spinner loading-lg text-primary"></span>
      
      {/* Optional: Add a subtle text for better UX */}
      <p className="mt-4 text-primary font-medium animate-pulse tracking-widest text-sm">
        LOADING...
      </p>
      
    </div>
  );
};

export default LoadingSpinner;