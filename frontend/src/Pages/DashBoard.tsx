import { useNavigate } from "react-router-dom";

export function DashBoard() {
    const navigate = useNavigate();
    
    function toViewer() {
        navigate('/viewer');
    }
    
    function toCreator() {
        navigate('/creator');
    }

    const text = "Who are you ?";

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-indigo-900 to-black">
            <style>
                {`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.5s forwards;
                }
                `}
            </style>
            <div className="relative">
                <div className="mb-20 text-white text-9xl font-semibold font-serif ">
                    Clip Bud 
                </div>
                <div className="flex justify-center w-full font-light text-5xl font-sans text-white mb-16">
                    {text.split("").map((char, index) => (
                        <span
                            key={index}
                            className="inline-block opacity-0 animate-fadeIn"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </div>
                <div className="flex absolute ml-16 hover:text-2xl mb-28">
                    <div onClick={toViewer} className="mr-4 hover:mr-0 w-32 h-16 bg-teal-500 rounded-full text-center cursor-pointer transition-all duration-300 ease-in-out transform hover:bg-teal-300 hover:h-20 hover:w-36 hover:shadow-2xl hover:shadow-teal-500/70">
                        <div className="text-xl items-center h-16 mt-4 hover:mt-6 transition-all duration-300 ease-in-out font-medium ">
                            Viewer
                        </div>
                    </div>
                    <div className="w-40"></div>
                    <div onClick={toCreator} className="w-32 h-16 bg-teal-500 rounded-full text-center cursor-pointer transition-all duration-300 ease-in-out transform hover:bg-teal-300 hover:h-20 hover:w-36 hover:shadow-2xl hover:shadow-teal-500/70 ">
                        <div className="text-xl items-center h-16 mt-4 hover:mt-6 transition-all duration-300 ease-in-out font-medium ">
                            Creator 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
