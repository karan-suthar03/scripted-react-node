import prisma from "../config/prisma.js";
import { getStoryPathWithSQL } from "../utils/storyUtils.js";

async function begin(req, res) {
    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({ error: "Title is required" });
    }

    const userId = req.user.id;

    try {
        const createdStory = await prisma.story.create({
            data: {
                title: title,
                authorId: userId
            }
        });

        return res.status(200).json({
            success: true,
            message: "Story initialized successfully",
            data: {
                storyId: createdStory.id,
                title: createdStory.title
            }
        });
    } catch (error) {
        console.error("Error initializing story:", error);
        
        return res.status(500).json({ 
            error: "Failed to create story",
            details: error.message 
        });
    }
}

async function getStoryData(req, res) {
    const {storyId} = req.params;

    if (!storyId) {
        return res.status(400).json({error: "Story ID is required"});
    }

    try {
        // Get basic story info
        const story = await prisma.story.findUnique({
            where: {
                id: parseInt(storyId)
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        if (!story) {
            return res.status(404).json({error: "Story not found"});
        }

        if (!story.startNodeId) {
            return res.status(200).json({
                success: true,
                data: {
                    title: story.title,
                    description: story.description,
                    author: story.author,
                    nodes: []
                }
            });
        }

        // Get the complete story path using recursive CTE
        const nodes = await getStoryPathWithSQL(story.startNodeId);

        return res.status(200).json({
            success: true,
            data: {
                title: story.title,
                description: story.description,
                author: story.author,
                nodes: nodes
            }
        });
    } catch (error) {
        console.error("Error fetching story:", error);

        return res.status(500).json({
            error: "Failed to fetch story data",
            details: error.message
        });
    }
}

export { begin, getStoryData };
