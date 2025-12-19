import { useEffect, useState } from "react"
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

export const Appbar = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

     useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`, {
            headers : {
                Authorization : localStorage.getItem("authorization")
            }
        }).then(response => {
            setUsername(response.data.userData.firstName);
        })
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("authorization");
        localStorage.removeItem("userId")
        navigate('/signup')
    }
    

    return <div className="shadow-md h-16 flex justify-between bg-white items-center px-4 sm:px-6 sticky top-0 z-50">
        <div className="flex flex-col justify-center h-full text-xl font-bold text-indigo-600">
            PayTM App
        </div>
        <div className="flex items-center">
            <div className="flex flex-col justify-center h-full mr-4 text-gray-600 font-medium hidden sm:block">
                Hello
            </div>
            <div className="rounded-full h-10 px-4 bg-indigo-100 flex justify-center items-center border border-indigo-200">
                <div className="flex flex-col justify-center h-full text-lg font-semibold text-indigo-700">
                    {username}
                </div>
            </div>
            <button 
                onClick={handleLogout}
                className="ml-4 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Logout
            </button>
        </div>
    </div>
}