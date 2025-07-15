import { createContext, useContext, useState, useEffect } from 'react';
import { getStory } from '../api/story.js';

const StoryContext = createContext();

export const useStory = () => {
    const context = useContext(StoryContext);
    if (!context) {
        throw new Error('useStory must be used within a StoryProvider');
    }
    return context;
};

export const StoryProvider = ({ children, storyId }) => {
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStory = async () => {
            if (!storyId) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const res = await getStory(storyId);
                console.log("Story data:", res.data);
                setStory(res.data);
            } catch (err) {
                console.error("Error fetching story data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStory();
    }, [storyId]);

    const updateStory = (newStory) => {
        setStory(newStory);
    };

    const value = {
        story,
        loading,
        error,
        updateStory,
        setLoading,
        setError
    };

    return (
        <StoryContext.Provider value={value}>
            {children}
        </StoryContext.Provider>
    );
};
