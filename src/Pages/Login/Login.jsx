import React, { use, useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthContext";
import { FaEye, FaRegEyeSlash, FaGoogle, FaUserShield } from "react-icons/fa";

const Login = () => {
  const { setUser, logInWithGoogle, logInWithEmailPass } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loginSuccess, setLoginSuccess] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Demo Data State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleToggleButton = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // Demo Admin Login (Requirement 6)
  const handleAdminFill = () => {
    setEmail("admin@gmail.com");
    setPassword("Aadmin@gmail.com");
    toast.info("Admin credentials filled!");
  };

  const handleGoogle = () => {
    logInWithGoogle()
      .then((result) => {
        toast.success("Welcome! Login successful");
        setUser(result.user);
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };
        fetch("https://rent-wheels-unique-api-server.vercel.app/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newUser),
        });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginSuccess(true);
    
    logInWithEmailPass(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success("Welcome Back!");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error("Invalid credentials");
        setLoginSuccess(false);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen py-10">
      <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl border border-base-300">
        <div className="card-body p-8 lg:p-10">
          <h1 className="text-3xl font-black text-center mb-2 uppercase tracking-tight">
            Login <span className="text-primary">Now</span>
          </h1>
          <p className="text-center text-sm mb-6 opacity-70">
            Drive your dreams with RentWheels
          </p>

          {/* Demo Admin Button - Requirement 6 */}
          <button 
            onClick={handleAdminFill}
            className="btn btn-outline btn-sm btn-primary mb-6 flex items-center gap-2 rounded-lg"
          >
            <FaUserShield /> Demo Admin Credential
          </button>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label font-bold text-xs uppercase tracking-wider opacity-60">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered focus:border-primary w-full"
                placeholder="admin@gmail.com"
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-bold text-xs uppercase tracking-wider opacity-60">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered focus:border-primary w-full"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={handleToggleButton}
                  className="absolute inset-y-0 right-4 flex items-center text-xl opacity-50"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {!loginSuccess && (
              <p className="text-error text-xs font-medium animate-shake">
                Invalid email or password. Please try again.
              </p>
            )}

            <div className="flex justify-between items-center py-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-xs checkbox-primary" />
                <span className="text-xs opacity-70">Remember me</span>
              </label>
              <a className="link link-hover text-xs text-primary font-bold">Forgot password?</a>
            </div>

            <button className="btn btn-primary w-full text-white font-bold text-lg mt-4 shadow-lg shadow-primary/20">
              Login
            </button>
          </form>

          <div className="divider opacity-50 uppercase text-[10px] tracking-[0.3em] my-6">OR LOGIN WITH</div>

          <button
            onClick={handleGoogle}
            className="btn btn-outline w-full border-base-300 hover:bg-base-200 flex items-center gap-3 transition-all"
          >
            <FaGoogle className="text-red-500" />
            <span className="text-base-content opacity-80">Continue with Google</span>
          </button>

          <p className="mt-8 text-center text-sm">
            New to RentWheels?{" "}
            <Link to="/register" className="text-primary font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;