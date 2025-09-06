import { useReactFlow } from 'reactflow';
import useKeyboardShortcuts from '../../hooks/useKeyboardShortcuts';

export default function DeleteNodeButton({ selectedNode, setSelectedNode }) {
  const { deleteElements, getNodes, setNodes, getEdges, setEdges } = useReactFlow();

  const deleteNode = async () => {
    if (!selectedNode) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the node "${selectedNode.data.label}"? This will also delete all its children.`
    );
    
    if (!confirmDelete) return;

    try {
      const nodes = getNodes();
      const edges = getEdges();
      
      const nodesToDelete = new Set([selectedNode.id]);
      const findDescendants = (nodeId) => {
        const children = nodes.find(n => n.id === nodeId)?.data?.children || [];
        children.forEach(childId => {
          nodesToDelete.add(childId);
          findDescendants(childId);
        });
      };
      findDescendants(selectedNode.id);

      const updatedNodes = nodes
        .filter(node => !nodesToDelete.has(node.id))
        .map(node => {
          const updatedSiblings = {
            left: (node.data.siblings?.left || []).filter(id => !nodesToDelete.has(id)),
            right: (node.data.siblings?.right || []).filter(id => !nodesToDelete.has(id))
          };

          const updatedChildren = (node.data.children || []).filter(id => !nodesToDelete.has(id));

          return {
            ...node,
            data: {
              ...node.data,
              siblings: updatedSiblings,
              children: updatedChildren
            }
          };
        });

      const updatedEdges = edges.filter(edge => 
        !nodesToDelete.has(edge.source) && !nodesToDelete.has(edge.target)
      );

      setNodes(updatedNodes);
      setEdges(updatedEdges);
      setSelectedNode(null);

    } catch (error) {
      console.error('Error deleting node:', error);
    }
  };

  useKeyboardShortcuts(selectedNode, { deleteNode });

  return (
    <div style={{ marginTop: '1rem' }}>
      <button 
        className="node-button delete-node-button" 
        onClick={deleteNode}
      >
        Delete Node (<kbd>Ctrl</kbd> + <kbd>D</kbd>)
      </button>
    </div>
  );
}
