import {useState} from "react";
import PathCard from "./PathCard.jsx";

export function StartStory({node}) {
    const [pathCardLoading, setPathCardLoading] = useState(false);
    console.log("node:", node);

    function handleCustomInput(option) {
        if (pathCardLoading) return;
        setPathCardLoading(true);
        setTimeout(() => {
            setPathCardLoading(false);
            console.log(`Option clicked: ${option}`);
        }, 10000);
    }

    const options = [
        "Once upon a time in a land far, far away...",
        "It was a bright cold day in April, and the clocks were striking thirteen.",
        "In a hole in the ground there lived a hobbit.",
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness..."
    ];

    return (
        <div>
            <h1 className="text-4xl font-semibold text-gray-800">
                {node ? node[0].snippet : "Start your story by writing a starting phrase or a sentence."}
            </h1>
            <div className="flex items-center mt-8 justify-center gap-6">
                <input
                    placeholder={pathCardLoading ? "Loading..." : "write a starting phrase or a sentence"}
                    disabled={pathCardLoading}
                    className={`mt-4 p-2 w-full border border-[#FDB37A] rounded-lg focus:outline-none focus:ring-1 max-w-sm focus:ring-[#FDB37A] bg-[#FDF5F1] placeholder:italic transition-all ${pathCardLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <button
                    disabled={pathCardLoading}
                    onClick={() => handleCustomInput("Custom input")}
                    className={`mt-4 py-2 px-4 rounded-lg transition-all ${pathCardLoading ? 'bg-gray-300 cursor-not-allowed opacity-50' : 'bg-[#FDD0C5] hover:bg-[#e3bdb3] cursor-pointer'}`}
                >
                    {pathCardLoading ? 'Loading...' : 'Continue'}
                </button>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-8 w-full max-w-4xl mx-auto">
                {(() => {
                    if (node && node.options) {
                        return node.options.map((option, index) => (
                            <PathCard key={index} option={option} pathCardLoading={pathCardLoading}
                                      setPathCardLoading={setPathCardLoading}/>
                        ));
                    }
                    return options.map((option, index) => (
                        <PathCard key={index} option={option} pathCardLoading={pathCardLoading}
                                  setPathCardLoading={setPathCardLoading}/>
                    ));
                })()}
            </div>
        </div>
    )
}