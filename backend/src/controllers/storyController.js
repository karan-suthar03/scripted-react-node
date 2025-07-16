import prisma from "../config/prisma.js";
import { getStoryPathWithSQL } from "../utils/storyUtils.js";

const startTemplate = {
    title: "Start your story by writing a starting phrase or a sentence.",
    options: [
        "Once upon a time in a land far, far away...",
        "It was a bright cold day in April, and the clocks were striking thirteen.",
        "In a hole in the ground there lived a hobbit.",
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness..."
    ],
}

async function begin(req, res) {
    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({ error: "Title is required" });
    }

    const userId = req.user.id;

    try {
        // const startNode = await prisma.node.create({
        //     data: {
        //         snippet: startTemplate.title,
        //         parentNodeId: null,
        //         selectedOptionId: null,
        //     }
        // });

        // const optionData = startTemplate.options.map(option => ({
        //     snippet: option,
        //     parentNodeId: startNode.id,
        //     selectedOptionId: null
        // }));
        //
        // await prisma.node.createMany({
        //     data: optionData
        // });

        const createdStory = await prisma.story.create({
            data: {
                title: title,
                authorId: userId,
                // startNodeId: startNode.id,
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
                    id:story.id,
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
                id:story.id,
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

async function initialSnippet(req, res) {
    const {data} = req.body;

    const snippet = data.snippet;
    const storyId = data.storyId;

    try {


        const startNode = await prisma.node.create({
            data:{
                snippet: snippet,
                parentNodeId: null,
                selectedOptionId: null
            }
        });

        await prisma.story.update({
            where: { id: parseInt(storyId) },
            data: { startNodeId: startNode.id }
        })



        return res.status(200).json({
            success: true,
            message: "Initial snippet created successfully",
            data: {
                storyId: storyId,
                snippet: snippet,
                nodeId: startNode.id
            }
        });
    } catch (error) {
        console.error("Error in initialSnippet:", error);
        return res.status(500).json({
            error: "Failed to process initial snippet",
            details: error.message
        });
    }
}

async function customInitialSnippet(req,res){
    const {data} = req.body;
    console.log("Custom Initial Snippet Data:", data);
    const snippet = data.snippet;
    const storyId = data.storyId;

    const startNode = await prisma.node.create({
        data: {
            snippet: snippet,
            parentNodeId: null,
            selectedOptionId: null
        }
    });

    const optionData = startTemplate.options.map(option => ({
        snippet: option,
        parentNodeId: startNode.id,
        selectedOptionId: null
    }));

    await prisma.node.createMany({
        data: optionData
    });

    await prisma.story.update({
        where: { id: parseInt(storyId) },
        data: { startNodeId: startNode.id }
    });

    return res.status(200).json({
        success: true,
        message: "Custom initial snippet created successfully",
        data: {
            storyId: data.storyId,
            selectedNodeId: startNode.id,
            snippet: snippet
        }
    });
}

const generatedOptionsTemplate = [
    "generated option 1",
    "generated option 2",
    "generated option 3",
    "generated option 4"
]

async function generateOptions(req, res) {
    const {data} = req.body;
    const storyId = data.storyId;
    const nodeId = data.nodeId;

    let existingNodeOptions = await prisma.node.findMany({
        where: {
            parentNodeId: parseInt(nodeId)
        }
    });

    if (existingNodeOptions.length > 0) {
        existingNodeOptions = existingNodeOptions.map(option => ({
            id: option.id,
            snippet: option.snippet
        }));
        return res.status(200).json({
            success: true,
            message: "Options already exist for this node",
            data: {
                storyId: storyId,
                nodeId: nodeId,
                options: existingNodeOptions
            }
        });
    }

    const options = generatedOptionsTemplate.map(option => ({
        snippet: option,
        parentNodeId: nodeId,
        selectedOptionId: null
    }));

    try {
        let generated = await prisma.node.createManyAndReturn({
            data: options
        })

        generated = generated.map(node => ({
            id: node.id,
            snippet: node.snippet
        }));

        return res.status(200).json({
            success: true,
            message: "Options generated successfully",
            data: {
                storyId: storyId,
                nodeId: nodeId,
                options: generated
            }
        });
    } catch (error) {
        console.error("Error generating options:", error);
        return res.status(500).json({
            error: "Failed to generate options",
            details: error.message
        });
    }
}

async function selectOption(req, res) {
    const {data} = req.body;

    const parentNodeId = data.parentNodeId;
    const selectedNode = data.node;
    const storyId = data.storyId;

    await prisma.node.update({
        where:{
            id:parentNodeId
        },
        data:{
            selectedOptionId: selectedNode.id
        }
    });
    return res.status(200).json({
        success: true,
        message: "Option selected successfully",
        data: {
            storyId: storyId,
            nodeId: parentNodeId,
            selectedNode: selectedNode
        }
    });
}

export { begin, getStoryData, initialSnippet, customInitialSnippet, generateOptions, selectOption };
