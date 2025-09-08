import NodeName from "./NodeName";
import NodeEdges from "./NodeEdges";
import AddNodeButtons from "./AddNodeButtons";
import DeleteNodeButton from "./DeleteNodeButton";
import NodeTriangleButton from "./NodeTriangleButton";
import TextOptions from "./TextOptions";

export default function NodeTab({ selectedNode, edges, setSelectedNode }) {
    return (
      <>
      <strong>Node Editor</strong>
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
        <TextOptions selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
      </>
    );
}
