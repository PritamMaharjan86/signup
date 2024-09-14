import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const PasswordVisible = () => {
        setShowPassword(!showPassword);
    }

    const [signup, setSignUp] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { id, value } = e.target;
        const getsignup = { ...signup };
        getsignup[id] = value;
        setSignUp(getsignup);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signup;

        if (!name || !email || !password) {
            toast.error("All the fields are required to be filled!");
            return;
        }

        try {
            const url = 'http://localhost:3001/auth/signup';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signup)

            });
            const result = await response.json();
            const { success, error } = result;
            if (success) {
                toast.success("Access Granted");
                setTimeout(() => {
                    navigate('/login');
                }, 1000)
            }
            else if (error) {
                const details = error?.details[0].message;
                toast.error(details)
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
                Signup
            </h1>

            <form className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg m-10" onSubmit={handleSignup}>

                <div className="grid grid-cols-1 gap-5">

                    <ToastContainer />
                    <div>

                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            className="mt-1 block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            type="text"
                            id="name"
                            autoFocus
                            placeholder="Enter your name"
                            onChange={handleChange}
                            value={signup.name}
                        />
                    </div>

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
                            value={signup.email}
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
                                value={signup.password}
                            />
                            <button
                                type="button"
                                onClick={PasswordVisible}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-600 focus:outline-none"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>

                        </div>
                        <button onSubmit={handleSignup} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mx-auto block m-5">
                            SignUp
                        </button>

                    </div>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?
                        <a href="/login" className="text-blue-600 hover:text-blue-800 font-semibold ml-1">
                            Please login here
                        </a>
                    </p>
                </div>
            </form>

        </div>
    )
}

export default SignUp
