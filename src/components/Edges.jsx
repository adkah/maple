import {
  BaseEdge,
  getStraightPath,
  useNodes,
  MarkerType
} from 'reactflow';
import { useSettings } from '../contexts/SettingsContext';

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

  export function MovementEdge({ sourceX, sourceY, targetX, targetY, markerEnd}){
    const nodes = useNodes()
    const { movementStyle } = useSettings();

    function movementPath(sourceX, sourceY, targetX, targetY) {
      const minX = Math.min(sourceX, targetX);
      const maxX = Math.max(sourceX, targetX);
      const nodesInRange = nodes.filter(node => 
        node.positionAbsolute.x >= minX && node.positionAbsolute.x <= maxX
      );
      const highestYInRange = Math.max(...nodesInRange.map(node => node.positionAbsolute.y)) + 80;
      console.log("Highest Y in X range:", highestYInRange);
       
      const centerX = (sourceX + targetX) / 2;

      switch (movementStyle) {
        case 'curve':
          return `
            M ${sourceX} ${sourceY}
            Q ${sourceX} ${highestYInRange} ${centerX} ${highestYInRange}
            Q ${targetX} ${highestYInRange} ${targetX} ${targetY}
          `;
        case 'straight':
          return `
            M ${sourceX} ${sourceY}
            L ${sourceX} ${highestYInRange}
            L ${centerX} ${highestYInRange}
            L ${targetX} ${highestYInRange}
            L ${targetX} ${targetY}
          `;
        default:
          return `
            M ${sourceX} ${sourceY}
            Q ${sourceX} ${highestYInRange} ${centerX} ${highestYInRange}
            Q ${targetX} ${highestYInRange} ${targetX} ${targetY}
          `;
      }

      // 1st is source
      // 2nd is line to center of tree, tugged by right/bottom bound
      // 3rd is line to target, tugged by left/bottom bound
      // if movement line doesn't need to pass underneath the lowest point of the tree, it should pass under the lowest point 
    }

    const edgePath = movementPath(sourceX, sourceY, targetX, targetY);
    console.log(edgePath)


    return (
      <>
      <BaseEdge path={edgePath} markerEnd={markerEnd.MarkerType}/>
      </>
    )
  }