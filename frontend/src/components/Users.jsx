/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button } from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/bulk?filter=`+filter, {
            headers: {
                Authorization : localStorage.getItem("authorization")
            }
        })
        .then(response => {
            setUsers(response.data.users)
        })
    }, [filter])

    return (
        <div className="mt-8 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="font-bold text-xl mb-4 text-gray-800">
                Users
            </div>
            <div className="my-4">
                <input type="text" placeholder="Search users..." className="w-full px-4 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" value={filter} onChange={(e) => setFilter(e.target.value)} />
            </div>
            <div className="space-y-2">
                {users.map((user) => <User user={user} key={user._id} />)}
            </div>
        </div>
    )
}

function User({user}){
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 cursor-pointer border-b border-gray-100 last:border-b-0">
            <div className="flex items-center gap-3 min-w-0">
                <div className="rounded-full h-10 w-10 bg-indigo-100 flex justify-center items-center border border-indigo-200 flex-shrink-0">
                    <div className="flex flex-col justify-center h-full text-lg font-semibold text-indigo-700">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full min-w-0">
                    <div className="text-xs text-gray-500 truncate">
                        @{user.username}
                    </div>
                    <div className="font-medium text-gray-800 text-base sm:text-lg truncate">
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center h-full ml-2 flex-shrink-0">
                <Button label={
                    <>
                        <span className="hidden sm:inline">Send Money</span>
                        <span className="sm:hidden">Send</span>
                    </>
                } onClick={() => {
                    navigate("/send?id="+user._id+"&name="+user.firstName+user.lastName)
                }}/>
            </div>
        </div>
    )
}