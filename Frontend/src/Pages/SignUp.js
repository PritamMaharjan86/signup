import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import Loader from "../Components/Loader";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const PasswordVisible = () => {
    setShowPassword(!showPassword);
  };

  const [signup, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    const getsignup = { ...signup };
    getsignup[id] = value;
    setSignUp(getsignup);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    localStorage.setItem("pendingEmail", signup.email);
    const { name, email, password } = signup;

    if (!name || !email || !password) {
      toast.error("All the fields are required to be filled!");
      return;
    }

    try {
      const url = "https://signup-backend-2lfg.onrender.com/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signup),
      });
      const result = await response.json();
      const { success } = result;
      if (success) {
        toast.success("Access Granted");
        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        if (result.errors && Array.isArray(result.errors)) {
          result.errors.forEach((msg) => toast.error(msg));
        } else if (result.message) {
          toast.warning(result.message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
        setLoading(false);
      }
    } catch (error) {
      toast.error("All the fields are required to be filled!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100 p-4">
      {loading ?
        <Loader />
      : <p></p>}
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-10">
        <h1 className="text-5xl font-extrabold text-yellow-400 mb-2 text-center sm:text-left drop-shadow-[2px_2px_0_#000]">
          Signup
        </h1>

        <form className="w-full" onSubmit={handleSignup}>
          <div className="grid grid-cols-1 gap-5">
            <ToastContainer />

            <div className="relative w-full mt-4">
              <FaRegUserCircle
                className="absolute inset-y-3.5 left-2 flex items-center text-gray-400"
                size={20}
              />
              <input
                className={`block w-full pl-10 border-b-4 p-2 rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-400`}
                type="text"
                id="name"
                autofocus
                placeholder="Enter your name"
                onChange={handleChange}
                value={signup.name}
              />
            </div>

            <div className="relative w-full mt-4">
              <MdOutlineAlternateEmail
                className="absolute inset-y-3.5 left-2 flex items-center text-gray-400"
                size={20}
              />
              <input
                className={`block w-full pl-10 border-b-4 p-2 rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-400`}
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={handleChange}
                value={signup.email}
              />
            </div>

            <div className="relative w-full mt-4">
              <TbLockPassword
                className="absolute inset-y-3.5 left-2 flex items-center text-gray-400"
                size={20}
              />
              <input
                className="block w-full pl-10 border-b-4 p-3 rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 text-base"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={PasswordVisible}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ?
                  <BiShowAlt size={20} />
                : <BiHide size={20} />}
              </button>
            </div>

            <div className="flex justify-center sm:justify-start mt-4 mb-4">
              <button
                onSubmit={handleSignup}
                className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-3xl shadow-lg flex items-center gap-2 hover:from-yellow-500 hover:to-yellow-600 transition">
                <span>SignUp</span>
                <FaLongArrowAltRight size={18} />
              </button>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?
              <a
                href="/login"
                className="text-yellow-400 hover:text-yellow-600 font-semibold ml-1">
                Login now
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
