const resetNodes = [
  { 
    id: '1', 
    type: 'treeNode', 
    position: { x: 0, y: 0}, 
    deletable: false,
    data: {
      label: 'XP', 
      siblings: {
        left: [],
        right: [],
      },
      children: ["2", "3"],
    }
  },
  { 
    id: '2', 
    type: 'treeNode', 
    position: { x: 0, y: 0}, 
    parentId: '1',
    data: {
      label: "XP",
      siblings: {
        left: [],
        right: ["3"],
      },
      children: [],
    }
  },
  { 
    id: '3', 
    type: 'treeNode', 
    position: { x: 0, y: 0}, 
    parentId: '1' ,
    data: {
      label: 'XP',
      siblings: {
        left: ["2"],
        right: [],
      },
      children: [],
    }
  },
];

  function getEdges(nodes){
    var edges = []
    for (let i=0; i < nodes.length; i++){
      if (nodes[i].type == 'treeNode' && 'parentId' in nodes[i])
        {
          var currentNode = {
            id: ('e' + nodes[i].parentId + '-' + nodes[i].id),
            source: nodes[i].parentId,
            target: nodes[i].id,
            type: 'edge'
          }
          edges.push(currentNode)
        }
      else if (nodes[i].type == 'triangleNode') {
        var sourceToLeft = {
          id: ('e' + nodes[i].parentId + '-' + nodes[i].id + 'triangle-left'),
          source: nodes[i].parentId,
          target: nodes[i].id,
          targetHandle: nodes[i].id + 'lefttriangle',
          type: 'edge'
        }
        var sourceToRight = {
          id: ('e' + nodes[i].parentId + '-' + nodes[i].id + 'triangle-right'),
          source: nodes[i].parentId,
          target: nodes[i].id,
          targetHandle: nodes[i].id + 'righttriangle',
          type: 'edge'
        }
        var leftToRight = {
          id: ('e' + nodes[i].parentId + '-' + nodes[i].id + 'triangle-middle'),
          source: nodes[i].id,
          target: nodes[i].id,
          sourceHandle: nodes[i].id + 'lefttrianglesource',
          targetHandle: nodes[i].id + 'righttriangle',
          type: 'edge'
        }
        edges.push(sourceToLeft, sourceToRight, leftToRight)
      }
    }
    return edges
  }

  const resetEdges = getEdges(resetNodes)

  export { resetNodes, resetEdges }