import { useReactFlow } from 'reactflow';
import useKeyboardShortcuts from '../../hooks/useKeyboardShortcuts';

export default function AddNodeButtons({ selectedNode, setSelectedNode }) {
  const { setNodes, setEdges, getNodes, getEdges, setCenter, fitView } = useReactFlow();

  const generateNewNodeId = () => {
    return (Date.now() + Math.random()).toString();
  };

  const addChild = () => {
    if (!selectedNode) return;

    const nodes = getNodes();
    const edges = getEdges().filter(e => e.type !== 'edgePreview');
    
    const newNodeId = generateNewNodeId();
    const newNode = {
      id: newNodeId,
      type: 'treeNode',
      position: { x: 0, y: 0 }, // Position will be calculated by calculateLayout
      data: { 
        label: 'XP',
        siblings: {
          left: [],
          right: []
        },
        children: []
      },
      parentId: selectedNode.id
    };

    const newEdge = {
      id: `e${selectedNode.id}-${newNodeId}`,
      source: selectedNode.id,
      target: newNodeId,
      type: 'edge'
    };

    setNodes(prevNodes => {
      // Update the parent node's children array
      const updatedNodes = prevNodes.map(node => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: {
              ...node.data,
              children: [...(node.data.children || []), newNodeId]
            },
            selected: false
          };
        }
        return { ...node, selected: false };
      });
      
      const newNodeWithSelection = { ...newNode, selected: true };
      return [...updatedNodes, newNodeWithSelection];
    });
    setEdges(prevEdges => [...prevEdges, newEdge]);
    
    // Select the newly created node for sidebar
    setSelectedNode(newNode);
    
    // Center the view on the new node (position will be calculated by layout)
    setTimeout(() => {
      setCenter(0, 80, { zoom: 1 });
    }, 100);
  };

  const addSiblingLeft = () => {
    if (!selectedNode || !selectedNode.parentId) return;

    const nodes = getNodes();
    const edges = getEdges().filter(e => e.type !== 'edgePreview');
    
    // Find parent
    const parent = nodes.find(n => n.id === selectedNode.parentId);
    if (!parent) return;

    const newNodeId = generateNewNodeId();
    const newNode = {
      id: newNodeId,
      type: 'treeNode',
      position: { x: 0, y: 0 }, // Position will be calculated by calculateLayout
      data: { 
        label: 'XP',
        siblings: {
          left: [...(selectedNode.data.siblings.left || [])],
          right: [selectedNode.id, ...(selectedNode.data.siblings.right || [])]
        },
        children: []
      },
      parentId: selectedNode.parentId
    };

    const newEdge = {
      id: `e${selectedNode.parentId}-${newNodeId}`,
      source: selectedNode.parentId,
      target: newNodeId,
      type: 'edge'
    };

    setNodes(prevNodes => {
      const updatedNodes = prevNodes.map(node => {
        if (node.id === selectedNode.parentId) {
          // Add new node to parent's children array
          const currentChildren = node.data.children || [];
          const selectedIndex = currentChildren.indexOf(selectedNode.id);
          const newChildren = [
            ...currentChildren.slice(0, selectedIndex),
            newNodeId,
            ...currentChildren.slice(selectedIndex)
          ];
          return {
            ...node,
            data: {
              ...node.data,
              children: newChildren
            }
          };
        } else if (node.id === selectedNode.id) {
          // Update selected node's siblings
          return {
            ...node,
            data: {
              ...node.data,
              siblings: {
                left: [newNodeId, ...(node.data.siblings.left || [])],
                right: node.data.siblings.right || []
              }
            },
            selected: false
          };
        } else if (node.data.siblings && node.data.siblings.right && node.data.siblings.right.includes(selectedNode.id)) {
          // Update siblings that had selectedNode in their right array
          return {
            ...node,
            data: {
              ...node.data,
              siblings: {
                ...node.data.siblings,
                right: node.data.siblings.right.map(id => id === selectedNode.id ? newNodeId : id)
              }
            }
          };
        }
        return { ...node, selected: false };
      });
      
      const newNodeWithSelection = { ...newNode, selected: true };
      return [...updatedNodes, newNodeWithSelection];
    });
    setEdges(prevEdges => [...prevEdges, newEdge]);
    
    // Select the newly created node for sidebar
    setSelectedNode(newNode);
    
    // Center the view on the new node (position will be calculated by layout)
    setTimeout(() => {
      setCenter(0, 80, { zoom: 1 });
    }, 100);
  };

  const addSiblingRight = () => {
    if (!selectedNode || !selectedNode.parentId) return;

    const nodes = getNodes();
    const edges = getEdges().filter(e => e.type !== 'edgePreview');
    
    // Find parent
    const parent = nodes.find(n => n.id === selectedNode.parentId);
    if (!parent) return;

    const newNodeId = generateNewNodeId();
    const newNode = {
      id: newNodeId,
      type: 'treeNode',
      position: { x: 0, y: 0 }, // Position will be calculated by calculateLayout
      data: { 
        label: 'XP',
        siblings: {
          left: [selectedNode.id, ...(selectedNode.data.siblings.left || [])],
          right: [...(selectedNode.data.siblings.right || [])]
        },
        children: []
      },
      parentId: selectedNode.parentId
    };

    const newEdge = {
      id: `e${selectedNode.parentId}-${newNodeId}`,
      source: selectedNode.parentId,
      target: newNodeId,
      type: 'edge'
    };

    setNodes(prevNodes => {
      const updatedNodes = prevNodes.map(node => {
        if (node.id === selectedNode.parentId) {
          // Add new node to parent's children array
          const currentChildren = node.data.children || [];
          const selectedIndex = currentChildren.indexOf(selectedNode.id);
          const newChildren = [
            ...currentChildren.slice(0, selectedIndex + 1),
            newNodeId,
            ...currentChildren.slice(selectedIndex + 1)
          ];
          return {
            ...node,
            data: {
              ...node.data,
              children: newChildren
            }
          };
        } else if (node.id === selectedNode.id) {
          // Update selected node's siblings
          return {
            ...node,
            data: {
              ...node.data,
              siblings: {
                left: node.data.siblings.left || [],
                right: [newNodeId, ...(node.data.siblings.right || [])]
              }
            },
            selected: false
          };
        } else if (node.data.siblings && node.data.siblings.left && node.data.siblings.left.includes(selectedNode.id)) {
          // Update siblings that had selectedNode in their left array
          return {
            ...node,
            data: {
              ...node.data,
              siblings: {
                ...node.data.siblings,
                left: node.data.siblings.left.map(id => id === selectedNode.id ? newNodeId : id)
              }
            }
          };
        }
        return { ...node, selected: false };
      });
      
      const newNodeWithSelection = { ...newNode, selected: true };
      return [...updatedNodes, newNodeWithSelection];
    });
    setEdges(prevEdges => [...prevEdges, newEdge]);
    
    // Select the newly created node for sidebar
    setSelectedNode(newNode);
    
    // Center the view on the new node (position will be calculated by layout)
    setTimeout(() => {
      setCenter(0, 80, { zoom: 1 });
    }, 100);
  };

  const addParent = () => {
    if (!selectedNode) return;

    const nodes = getNodes();
    const edges = getEdges().filter(e => e.type !== 'edgePreview');
    
    const newNodeId = generateNewNodeId();
    const newParentNode = {
      id: newNodeId,
      type: 'treeNode',
      position: { x: 0, y: 0 }, // Position will be calculated by calculateLayout
      data: { 
        label: 'XP',
        siblings: {
          left: [],
          right: []
        },
        children: [selectedNode.id]
      },
      parentId: selectedNode.parentId || null // Will be null if selectedNode is root
    };

    // Create edge from new parent to selected node
    const newParentToChildEdge = {
      id: `e${newNodeId}-${selectedNode.id}`,
      source: newNodeId,
      target: selectedNode.id,
      type: 'edge'
    };

    setNodes(prevNodes => {
      const updatedNodes = prevNodes.map(node => {
        if (node.id === selectedNode.id) {
          // Update the selected node to be a child of the new parent
          return { 
            ...node, 
            parentId: newNodeId,
            selected: false 
          };
        } else if (selectedNode.parentId && node.id === selectedNode.parentId) {
          // Update the old parent's children array to include the new parent instead of selectedNode
          const currentChildren = node.data.children || [];
          const updatedChildren = currentChildren.map(id => id === selectedNode.id ? newNodeId : id);
          return {
            ...node,
            data: {
              ...node.data,
              children: updatedChildren
            }
          };
        }
        return { ...node, selected: false };
      });
      
      // Add the new parent node with selection
      const newNodeWithSelection = { ...newParentNode, selected: true };
      return [...updatedNodes, newNodeWithSelection];
    });

    setEdges(prevEdges => {
      // Remove the old edge from selected node's parent (if it exists)
      const filteredEdges = prevEdges.filter(edge => 
        !(edge.target === selectedNode.id)
      );
      
      // Add the new edge from new parent to selected node
      const newEdges = [...filteredEdges, newParentToChildEdge];
      
      // If the selected node had a parent, create edge from old parent to new parent
      if (selectedNode.parentId) {
        const oldParentToNewParentEdge = {
          id: `e${selectedNode.parentId}-${newNodeId}`,
          source: selectedNode.parentId,
          target: newNodeId,
          type: 'edge'
        };
        newEdges.push(oldParentToNewParentEdge);
      }
      
      return newEdges;
    });
    
    // Select the newly created parent node for sidebar
    setSelectedNode(newParentNode);
    
    // Center the view on the new parent node (position will be calculated by layout)
    setTimeout(() => {
      setCenter(0, 0, { zoom: 1 });
    }, 100);
  };

  useKeyboardShortcuts(selectedNode, { 
    addChild, 
    addParent, 
    addSiblingLeft, 
    addSiblingRight 
  });

  return (
    <div style={{ marginTop: '1rem' }}>
      <h4>Add Nodes</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button 
          className="node-button" 
          onClick={addChild}
        >
          Add Child (<kbd>Ctrl</kbd> + <kbd>N</kbd>)
        </button>
        <button 
          className="node-button" 
          onClick={addParent}
        >
          Add Parent (<kbd>Ctrl</kbd> + <kbd>P</kbd>)
        </button>
        {selectedNode.parentId && (
          <>
            <button 
              className="node-button" 
              onClick={addSiblingLeft}
            >
              Add Sibling (Left) (<kbd>Ctrl</kbd> + <kbd>L</kbd>)
            </button>
            <button 
              className="node-button" 
              onClick={addSiblingRight}
            >
              Add Sibling (Right) (<kbd>Ctrl</kbd> + <kbd>R</kbd>)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
