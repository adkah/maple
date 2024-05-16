import { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  ControlButton
} from 'reactflow';
import 'reactflow/dist/base.css';
import { initialNodes, initialEdges } from './initialTree';
import { TreeNode, NodePreview } from './Nodes';
import { Edge, EdgePreview } from './Edges';

// function toggleDark(){
//   if ('dark-mode' in  element.classList)
//     element.classList.remove('dark-mode');
//   else element.classList.toggle('dark-mode');
// }

// function exportTree(nodes){
//   console.log('here ya go')
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
const nodeTypes = { treeNode: TreeNode, nodePreview: NodePreview}
const edgeTypes = { edge: Edge, edgePreview: EdgePreview }


function Tree() {
  const [editMode, setEditMode] = useState(false)
  const [showMoreControls, setShowMoreControls] = useState(false)
  const proOptions = { hideAttribution: true };
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  function resetTree() {
    let reset = confirm('Reset the tree? All changes will be lost!')
    if (reset) {setNodes(initialNodes), setEdges(initialEdges)} else return
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
    !showMoreControls? setShowMoreControls(true): setShowMoreControls(false)
  }

  // Creates connection between 2 nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = (event, node) => {
    const newNodeId = (Date.now()).toString();

    // If an existing node is being selected
    
    if (node.type == 'treeNode'){
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
    console.log(params)
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
      if (node.parentId === nodes[i].parentId && node.position.x === -nodes[i].position.x && node.position.y === nodes[i].position.y){
        const symmetryEdges = edges.map(item => {
          if (item.source === node.parentId){
            return {...item, animated: true, style: {stroke: 'green'}}
          }
          else return item
        })
        setEdges(symmetryEdges)
      }

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
  }
  
  // Undoes any symmetry animations
  function onNodeDragStop(event, node, nodes){
    const regularEdges = edges.map(item => {
        return {...item, animated: false, style: {}}
    })
    setEdges(regularEdges)
  }

  function onSelectionStart(params){
    console.log(params)
  }

  function toggleEditMode(){

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
        <i className="fa fa-gear" style={{fontSize: '27px', backgroundColor: 'inherit'}}></i>
        </ControlButton>

        {showMoreControls && <ControlButton onClick={resetTree}>
        <i className="fa fa-trash-o animate-button" style={{fontSize: '27px', backgroundColor: 'inherit'}}></i>
        </ControlButton>}

        {showMoreControls && <ControlButton onClick={toggleControls}>
        <i className="fa fa-close animate-button" style={{fontSize: '27px', backgroundColor: 'inherit'}}></i>
        </ControlButton>}

      </Controls>

      <Controls position='top-right' style={{right: '35px'}} showZoom={false} showFitView={false} showInteractive={false}>

        <ControlButton>
        {/* <i className="fa fa-info-circle" style={{fontSize: '27px', backgroundColor: 'inherit'}}></i> */}
        <i class="material-icons">info</i>
        </ControlButton>

      </Controls>

      <Controls position='bottom-center' showZoom={false} showFitView={false} showInteractive={false}>

        <ControlButton>
        <i className="fa fa-undo" style={{fontSize: '20px', backgroundColor: 'inherit'}}></i>
        </ControlButton>

      </Controls>

      <Background variant="none" gap="none" backgroundColor="white" size={1}/>
      </ReactFlow>
    </div>
  );
}

export default Tree;