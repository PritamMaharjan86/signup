import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Home() {
    const [loggedIn, setLoggedIn] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedIn(localStorage.getItem('loggedIn'));
    })

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedIn');
        toast.success("Logging out!");
        setTimeout(() => {
            navigate('/login')
        }, 1000);

    }

    return (
        <div>
            <div class="fixed inset-0 z-[-1] overflow-hidden">
                <div class="bg-layer1 absolute inset-0"></div>
                <div class="bg-layer2 absolute inset-0"></div>
                <div class="bg-layer3 absolute inset-0"></div>
            </div>

            <h1>Welcome {loggedIn}</h1>
            <ToastContainer />
            <button onClick={handleLogout}>Logout</button>

        </div>
    )
}

export default Home
