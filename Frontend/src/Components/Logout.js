import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";

const Logout = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedIn');
        toast.success("Logging out!");
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };



    return (
        <div>
            <button
                onClick={handleLogout}
                className="text-black flex items-center p-1 gap-3 hover:bg-black hover:bg-opacity-25 hover:rounded-md hover:w-full"
            >
                <FiLogOut />
                Log Out
            </button>
        </div>
    )
}

export default Logout
