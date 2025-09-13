import { useEffect } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';
import { initialNodes, initialEdges } from '../components/initialTree';

const STORAGE_KEY = 'maple-tree-state';

const saveTreeState = (nodes, edges) => {
  try {
    const treeState = { nodes, edges, timestamp: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(treeState));
  } catch (error) {
    console.warn('Failed to save tree state to localStorage:', error);
  }
};

const loadTreeState = () => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      return {
        nodes: parsedState.nodes || initialNodes,
        edges: parsedState.edges || initialEdges
      };
    }
  } catch (error) {
    console.warn('Failed to load tree state from localStorage:', error);
  }
  return { nodes: initialNodes, edges: initialEdges };
};

const clearTreeState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear tree state from localStorage:', error);
  }
};

export const useLocalStorage = () => {
  const savedState = loadTreeState();
  const [nodes, setNodes, onNodesChange] = useNodesState(savedState.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(savedState.edges);

  useEffect(() => {
    saveTreeState(nodes, edges);
  }, [nodes, edges]);

  const saveCurrentState = () => {
    saveTreeState(nodes, edges);
  };

  const loadState = (newNodes, newEdges) => {
    setNodes(newNodes);
    setEdges(newEdges);
    saveTreeState(newNodes, newEdges);
  };

  const resetState = (resetNodes, resetEdges) => {
    setNodes(resetNodes);
    setEdges(resetEdges);
    clearTreeState();
  };

  return {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    saveCurrentState,
    loadState,
    resetState
  };
};
