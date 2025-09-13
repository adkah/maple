import { useState, useMemo, useEffect } from 'react';
import ReactFlow, {
  Background,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/base.css';
import { TreeNode, TriangleNode } from './Nodes';
import { Edge } from './Edges';
import InfoDisplay from './InfoDisplay';
import TopBar from './TopBar';
import Sidebar from './sidebar/Sidebar';
import calculateLayout from '../utils/calculateLayout';
import useSpacing from '../hooks/useSpacing';
import { useLocalStorage } from '../hooks/useLocalStorage';

const defaultY = 80;
const nodeTypes = { treeNode: TreeNode, triangleNode: TriangleNode}
const edgeTypes = { edge: Edge }

function Tree() {
  const {tree, fitBounds, getViewport} = useReactFlow()
  const spacing = useSpacing();
  const [infoDisplay, setInfoDisplay] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showMoreControls, setShowMoreControls] = useState(false)
  const proOptions = { hideAttribution: true };
  
  const {
    nodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    loadState,
    resetState
  } = useLocalStorage();


  function showInfo(){
    setInfoDisplay(!infoDisplay)
  }

  function downloadTree(){
    const treeFile = tree.toObject()
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(treeFile, null, 2)], {
      type: "application/json"
    }));
    a.setAttribute("download", "MyTree.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function uploadTree() {
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => { 

      // getting a hold of the file reference
      var file = e.target.files[0]; 
   
      // setting up the reader
      var reader = new FileReader();
      reader.readAsText(file,'UTF-8');
   
      // here we tell the reader what to do when it's done reading...
      reader.onload = readerEvent => {
         var content = readerEvent.target.result; // this is the content!
         var userTree = JSON.parse(content)
         loadState(userTree.nodes, userTree.edges)
      }
   }
   input.click();
  }

  function toggleControls(){
    setShowMoreControls(!showMoreControls)
  }

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen)
  }

  function onConnect(params){
    for (let i=0; i<nodes.length; i++){
      if (nodes[i].id == params.target){
        var connectedNode = nodes[i].id
        break;
      }
    }
    var newConnection = {...params, targetHandle: connectedNode, type: 'smoothstep'}
    setEdges([...edges, newConnection]);
  }

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setIsSidebarOpen(true)
  }

  const onPaneClick = (params) => {
    setSelectedNode(null)
  }

  const layoutData = useMemo(() => {
    return calculateLayout(nodes, spacing);
  }, [nodes, spacing]);


  useEffect(() => {
    if (layoutData.treeWidth > 0 && layoutData.treeHeight > 0) {
      fitBounds(
        {
          "width": layoutData.treeWidth,
          "height": layoutData.treeHeight,
          "x": layoutData.treeBoundaryLeft,
          "y": -layoutData.treeHeight/10
        },
        {
          duration: 0
        }
      );
    }
  }, [layoutData, fitBounds]);

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      display: 'flex',
      flexDirection: 'row'
    }}>
      <Sidebar
        isOpen={isSidebarOpen}
        selectedNode={selectedNode}
        edges={edges}
        setSelectedNode={setSelectedNode}
        spacing={spacing}
      />
      <div style={{ 
        flex: 1,
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <ReactFlow
          edgesFocusable={false}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          className="canvas"
          // minZoom={1 - (nodes.length * 0.025)}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          minZoom={-100}
          maxZoom={1}
          // fitView={true}
          snapToGrid
          snapGrid={[10, defaultY]}
          preventScrolling={true}
          nodes={layoutData.formattedNodes}
          nodesDraggable={false}
          panOnDrag={false}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          proOptions={proOptions}
          connectionLineType={'default'}
        >

        {infoDisplay && <InfoDisplay/>}
        <Background variant="none" gap="none" backgroundColor="white" size={1}/>
        </ReactFlow>
        <TopBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
      </div>
    </div>
  );
}

function TreeWithProvider(props) {
  return (
    <ReactFlowProvider>
      <Tree {...props} />
    </ReactFlowProvider>
  );
}


export default TreeWithProvider;
