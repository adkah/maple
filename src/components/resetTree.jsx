const defaultX = 50;
const defaultY = 80;

const resetNodes = [
  { id: '1', type: 'treeNode', position: { x: 0, y: 0}, data: { label: 'XP' }, deletable: false },
  { id: '2', type: 'treeNode', position: { x: defaultX, y: defaultY}, data: { label: "XP" }, parentId: '1' },
  { id: '3', type: 'treeNode', position: { x: -defaultX, y: defaultY}, data: { label: 'XP' }, parentId: '1' },
];

  function getEdges(nodes){
    var edges = []
    for (let i=0; i < nodes.length; i++){
      if ('parentId' in nodes[i])
        {
          var currentNode = {
            id: ('e' + nodes[i].parentId + '-' + nodes[i].id),
            source: nodes[i].parentId,
            target: nodes[i].id,
            type: 'edge'
          }
          edges.push(currentNode)
        }
    }
    return edges
  }

  const resetEdges = getEdges(resetNodes)

  export { resetNodes, resetEdges }