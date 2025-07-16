import {useState} from "react";
import { useStory } from '../contexts/StoryContext.jsx';
import {selectOption} from "../api/story.js";

function PathCard({option,pathCardLoading,setPathCardLoading,parentNodeId}) {
    const [loading, setLoading] = useState(false);
    const { story, updateStory } = useStory();

    async function handleClick(){
        if (pathCardLoading) return;
        setPathCardLoading(true);
        setLoading(true);
        let response = await selectOption(
            {
                parentNodeId:parentNodeId,
                node: option,
                storyId: story?.id
            }
        );
        console.log('Response:', response);
        let nextNode = response.selectedNode;
        nextNode.options = [];
        updateStory({
            ...story,
            nodes: [...story.nodes, nextNode]
        });
        setPathCardLoading(false);
        setLoading(false);
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
                {typeof option === 'object' ? option.snippet : option}
            </h2>
        </div>
    )
}

export default PathCard;