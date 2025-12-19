export function Button({label, onClick}){ 
    return(
        <button onClick={onClick} className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-2.5 me-2 mb-2 transition-colors duration-200">{label}</button>
    )
}