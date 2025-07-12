import prisma from "../config/prisma.js";

// Get story path using raw PostgreSQL recursive CTE
export async function getStoryPathWithSQL(startNodeId) {
    const result = await prisma.$queryRaw`
        WITH RECURSIVE story_path AS (
            -- Base case: start with the start node
            SELECT 
                id,
                snippet,
                selected_option_id,
                1 as path_order
            FROM nodes 
            WHERE id = ${startNodeId}
            
            UNION ALL
            
            -- Recursive case: follow selected options
            SELECT 
                n.id,
                n.snippet,
                n.selected_option_id,
                sp.path_order + 1
            FROM nodes n
            INNER JOIN story_path sp ON n.id = sp.selected_option_id
        ),
        -- Get options for all nodes in the path
        node_options AS (
            SELECT 
                sp.id as node_id,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', opt.id,
                            'snippet', opt.snippet
                        ) ORDER BY opt.id
                    ) FILTER (WHERE opt.id IS NOT NULL),
                    '[]'::json
                ) as options
            FROM story_path sp
            LEFT JOIN nodes opt ON opt.parent_node_id = sp.id
            GROUP BY sp.id
        )
        SELECT 
            sp.id,
            sp.snippet,
            sp.selected_option_id,
            sp.path_order,
            no.options,
            CASE 
                WHEN sp.selected_option_id IS NULL AND (no.options IS NULL OR json_array_length(no.options) = 0) 
                THEN true 
                ELSE false 
            END as is_story_end
        FROM story_path sp
        LEFT JOIN node_options no ON sp.id = no.node_id
        ORDER BY sp.path_order;
    `;
    
    // Cast result to array for TypeScript
    const nodes = Array.isArray(result) ? result : [];
    
    return nodes.map(node => {
        const nodeData = {
            id: Number(node.id),
            snippet: node.snippet
        };

        // Add options for all nodes
        if (node.options && Array.isArray(node.options)) {
            nodeData.options = node.options.map(opt => ({
                id: Number(opt.id),
                snippet: opt.snippet
            }));
        } else {
            nodeData.options = [];
        }

        // Mark story end if this is the last node with no options
        if (node.selected_option_id === null && nodeData.options.length === 0) {
            nodeData.isStoryEnd = true;
        }

        return nodeData;
    });
}
