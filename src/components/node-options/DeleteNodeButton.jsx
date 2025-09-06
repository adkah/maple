import { useReactFlow } from 'reactflow';

export default function DeleteNodeButton({ selectedNode, setSelectedNode }) {
  const { deleteElements } = useReactFlow();

  const deleteNode = async () => {
    if (!selectedNode) return;

    // Confirm deletion
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the node "${selectedNode.data.label}"? This will also delete all its children.`
    );
    
    if (!confirmDelete) return;

    try {
      // Use React Flow's built-in deleteElements function
      // It automatically handles deleting connected edges and child nodes
      const result = await deleteElements({
        nodes: [{ id: selectedNode.id }]
      });

      // Clear selection since the selected node is being deleted
      setSelectedNode(null);

      return result;
    } catch (error) {
      console.error('Error deleting node:', error);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <button 
        className="node-button delete-node-button" 
        onClick={deleteNode}
      >
        Delete Node
      </button>
    </div>
  );
}
