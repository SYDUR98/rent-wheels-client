import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthContext";
import { toast } from "react-toastify";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
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

    //  Password validation
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

    //  Create user in Firebase
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        toast.success("Welcome! Your registration was successful");
        Swal.fire({
          title: "Registration Successful!",
          text: "Welcome to Rent Wheels",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/");
        // Update Firebase profile
        updateUser({
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            // Local user update
            setUser({
              ...user,
              displayName: name,
              photoURL: photoURL,
            });

            // 🔹 Save user in your database
            const newUser = {
              name: name,
              email: email,
              image: photoURL,
            };

            fetch("http://localhost:3000/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(newUser),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("User saved:", data);
              });
          })
          .catch((err) => setError(err.message));
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  const handleGoogle = () => {
    logInWithGoogle()
      .then((result) => {
        console.log(result.user);
        toast.success("Welcome! Your login was successful");
       
        setUser(result.user);
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };
        // create user in database
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
       
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-4xl font-bold">Reginster now!</h1>
          <p>
            Already have an account?{" "}
            <Link to={"/login"}>
              <span className="text-blue-500 underline">Login Now</span>
            </Link>
          </p>
          <form onSubmit={handleRegister}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Enter Your Name"
              />
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Enter Your Email"
                required
              />
              <label className="label">PhotoURL</label>
              <input
                type="text"
                name="photoURL"
                className="input"
                placeholder="Enter Your Photo URL"
              />
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input"
                  placeholder="Enter Your Password"
                  required
                />
                <button
                  onClick={handleToggleButton}
                  className="btn btn-xs absolute top-2 right-5 z-10 "
                >
                  {showPassword ? <FaEye /> : <FaRegEyeSlash />}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {/* Terms and conditiosn */}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <label className="text-sm text-gray-700">
                  Accept{" "}
                  <span className="font-semibold">Terms & Conditions</span>
                </label>
              </div>
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn bg-primary/90 text-black/90 hover:bg-primary hover:text-black transition duration-200 mt-4">
                Register
              </button>
            </fieldset>
          </form>
          <button
            onClick={handleGoogle}
            className="btn btn-outline btn-info text-black hover:bg-primary/10"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
