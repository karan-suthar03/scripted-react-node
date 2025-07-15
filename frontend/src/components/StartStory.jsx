import {useState} from "react";
import PathCard from "./PathCard.jsx";
import {customInitialSnippet, initialSnippet} from "../api/story.js";
import {useStory} from "../contexts/StoryContext.jsx";

export function StartStory() {
    const [pathCardLoading, setPathCardLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const { story, updateStory } = useStory();

    console.log("story:", story);

    async function handleCustomInput() {
        if (!inputValue) return;
        if (inputValue.trim() === "")return;
        if (pathCardLoading) return;
        setPathCardLoading(true);
        let data = {
            storyId: story.id,
            snippet: inputValue,
        }
        console.log("data:", data);
        let response = await customInitialSnippet(data);
        console.log('Response:', response);
        setInputValue("");
        setPathCardLoading(false);
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
                Start your story by writing a starting phrase or a sentence.
            </h1>
            <div className="flex items-center mt-8 justify-center gap-6">
                <input
                    placeholder={pathCardLoading ? "Loading..." : "write a starting phrase or a sentence"}
                    disabled={pathCardLoading}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className={`mt-4 p-2 w-full border border-[#FDB37A] rounded-lg focus:outline-none focus:ring-1 max-w-sm focus:ring-[#FDB37A] bg-[#FDF5F1] placeholder:italic transition-all ${pathCardLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <button
                    disabled={pathCardLoading}
                    onClick={() => handleCustomInput()}
                    className={`mt-4 py-2 px-4 rounded-lg transition-all ${pathCardLoading ? 'bg-gray-300 cursor-not-allowed opacity-50' : 'bg-[#FDD0C5] hover:bg-[#e3bdb3] cursor-pointer'}`}
                >
                    {pathCardLoading ? 'Loading...' : 'Continue'}
                </button>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-8 w-full max-w-4xl mx-auto">
                {(() => {
                    // if (node && node[0].options) {
                    //     return node[0].options.map((option) => (
                    //         <PathCard key={option.id} option={option} pathCardLoading={pathCardLoading}
                    //                   setPathCardLoading={setPathCardLoading}
                    //                   parentNodeId={node[0].id}
                    //         />
                    //     ));
                    // }
                    return options.map((option) => (
                        <StartPathCard option={option} pathCardLoading={pathCardLoading}
                                  setPathCardLoading={setPathCardLoading}/>
                    ));
                })()}
            </div>
        </div>
    )
}

function StartPathCard({option,pathCardLoading,setPathCardLoading}){
    const [loading, setLoading] = useState(false);
    const { story, updateStory } = useStory();

    async function handleClick(){
        if (pathCardLoading) return;
        setPathCardLoading(true);
        setLoading(true);
        let response = await initialSnippet(
            {
                snippet: option,
                storyId: story.id
            }
        );
        console.log('Response:', response);
        setPathCardLoading(false);
        setLoading(false);
    }

    return <div
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
            {typeof option === 'object' ? option.snippet : option}
        </h2>
    </div>
}