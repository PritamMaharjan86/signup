import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import AutoLogOff from '../Components/AutoLogOff';
import ProfileManager from '../Components/ProfileManager';

function Home({email}) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className={`min-h-screen flex flex-col items-start justify-start p-2 ${isOpen ? 'fixed inset-0  z-40 transition-opacity duration-300 bg-black bg-opacity-40' : 'bg-white'}`}>
            <div className={`flex flex-row justify-center items-center`}>

                <button onClick={toggleDropdown} >
                    <img
                        className='w-12 h-12 rounded-full'
                        src='https://res.cloudinary.com/dedpvue13/image/upload/v1753342651/avatar_s3hqft.avif'
                        alt='Avatar'
                    />
                </button>

            </div>


            <ProfileManager isOpen={isOpen} toggleDropdown={toggleDropdown} email={email} />

            <AutoLogOff />
            <ToastContainer />
        </div>
    );
}

export default Home;
