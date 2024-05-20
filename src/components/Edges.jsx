import {
  BaseEdge,
  getStraightPath,
  useNodes,
  EdgeLabelRenderer,
  useReactFlow,
  getSmoothStepPath,
  getBezierPath,
} from 'reactflow';

export function Edge({ target, source, id, sourceX, sourceY, targetX, targetY }){
    const { setEdges, setNodes } = useReactFlow();
    const nodes = useNodes();
    const [edgePath, labelX, labelY] = getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });
  
    // Recursive function to delete node and all children
    const deleteNodesAndChildren = (currentSource) => {
      console.log(nodes)
      console.log(currentSource)
      for (let i=0; i < nodes.length; i++){
        console.log(nodes[i])
        if (nodes[i].parentId == currentSource){
          deleteNodesAndChildren(nodes[i])
        } 
      }
      return
    }
  
    const onEdgeClick = () => {
      const childrenToDelete = deleteNodesAndChildren(source)
  
      setNodes((nodes) => nodes.filter((node) => node.id !== target));
      setEdges((edges) => edges.filter((edge) => edge.id !== id));
    };
  
    return (
      <>
      <BaseEdge path={edgePath}/>
      { false && <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 12,
              // everything inside EdgeLabelRenderer has no pointer events by default
              // if you have an interactive element, set pointer-events: all
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            <button className="edgebutton" onClick={onEdgeClick}>
            -
            </button>
          </div>
        </EdgeLabelRenderer>}
      </>
    ) 
  }

export function EdgePreview({ sourceX, sourceY, targetX, targetY }){
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  return (
    <BaseEdge path={edgePath}/>
  )
}