import { useState } from "react";

type ChoiceProps = {
    choice: string;
};

export function Choice({ choice }: ChoiceProps) {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <div onClick={handleClick} className={`mx-10 h-10 w-fit pr-5 font-medium rounded-full pl-5 pt-2 cursor-pointer ${
                isClicked ? "bg-gray-200" : "bg-blue-50 hover:bg-gray-200"
            }`}
        >
            {choice}
        </div>
    );
}
