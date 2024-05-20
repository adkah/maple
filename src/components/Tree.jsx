import { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  ControlButton,
  useReactFlow,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/base.css';
import { initialNodes, initialEdges } from './initialTree';
import { resetNodes, resetEdges } from './resetTree';
import { TreeNode, NodePreview, TriangleNode } from './Nodes';
import { Edge, EdgePreview } from './Edges';
import InfoDisplay from './InfoDisplay';

// function toggleDark(){
//   if ('dark-mode' in  element.classList)
//     element.classList.remove('dark-mode');
//   else element.classList.toggle('dark-mode');
// }

// function exportTree(nodes){
//   loglog('here ya go')
//   console.log(nodes)
//   var qTreeExport = "\"Tree [."

//   for (let i=0; i<nodes.length; i++){
//     var currentChildCount = 0;

//     for (let x=0; i<nodes.length; x++){

//       // if (nodes[x].parentId == nodes[i]){
//       //   // qTreeExport.concat(", )
//       //   // currentChildCount++;
//       // }

//     }

//   }

// }

const defaultX = 50;
const defaultY = 80;
const defaultStraightX = 0;
const nodeTypes = { treeNode: TreeNode, nodePreview: NodePreview, triangleNode: TriangleNode}
const edgeTypes = { edge: Edge, edgePreview: EdgePreview }


function Tree() {
  const tree = useReactFlow()
  const [infoDisplay, setInfoDisplay] = useState(false)
  const [previewActive, setPreviewActive] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [showMoreControls, setShowMoreControls] = useState(false)
  const proOptions = { hideAttribution: true };
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
         setNodes(userTree.nodes)
         setEdges(userTree.edges)
      }
   }
   input.click();
  }

  function resetTree() {
    let reset = confirm('Reset the tree? All changes will be lost!')
    if (reset) {setNodes(resetNodes), setEdges(resetEdges)} else return
    }

  // function EditButton() {
  //   function handleClick(){
  //     setEditMode(true)
  //   }
  
  //   return (
  //     <button type='button' className='button' onClick={handleClick}>EDIT</button>
  //   )
  // }

  function toggleControls(){
    setShowMoreControls(!showMoreControls)
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

  // function onConnect(params){
  //   console.log(params)
  // }

  const onNodeClick = (event, node) => {
    const newNodeId = (Date.now()).toString();

    if (node.type !== 'previewNode' && previewActive) {removePreviews()}

    // If an existing node is being selected
    
    if (node.type !== 'previewNode' && !previewActive){
      setPreviewActive(true)

      // Gets position for preview
      const children = []
      var posX = defaultStraightX
      var posY = defaultY
      for (let i=0; i<nodes.length; i++){
        if (nodes[i].parentId == node.id){
          children.push(nodes[i])
        }
      }

      if (children.length == 1){
          posX = (children[0].position.x !== 0? -(children[0].position.x): 70);
          posY = children[0].position.y;
      }
      else if (children.length > 1){
        console.log('hi')
      }

      // Creates preview node
      const newNode = {
        id: newNodeId,
        type: 'nodePreview',
        data: { label: 'XP' },
        position: { x: posX, y: posY },
        parentId: node.id
      }
      setNodes([...nodes, newNode]); // Renders preview node

      // Creates preview edge
      const newEdge = {
        id: node.id + '-to-' + newNodeId,
        source: node.id,
        target: newNode.id,
        type: 'edgePreview',
        animated: true,
      }
      setEdges([...edges, newEdge]); // Renders preview edge
    }

    // If a preview node is being clicked

    else if (node.type == 'nodePreview') {
      setPreviewActive(false)

      // Removes preview nodes
      const updatedNodes = nodes.map(item => {
        if (item.id === node.id){
          return {...item, type: 'treeNode'};
        }
        else return item
      })

      // Removes preview edges
      const updatedEdges = edges.map(item => {
        if (item.target === node.id){
          return {...item, type: 'edge', animated: false}
        }
        else return item
      })

      setNodes(updatedNodes)
      setEdges(updatedEdges)
    }
  }

  // Called to remove any previews on the screen
  const onPaneClick = (params) => {
    removePreviews()
    if (showMoreControls) toggleControls()
  }

  function onNodeDrag(event, node){
    // Checks if all pairs of sisters in tree are symmetrical - finish later
    const sisters = []
    for (let i=0; i < edges.length; i++){
      for (let x=0; x < edges.length; x++){
        if (edges[i].source === edges[x].source){
          sisters.push([edges[i], edges[x]])
        }
      }
    }

    // const globalSymmnetry = false;
    // for (let i=0; i < sisters.length; i++){
    //   if (sisters[i][0])
    // }

    // Checks if edge being moved is being placed symmetrically with a sister 
    for (let i=0; i < nodes.length; i++){

      // Activates symmetry indicator
      if (
        node.parentId === nodes[i].parentId && node.position.x === -nodes[i].position.x && node.position.y === nodes[i].position.y
        || node.position.x == 0
      ){
        const symmetryEdges = edges.map(item => {
          if (item.source === node.parentId){
            return {...item, animated: true, style: {stroke: 'green'}}
          }
          else return item
        })
        setEdges(symmetryEdges)
      }

      // else if (node.parentId == nodes[i].id && node.position.x == nodes[i].position.x){
      //   const symmetryEdges = edges.map(item => {
      //     if (item.source === node.parentId){
      //       return {...item, animated: true, style: {stroke: 'green'}}
      //     }
      //     else return item
      //   })
      //   setEdges(symmetryEdges)
      // }

      // Deactivates symmetry indicator
      else {
        for (let i=0; i < edges.length; i++){
          if (edges[i].animated){
            const regularEdges = edges.map(item => {
              return {...item, animated: false, style: {}}
          })
          setEdges(regularEdges)
        }
      }
      }
    }
    removePreviews();
    setShowMoreControls(false);
  }
  
  // Undoes any symmetry animations
  function onNodeDragStop(event, node, nodes){
    const regularEdges = edges.map(item => {
      if (item.type == 'edge')
        return {...item, animated: false, style: {}}
      else return {...item, style: {}}
    })
    setEdges(regularEdges)
  }

  function onSelectionStart(params){
    console.log(params)
  }

  function toggleEditMode(){

  }

  function removePreviews(){
    setPreviewActive(false)

    const nodesToRemove = []
    const edgesToRemove = []

    for (let i=0; i < nodes.length; i++){
      if (nodes[i].type == 'nodePreview'){
        setNodes(
          nodes.filter(n => n.id !== nodes[i].id)
        );
      }
    }
    for (let i=0; i < edges.length; i++){
      if (edges[i].type == 'edgePreview'){
        setEdges(
          edges.filter(n => n.id !== edges[i].id)
        );
      }
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        // nodesDraggable={false}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        className="canvas"
        minZoom={1 - (nodes.length * 0.025)}
        maxZoom={1}
        // defaultViewport={{ x: 50, y: 50, zoom: 1 }}
        fitView={true}
        snapToGrid
        snapGrid={[10, defaultY]}
        preventScrolling={true}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        onSelectionStart={onSelectionStart}
        proOptions={proOptions}
        connectionLineType={'default'}
      >
      <Controls position='top-right' showZoom={false} showFitView={false} showInteractive={false}>
        
        <ControlButton onClick={toggleControls}>
        <i className="material-icons">more_vert</i>
        </ControlButton>

      </Controls>

       {showMoreControls && <Controls className='popup-settings 'position='top-right' style={{top: '35px'}} showZoom={false} showFitView={false} showInteractive={false}>

       <ControlButton onClick={setEditMode}>
        <div className='button-label'>Edit</div>
        <i className="material-icons">edit</i>
        </ControlButton>

        <ControlButton onClick={resetTree}>
        <div className='button-label'>Reset</div>
        <i className="material-icons">delete_forever</i>
        </ControlButton>

        <ControlButton onClick={uploadTree}>
        <div className='button-label'>Upload</div>
        <i className="material-icons">file_upload</i>
        </ControlButton>

        <ControlButton onClick={downloadTree} aria-label='download'>
        <div className='button-label'>Download</div>
        <i className="material-icons">file_download</i>
        </ControlButton>

        <ControlButton onClick={toggleControls}>
        <i className="material-icons">cancel</i>
        </ControlButton>

      </Controls>}

      <Controls position='top-right' style={{right: '35px'}} showZoom={false} showFitView={false} showInteractive={false}>

        <ControlButton onClick={showInfo}>
        {/* <i className="fa fa-info-circle" style={{fontSize: '27px', backgroundColor: 'inherit'}}></i> */}
        <i className="material-icons">info_outline</i>
        </ControlButton>

      </Controls>

      <Controls position='bottom-center' showZoom={false} showFitView={false} showInteractive={false}>

        <ControlButton>
        <i className="material-icons">undo</i>
        </ControlButton>

      </Controls>

      {infoDisplay && <InfoDisplay/>}
      <Background variant="none" gap="none" backgroundColor="white" size={1}/>
      </ReactFlow>
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