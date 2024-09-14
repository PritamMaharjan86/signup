import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function RefreshHandler({ setIsAuthenticate }) {

    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticate(true);
            if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
                navigate('/home', { replace: false });
            }
        }
    }, [location, navigate, setIsAuthenticate])

    return (
        <div>

        </div>
    )
}
