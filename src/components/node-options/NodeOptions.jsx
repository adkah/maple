import NodeName from "./NodeName";
import NodeEdges from "./NodeEdges";
import AddNodeButtons from "./AddNodeButtons";
import DeleteNodeButton from "./DeleteNodeButton";
import NodeTriangleButton from "./NodeTriangleButton";

export default function NodeOptions({ selectedNode, edges, setSelectedNode }) {

    return (
      <>
        <NodeName selectedNode={selectedNode} edges={edges} />
        {/* <NodeEdges selectedNode={selectedNode} edges={edges} /> */}
        <AddNodeButtons selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
        {selectedNode.parentId &&
        <>
        {selectedNode.data.children.length === 0 &&
          <NodeTriangleButton selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
        }
          <DeleteNodeButton selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
        </>
        }
      </>
    );
}
