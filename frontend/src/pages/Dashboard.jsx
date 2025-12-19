import axios from "axios"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`, {
            headers : {
                Authorization : localStorage.getItem("authorization")
            }
        }).then(response => {
            if(!response.data.flag){
                navigate("/signup")
            }
        })
    }, [])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/account/balance`, {
        headers : {
            Authorization : localStorage.getItem("authorization")
        }
       }).then(response => setBalance(response.data.balance))
    }, [])
    

    return <div className="min-h-screen bg-slate-50">
        <Appbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Balance value={Number(balance).toFixed(2)} />
            <Users />
        </div>
    </div>
}