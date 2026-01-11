import React, { useContext } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa"; 
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthContext"; 
import { useNavigate } from "react-router"; 

const FcLogin = () => {
  // Extract functions from AuthContext
  const { logInWithFacebook, logInWithGoogle, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handler for Facebook Login
  const handleFacebookLogin = () => {
    logInWithFacebook()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login Successful with Facebook!");
        navigate("/");
      })
      .catch((err) => {
        console.error("Facebook Login Error:", err.message);
        toast.error(err.message);
      });
  };

  // Handler for Google Login
  const handleGoogleLogin = () => {
    logInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login Successful with Google!");
        navigate("/");
      })
      .catch((err) => {
        console.error("Google Login Error:", err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
      {/* Divider or Header Text */}
      <div className="divider text-sm opacity-50">OR CONTINUE WITH</div>

      {/* Google Button */}
      <button 
        onClick={handleGoogleLogin} 
        className="btn btn-outline w-full flex items-center justify-center gap-3 border-base-300 hover:bg-red-50 transition-all"
      >
        <FaGoogle className="text-error" /> 
        <span>Login with Google</span>
      </button>

      {/* Facebook Button */}
      <button 
        onClick={handleFacebookLogin} 
        className="btn btn-outline w-full flex items-center justify-center gap-3 border-base-300 hover:bg-[#1877F2] hover:text-white transition-all"
      >
        <FaFacebook className="text-[#1877F2] text-xl" /> 
        <span>Login with Facebook</span>
      </button>
    </div>
  );
};

export default FcLogin;