import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { BottomWarning } from "../components/BottomWarning";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function Signup(){
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [toast, setToast] = useState({ show: false, message: "", type: "error" });
    const navigate = useNavigate();

    const showToast = (message, type = "error") => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
        }, 3000);
    };

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`, {
            headers : {
                Authorization : localStorage.getItem("authorization")
            }
        }).then(response => {
            if(response.data.flag){
                navigate("/dashboard")
            }
        })
    }, [])

    const handleClick = async () => {
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`, {  
            firstName : fName,
            lastName : lName,
            username : username,
            password : password
            });

            const authToken = response.data.token;
            localStorage.setItem("authorization", authToken)

            navigate('/dashboard');
            
        } catch (err) {
            console.log(err);
            showToast(err.response?.data?.msg || "Signup failed", "error");
        }
    }

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 h-screen flex justify-center items-center relative">
            <div className={`fixed top-10 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl text-white font-medium transition-all duration-500 ease-in-out z-50 ${
                toast.show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
            } ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
                {toast.message}
            </div>
        <div className="flex flex-col justify-center w-full max-w-md px-4">
      <div className="rounded-2xl bg-white w-full text-center p-6 h-max px-8 shadow-2xl">
        <Heading label="Sign Up" />
        <SubHeading label="Create your account" />
        <InputBox type="text" label="First Name" placeholder="Enter your first name" value={fName} onChange={(e) => setFName(e.target.value)} />
        <InputBox type="text" label="Last Name" placeholder="Enter your last name" value={lName} onChange={(e) => setLName(e.target.value)}/>
        <InputBox type="email" label="Username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <InputBox type="password" label="Password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <div className="pt-4">
            <Button label="Sign Up" onClick={handleClick} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
        </div>
        </div>
    )
}