import {useNavigate, useSearchParams} from 'react-router-dom';
import Options from "../components/Options.jsx";
import Node from "../components/Node.jsx";
import {useEffect, useState} from "react";
import {getStory} from "../api/story.js";
import {StartStory} from "../component/StartStory.jsx";


function Story() {
    const [searchParams] = useSearchParams();
    const storyId = searchParams.get('id');
    const navigate = useNavigate();
    
    const [story, setStory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getStory(storyId);
                console.log("Story data:", res.data);
                setStory(res.data);
            } catch (err) {
                console.error("Error fetching story data:", err);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchData().then(() => {});
    }, [storyId, navigate]);

    return (
        <div className="flex flex-col items-center min-h-screen max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">


            {loading ? (
                <div className="flex flex-col items-center justify-center w-full py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-800 mb-4"></div>
                    <p className="text-lg text-gray-600">Loading your story...</p>
                </div>
            ) : (
                <>
                    <div className="flex w-full bg-[#FEFCF9] mt-16 mb-12">
                        <h1 className="text-6xl font-semibold text-gray-800">
                            {story.title}
                        </h1>
                    </div>
                    <div className="w-full">
                        {
                            story.nodes && story.nodes.length > 1 ? (
                                story.nodes.map((node, index) => (
                                    <Node>
                                        <Options key={node.id} node={node} />
                                    </Node>
                                ))
                            ) : (
                                <Node>
                                    <StartStory node={story.nodes} />
                                </Node>
                            )
                        }
                        {/*<Node>*/}
                        {/*    <Options />*/}
                        {/*</Node>*/}
                    </div>
                </>
            )}
        </div>
    );
}



export default Story;