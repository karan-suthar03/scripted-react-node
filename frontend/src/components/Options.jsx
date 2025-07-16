import PathCard from "./PathCard.jsx";
import {useEffect, useState} from "react";
import {useStory} from "../contexts/StoryContext.jsx";
import {generateOptions} from "../api/story.js";

function Options({node}) {
    const [pathCardLoading, setPathCardLoading] = useState(false);
    const [generating,setGenerating] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const { story, updateStory } = useStory();
    console.log("node:", node);


    useEffect(() => {
        async function fetchResponse(){
            if (node.options.length !==0){
                setGenerating(false);
                return;
            }

            const data = {
                storyId: story.id,
                nodeId: node.id
            }

            const response = await generateOptions(data);
            console.log('Response:', response);
            node.options = response.options;
            setGenerating(false);
            updateStory(story);
        }
        fetchResponse();
    },[node, story, updateStory]);
    
    

    async function handleCustomInput() {
        if (!inputValue) return;
        if (inputValue.trim() === "")return;
        if (pathCardLoading) return;
        setPathCardLoading(true);
        let data = {
            storyId: story?.id,
            nodeId: node ? node.id : null,
            snippet: inputValue,
        }
        console.log("data:", data);
        // let response = await customInput(data);
        // console.log('Response:', response);
        setInputValue("");
        setPathCardLoading(false);
    }

    return <>
        <h1 className="text-4xl font-semibold text-gray-800">
            {node.snippet}
        </h1>
        <div className="grid grid-cols-2 gap-8 mt-8 w-full max-w-4xl mx-auto">
            {(() => {
                if (generating) {
                    return Array.from({length: 4}, (_, i) => (
                       <PathCardGenerating/>
                    ))
                }
                if (node.options) {
                    return node.options.map((option) => (
                        <PathCard key={option.id} option={option} pathCardLoading={pathCardLoading}
                                  setPathCardLoading={setPathCardLoading}
                                  parentNodeId={node.id}
                        />
                    ));
                }
                return null;
            })()}
        </div>
        <div className="flex items-center mt-8 justify-center gap-6">
            <input
                placeholder={pathCardLoading ? "Loading..." : "Write your own"}
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
    </>;
}

function PathCardGenerating(){
    return <div
        className={`relative flex flex-col p-6 rounded-lg transition-all duration-300 text-gray-600 overflow-hidden border-[#FDB37A] focus:ring-[#FDB37A] border`}
        style={{
            background: 'linear-gradient(45deg, #FDF5F1, #FEF3EC, #FDD0C5, #FEF3EC, #FDF5F1)',
            backgroundSize: '400% 400%',
            animation: 'gradientBackground 3s ease-in-out infinite'
        }}
        >
        <h2 className={`text-xl font-semibold break-words line-clamp-2 select-none transition-all duration-300 text-gray-800`}>
            Generating...
        </h2>
    </div>
}

export default Options;