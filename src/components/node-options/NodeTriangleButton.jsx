import { useReactFlow } from 'reactflow';
import useKeyboardShortcuts from '../../hooks/useKeyboardShortcuts';

export default function NodeTriangleButton({ selectedNode, setSelectedNode }) {
    const { setNodes, setEdges, getNodes, getEdges, setCenter, fitView } = useReactFlow();

    const convertToTriangle = () => {
        if (!selectedNode) return;

        const nodes = getNodes();
        const edges = getEdges();
        
        const updatedNodes = nodes.map(node => {
            if (node.id === selectedNode.id) {
                return { ...node, type: 'triangleNode' };
            }
            return node;
        });

        const triangleEdges = [];
        
        const connectedEdges = edges.filter(edge => 
            edge.source === selectedNode.id || edge.target === selectedNode.id
        );

        const filteredEdges = edges.filter(edge => 
            edge.source !== selectedNode.id && edge.target !== selectedNode.id
        );

        if (selectedNode.parentId) {
            const sourceToLeft = {
                id: `e${selectedNode.parentId}-${selectedNode.id}triangle-left`,
                source: selectedNode.parentId,
                target: selectedNode.id,
                targetHandle: selectedNode.id + 'lefttriangle',
                type: 'edge'
            };
            
            const sourceToRight = {
                id: `e${selectedNode.parentId}-${selectedNode.id}triangle-right`,
                source: selectedNode.parentId,
                target: selectedNode.id,
                targetHandle: selectedNode.id + 'righttriangle',
                type: 'edge'
            };
            
            const leftToRight = {
                id: `e${selectedNode.parentId}-${selectedNode.id}triangle-middle`,
                source: selectedNode.id,
                target: selectedNode.id,
                sourceHandle: selectedNode.id + 'lefttrianglesource',
                targetHandle: selectedNode.id + 'righttriangle',
                type: 'edge'
            };
            
            triangleEdges.push(sourceToLeft, sourceToRight, leftToRight);
        }

        console.log(updatedNodes);
        
        setNodes(updatedNodes);
        setEdges([...filteredEdges, ...triangleEdges]);
    }

    useKeyboardShortcuts(selectedNode, { convertToTriangle });

    return (
        <div style={{ marginTop: '1rem' }}>
            <button className="node-button modify-node-button" onClick={convertToTriangle}>
                Convert to △ (<kbd>Ctrl</kbd> + <kbd>T</kbd>)
            </button>
        </div>
    )
}