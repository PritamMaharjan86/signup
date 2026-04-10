import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { FaLongArrowAltRight } from "react-icons/fa";
import Loader from '../Components/Loader';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [validateEmail, setValidateEmail] = useState(false);
    const [login, setLogin] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [remember, setRemember] = useState(false);

    const PasswordVisible = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        const getLogin = { ...login };
        getLogin[id] = value;
        setLogin(getLogin);

        if (id === 'email') {
            validateEmailInput(value);
        }
    };

    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');

        if (savedEmail) {
            setLogin((prev) => ({ ...prev, email: savedEmail }));
            setRemember(true);
        }
    }, []);


    const validateEmailInput = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError(false);
            setValidateEmail(false);
        } else if (emailRegex.test(email)) {
            setEmailError(false);
            setValidateEmail(true);
        } else {
            setEmailError(true);
            setValidateEmail(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = login;
        setLoading(true);

        if (!email || !password) {
            toast.error("All the fields are required to be filled!");
            setLoading(false);
            return;
        }

        try {
            const url = 'https://signup-backend-2lfg.onrender.com/auth/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(login),
            });
            const result = await response.json();
            const { success, jwtToken, name, email } = result;
            if (success) {
                toast.success("Access Granted");

                setTimeout(() => {
                    localStorage.setItem('token', jwtToken);
                    localStorage.setItem('loggedIn', name);
                    localStorage.setItem('email', email);
                    navigate('/home');
                    if (remember) {
                        localStorage.setItem('rememberedEmail', email);
                    } else {
                        localStorage.removeItem('rememberedEmail');
                    }

                }, 1000);
            } else {
                if (result.errors && Array.isArray(result.errors)) {
                    result.errors.forEach(msg => toast.error(msg));
                } else if (result.message) {
                    toast.warning(result.message);
                } else {
                    toast.error("Something went wrong. Please try again.");
                }
                setLoading(false);
            }
        } catch (err) {
            toast.error("Something went wrong!");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-yellow-100 p-4">
            {loading ? <Loader /> : <p></p>}
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-10">
                <form className="w-full" onSubmit={handleLogin}>
                    <h1 className="relative text-5xl font-extrabold text-yellow-400 mb-8 text-center sm:text-left drop-shadow-[2px_2px_0_#000]">
                        LogIn
                    </h1>
                    <div className="grid grid-cols-1 gap-6">
                        <ToastContainer />
                        <div className="relative w-full">
                            <MdOutlineAlternateEmail
                                className="absolute inset-y-3.5 left-2 flex items-center text-gray-400"
                                size={20}
                            />
                            <input
                                className={`block w-full pl-8 border-b-4 p-2 rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 ${emailError ? 'border-red-500' : validateEmail ? 'border-green-500' : 'border-gray-300'
                                    }`}
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                value={login.email}
                            />
                            {emailError && <p className="text-red text-sm mt-1">Invalid email format</p>}
                        </div>

                        <div className="relative w-full">
                            <TbLockPassword
                                className="absolute inset-y-3.5 left-2 flex items-center text-gray-400"
                                size={20}
                            />
                            <input
                                className="block w-full pl-10 border-b-4 p-3 rounded-md shadow-sm focus:outline-none focus:ring-yellow-400 focus:border-yellow-400 text-base"
                                type={showPassword ? 'text' : 'password'}
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
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <BiShowAlt size={20} /> : <BiHide size={20} />}
                            </button>
                        </div>

                        <div className="flex items-center justify-start gap-2 ml-2">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                                className="accent-yellow-400 w-fit"
                            />
                            <label htmlFor="remember" className="text-md text-gray-600">Remember me</label>
                        </div>


                        <div className="flex justify-center sm:justify-start ">
                            <button
                                type="submit"
                                className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-3xl shadow-lg flex items-center gap-2 hover:from-yellow-500 hover:to-yellow-600 transition"
                            >
                                <span>Login</span>
                                <FaLongArrowAltRight size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?
                            <a
                                href="/signup"
                                className="text-yellow-400 hover:text-yellow-600 font-semibold ml-1"
                            >
                                Create new account
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
