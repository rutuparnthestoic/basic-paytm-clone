import { useState } from "react"
import { useSearchParams } from "react-router-dom";
import axios from 'axios';

export function SendMoney(){
    const [amount, setAmount] = useState(0);
    const [searchParams] = useSearchParams();
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    const id = searchParams.get("id");
    const name = searchParams.get("name");

    const showToast = (message, type) => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
        }, 3000);
    };
 

    const handleTransfer = async () => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/account/transfer`, {
            to : id,
            amount : amount
        }, {
           headers : {
            Authorization : localStorage.getItem("authorization")
           }
        });
        showToast(response.data.msg, "success");
        } catch (err) {
            console.log(err)
            showToast(err.response?.data?.msg || "Transfer failed", "error");
        }
        
    }
 
    return (
        <div className="flex justify-center h-screen bg-slate-50 items-center relative">
            <div className={`fixed top-10 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl text-white font-medium transition-all duration-500 ease-in-out z-50 ${
                toast.show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
            } ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
                {toast.message}
            </div>
        <div className="h-full flex flex-col justify-center w-full max-w-md px-4">
            <div
                className="border h-min text-card-foreground w-full p-4 space-y-8 bg-white shadow-xl rounded-2xl transition-all hover:shadow-2xl"
            >
                <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">Send Money</h2>
                </div>
                <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center shadow-md">
                    <span className="text-2xl text-white font-bold">{name[0].toUpperCase()}</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800">{name}</h3> 
                </div>
                <div className="space-y-4">
                    <div className ="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
                        htmlFor="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        type="number"
                        min="0"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                        id="amount"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === '-' || e.key === 'e') {
                                e.preventDefault();
                            }
                        }}
                    />
                    </div>
                    <button onClick={handleTransfer} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
                        Initiate Transfer
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>

)
}