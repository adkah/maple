import NodeName from "./NodeName";
import NodeEdges from "./NodeEdges";
import AddNodeButtons from "./AddNodeButtons";
import DeleteNodeButton from "./DeleteNodeButton";

export default function NodeOptions({ selectedNode, edges, setSelectedNode }) {

    return (
      <>
        <NodeName selectedNode={selectedNode} edges={edges} />
        {/* <NodeEdges selectedNode={selectedNode} edges={edges} /> */}
        <AddNodeButtons selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
        {selectedNode.parentId && 
          <DeleteNodeButton selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
        }
      </>
    );
}
