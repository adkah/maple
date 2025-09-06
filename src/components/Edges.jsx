import {
  BaseEdge,
  getStraightPath,
} from 'reactflow';

export function Edge({ sourceX, sourceY, targetX, targetY }){
    const [edgePath] = getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });
  
    return (
      <>
      <BaseEdge path={edgePath}/>
      </>
    ) 
  }