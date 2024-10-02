import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const PasswordVisible = () => {
        setShowPassword(!showPassword);
    }

    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { id, value } = e.target;
        const getlogin = { ...login };
        getlogin[id] = value;
        setLogin(getlogin);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = login;

        if (!email || !password) {
            toast.error("All the fields are required to be filled!");
            return;
        }

        try {
            const url = 'https://backend-lilac-seven-15.vercel.app/auth/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)

            });
            const result = await response.json();
            const { success, error, jwtToken, name, message } = result;
            if (success) {
                toast.success("Access Granted");
                setTimeout(() => {
                    localStorage.setItem('token', jwtToken);
                    localStorage.setItem('loggedIn', name);
                    navigate('/home');
                }, 1000)
            }
            else {
                // If an error exists, show the error message from the server response
                if (message) {
                    toast.warning(message);
                } else if (error && error.details) {
                    const details = error.details[0].message;
                    toast.error(details);
                } else {
                    toast.error("Something went wrong. Please try again.");
                }
            }
        }

        catch (err) {
            toast.error("All the fields are required to be filled!");
        }

    }


    return (
        <div>
            <div class="fixed inset-0 z-[-1] overflow-hidden">
                <div class="bg-layer1 absolute inset-0"></div>
                <div class="bg-layer2 absolute inset-0"></div>
                <div class="bg-layer3 absolute inset-0"></div>
            </div>
            <h1 className="text-5xl font-extrabold text-white text-center drop-shadow-lg my-8">
                Login
            </h1>


            <form className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg m-10" onSubmit={handleLogin}>
                <div className="grid grid-cols-1 gap-5">
                    <ToastContainer />


                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            value={login.email}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                value={login.password}
                            />
                            <button
                                type="button"
                                onClick={PasswordVisible}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-600 focus:outline-none"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>


                        </div>
                        <button onSubmit={handleLogin} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mx-auto block m-5">
                            Login
                        </button>

                    </div>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?
                        <a href="/signup" className="text-blue-600 hover:text-blue-800 font-semibold ml-1">
                            Please signup here
                        </a>
                    </p>
                </div>
            </form>

        </div>
    )
}

export default Login
