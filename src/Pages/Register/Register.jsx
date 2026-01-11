import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthContext";
import { toast } from "react-toastify";
import { FaEye, FaRegEyeSlash, FaGoogle, FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const Register = () => {
  const { setUser, createUser, logInWithGoogle, updateUser } = use(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleButton = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (!acceptedTerms) {
      setError("You must accept the terms and conditions.");
      return;
    }

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    // Password validation (Requirement 6)
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/(?=.*[a-z])/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photoURL });
            
            const newUser = { name, email, image: photoURL };

            fetch("https://rent-wheels-unique-api-server.vercel.app/users", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(newUser),
            })
            .then(() => {
              Swal.fire({
                title: "Welcome!",
                text: "Registration Successful",
                icon: "success",
                confirmButtonColor: "#4D9ED0",
              });
              navigate("/");
            });
          });
      })
      .catch((error) => setError(error.message));
  };

  const handleGoogle = () => {
    logInWithGoogle()
      .then((result) => {
        toast.success("Login Successful");
        setUser(result.user);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="hero bg-base-200 min-h-screen py-10 px-4">
      <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl border border-base-300 overflow-hidden">
        <div className="card-body p-8 lg:p-12">
          <div className="flex flex-col items-center mb-6">
            <div className="p-3 bg-primary/10 rounded-full mb-3">
               <FaUserPlus className="text-3xl text-primary" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight">Create <span className="text-primary">Account</span></h1>
            <p className="text-sm opacity-60 mt-1 italic">Join the RentWheels community today</p>
          </div>

          <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="form-control col-span-2 md:col-span-1">
              <label className="label font-bold text-xs uppercase opacity-70">Full Name</label>
              <input type="text" name="name" className="input input-bordered focus:border-primary" placeholder="John Doe" required />
            </div>

            {/* Email */}
            <div className="form-control col-span-2 md:col-span-1">
              <label className="label font-bold text-xs uppercase opacity-70">Email Address</label>
              <input type="email" name="email" className="input input-bordered focus:border-primary" placeholder="name@example.com" required />
            </div>

            {/* Photo URL */}
            <div className="form-control col-span-2">
              <label className="label font-bold text-xs uppercase opacity-70">Profile Photo URL</label>
              <input type="text" name="photoURL" className="input input-bordered focus:border-primary" placeholder="https://image.com/photo.jpg" />
            </div>

            {/* Password */}
            <div className="form-control col-span-2">
              <label className="label font-bold text-xs uppercase opacity-70">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered focus:border-primary w-full"
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={handleToggleButton} className="absolute inset-y-0 right-4 flex items-center text-xl opacity-50">
                  {showPassword ? <FaEye /> : <FaRegEyeSlash />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && <div className="col-span-2 text-error text-xs font-bold bg-error/10 p-2 rounded border border-error/20">{error}</div>}

            {/* Terms */}
            <div className="col-span-2 flex items-center gap-3 py-2">
              <input type="checkbox" className="checkbox checkbox-primary checkbox-sm rounded" onChange={(e) => setAcceptedTerms(e.target.checked)} />
              <label className="text-sm opacity-80 cursor-pointer">
                I accept the <span className="text-primary font-bold hover:underline">Terms & Conditions</span>
              </label>
            </div>

            <button className="btn btn-primary col-span-2 text-white font-bold text-lg mt-2 shadow-lg shadow-primary/20">
              Create Account
            </button>
          </form>

          <div className="divider opacity-50 text-[10px] tracking-[0.3em] my-6">OR REGISTER WITH</div>

          <button onClick={handleGoogle} className="btn btn-outline w-full border-base-300 hover:bg-base-200 flex items-center gap-3">
            <FaGoogle className="text-red-500" />
            <span className="opacity-80">Continue with Google</span>
          </button>

          <p className="mt-8 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold hover:underline">Login Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;