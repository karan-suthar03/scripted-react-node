import {useNavigate, useSearchParams} from 'react-router-dom';
import Options from "../components/Options.jsx";
import Node from "../components/Node.jsx";
import {useEffect} from "react";
import {StartStory} from "../components/StartStory.jsx";
import {StoryProvider, useStory} from "../contexts/StoryContext.jsx";

function StoryContent() {
    const navigate = useNavigate();
    const { story, loading, error } = useStory();

    useEffect(() => {
        if (error) {
            console.error("Error fetching story data:", error);
            navigate('/');
        }
    }, [error, navigate]);

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
                            {story?.title}
                        </h1>
                    </div>
                    <div className="w-full">
                        {story.nodes.length === 0 ? (
                            <Node>
                                <StartStory />
                            </Node>
                            )
                            :(
                            story.nodes.map((node, index) => (
                                <Node key={index}>
                                    {index === story.nodes.length - 1 ? (
                                        <Options node={node} />
                                    ) : (
                                        <h1 className="text-4xl font-semibold text-gray-800">
                                            {node.snippet}
                                        </h1>
                                    )}
                                </Node>
                            ))
                            )}

                        {/*{*/}
                        {/*    story?.nodes && story.nodes.length > 1 ? (*/}
                        {/*        <>*/}
                        {/*            {story.nodes.slice(0, -1).map((node, index) => (*/}
                        {/*                <Node key={index}>*/}
                        {/*                    <h1 className="text-4xl font-semibold text-gray-800">*/}
                        {/*                        {node.snippet}*/}
                        {/*                    </h1>*/}
                        {/*                </Node>*/}
                        {/*            ))}*/}

                        {/*            <Node>*/}
                        {/*                <Options node={story.nodes[story.nodes.length - 1]} />*/}
                        {/*            </Node>*/}
                        {/*        </>*/}
                        {/*    ) : (*/}
                        {/*        <Node>*/}
                        {/*            <StartStory node={story?.nodes} />*/}
                        {/*        </Node>*/}
                        {/*    )*/}
                        {/*}*/}
                    </div>
                </>
            )}
        </div>
    );
}

function Story() {
    const [searchParams] = useSearchParams();
    const storyId = searchParams.get('id');

    return (
        <StoryProvider storyId={storyId}>
            <StoryContent />
        </StoryProvider>
    );
}


export default Story;