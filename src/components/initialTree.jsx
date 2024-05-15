const defaultX = 50;
const defaultY = 80;
const defaultStraightX = 0;

const initialNodes = [
  { id: '1', type: 'treeNode', position: { x: 0, y: 0}, data: { label: 'S' }, deletable: false },
  { id: '2', type: 'treeNode', position: { x: defaultX, y: defaultY}, data: { label: "VP" }, parentId: '1' },
  { id: '3', type: 'treeNode', position: { x: -defaultX, y: defaultY}, data: { label: 'NP' }, parentId: '1' },
  { id: '4', type: 'treeNode', position: { x: -defaultStraightX, y: defaultY}, data: { label: 'N' }, parentId: '3' },
  { id: '5', type: 'treeNode', position: { x: -defaultStraightX, y: defaultY}, data: { label: 'This' }, parentId: '4' },
  { id: '6', type: 'treeNode', position: { x: defaultX, y: defaultY}, data: { label: 'DP' }, parentId: '2' },
  { id: '7', type: 'treeNode', position: { x: -defaultX, y: defaultY}, data: { label: 'V' }, parentId: '2' },
  { id: '8', type: 'treeNode', position: { x: -defaultStraightX, y: defaultY}, data: { label: 'is' }, parentId: '7' },
  { id: '9', type: 'treeNode', position: { x: -defaultX, y: defaultY}, data: { label: 'D' }, parentId: '6' },
  { id: '10', type: 'treeNode', position: { x: -defaultStraightX, y: defaultY}, data: { label: 'your' }, parentId: '9' },
  { id: '11', type: 'treeNode', position: { x: defaultX, y: defaultY}, data: { label: 'NP' }, parentId: '6' },
  { id: '12', type: 'treeNode', position: { x: defaultStraightX, y: defaultY}, data: { label: 'N' }, parentId: '11' },
  { id: '13', type: 'treeNode', position: { x: defaultStraightX, y: defaultY}, data: { label: 'tree' }, parentId: '12' }
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

  const initialEdges = getEdges(initialNodes)

  export { initialNodes, initialEdges }