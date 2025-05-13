import NodeName from "./NodeName";
import NodeEdges from "./NodeEdges";

export default function NodeOptions({ selectedNode, edges }) {
    return (
      <>
        <NodeName selectedNode={selectedNode} edges={edges} />
        <NodeEdges selectedNode={selectedNode} edges={edges} />
      </>
    );
}
