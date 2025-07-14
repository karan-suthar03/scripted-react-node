import {useState} from "react";

function PathCard({option,pathCardLoading,setPathCardLoading}) {
    const [loading, setLoading] = useState(false);

    function handleClick(){
        if (pathCardLoading) return;
        setPathCardLoading(true);
        setLoading(true);
        setTimeout(() => {
            setPathCardLoading(false);
            setLoading(false);
            console.log(`Option clicked: ${option}`);
        }, 10000);
    }

    return (
        <div 
        onClick={handleClick}
        className={`relative flex flex-col p-6 rounded-lg transition-all duration-300 text-gray-600 overflow-hidden border-[#FDB37A] focus:ring-[#FDB37A] border ${!pathCardLoading 
            ? "bg-[#FDF5F1] cursor-pointer hover:shadow-lg hover:bg-[#FDD0C5] hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FDB37A]" 
            : pathCardLoading && !loading 
                ? "bg-[#FDF5F1] opacity-50 border" 
                : ""
        }`}
        style={loading ? {
            background: 'linear-gradient(45deg, #FDF5F1, #FEF3EC, #FDD0C5, #FEF3EC, #FDF5F1)',
            backgroundSize: '400% 400%',
            animation: 'gradientBackground 3s ease-in-out infinite'
        } : {}}>
            <h2 className={`text-xl font-semibold break-words line-clamp-2 select-none transition-all duration-300 ${loading ? "text-gray-800" : "text-gray-600"}`}>
                {option}
            </h2>
        </div>
    )
}

export default PathCard;