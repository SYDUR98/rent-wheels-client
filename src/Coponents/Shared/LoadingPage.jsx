import React from "react";
import { FaSpinner, FaCarSide } from "react-icons/fa";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-24 md:pt-32 
                    /* Background colors matched with your DaisyUI base-100 */
                    bg-base-100 transition-all duration-500 overflow-hidden">
      
      {/* Slim Container */}
      <div className="flex flex-col items-center w-full max-w-xs md:max-w-sm px-6">
        
        {/* Car Icon - Matched with your Primary Color (#4D9ED0 / #1E40AF) */}
        <div className="relative mb-4 animate-car-drive">
          <FaCarSide className="text-primary text-6xl md:text-7xl drop-shadow-xl" />
        </div>

        {/* Road Line - Using base-300 for the track */}
        <div className="w-32 h-1.5 bg-base-300 relative overflow-hidden rounded-full mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent w-full animate-road-flow"></div>
        </div>

        {/* Spinner & Text Grouped Closer */}
        <div className="flex flex-col items-center gap-4">
          <FaSpinner className="text-3xl text-primary animate-spin" />
          
          <div className="text-center">
            {/* Using base-content for main text to follow theme contrast */}
            <h1 className="text-xl md:text-2xl font-black tracking-[0.2em] uppercase italic 
                           text-base-content">
              Rent<span className="text-primary">Wheels</span>
            </h1>
            <p className="text-[10px] tracking-[0.4em] uppercase font-bold mt-2 
                          text-primary/70">
              Starting Engine...
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes carDrive {
          0%, 100% { transform: translateX(-15px) translateY(0px); }
          50% { transform: translateX(15px) translateY(-2px); }
        }
        @keyframes roadFlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-car-drive {
          animation: carDrive 1.5s ease-in-out infinite;
        }
        .animate-road-flow {
          animation: roadFlow 0.8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;