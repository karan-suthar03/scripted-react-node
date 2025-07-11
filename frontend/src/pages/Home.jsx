import mainPhoto from '../assets/mainPhoto.png';
import pencil from '../assets/599887.svg';
import {useState} from "react";
import { beginStory } from '../api/story.js';
import {useNavigate} from "react-router-dom";

function Home() {
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleBeginStory = async () => {
        if (!title.trim()) {
            setError("Please enter a title for your story");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const result = await beginStory(title);
            console.log("Story created:", result);
            navigate('/story/?id=' + result.storyId);
        } catch (err) {
            console.error("Error creating story:", err);
            setError("Failed to create story. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className="flex flex-col items-center min-h-screen max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex w-full bg-[#FEFCF9] mt-16">
            <div className="flex-6 flex flex-col items-center justify-center">
                <h1 className="text-6xl font-semibold text-gray-800">
                    Every world begin with a title.
                </h1>
                <p className="text-2xl text-gray-600 mt-4">
                    Write a title. We'll write the story and paint it too.
                </p>
                <div className="w-full">
                    <input className="mt-4 p-2 w-full border border-[#FDB37A] rounded-lg focus:outline-none focus:ring-1 max-w-sm focus:ring-[#FDB37A] bg-[#FDF5F1] placeholder:italic"
                        placeholder={"e.g. The Adventures of Tom Sawyer"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={isLoading} />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <button
                        className="mt-4 bg-[#FDD0C5] py-2 px-4 rounded-lg hover:bg-[#e3bdb3] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleBeginStory}
                        disabled={isLoading}>
                        {isLoading ? "Creating Story..." : "Begin the Tale"}
                    </button>
                </div>
            </div>
            <div className='flex-5 flex items-center justify-center'>
                <img src={mainPhoto+""} alt="Logo" className="h-80 w-80 object-cover" />
            </div>
        </div>
        <div className="flex flex-col items-center">
            <h1 className="text-4xl font-semibold text-gray-800 mt-16">
                How it works
            </h1>
            <div className="grid grid-cols-3 gap-8 mt-8 w-full max-w-4xl mx-auto">
                <div className="flex flex-col items-center p-6">
                    <img src={pencil+""} alt="Step 1" className="h-16 w-16 mb-4" />
                    <h2 className="text-xl font-semibold text-center">Write a Title</h2>
                </div>
                <div className="flex flex-col items-center p-6">
                    <img src={pencil+""} alt="Step 2" className="h-16 w-16 mb-4" />
                    <h2 className="text-xl font-semibold text-center">Generate Story</h2>
                </div>
                <div className="flex flex-col items-center p-6">
                    <img src={pencil+""} alt="Step 3" className="h-16 w-16 mb-4" />
                    <h2 className="text-xl font-semibold text-center">Enjoy Your Tale</h2>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Home;