function measureTextWidth(text, fontSize = '22pt', fontFamily = '"Computer Modern Serif", serif') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  context.font = `${fontSize} ${fontFamily}`;
  
  const metrics = context.measureText(text);
  return metrics.width;
}

function calculateLayout(nodes, spacing) {
  const { xSpacing, ySpacing } = spacing;

  // Create a deep copy of nodes to avoid mutating the original array
  const nodesCopy = nodes.map(node => ({
    ...node,
    position: { ...node.position }
  }));

  const nodeMap = new Map();
  nodesCopy.forEach(node => nodeMap.set(node.id, node));
  
  const calculateNodeWidth = (nodeId) => {
    const node = nodeMap.get(nodeId);
    if (!node) return { leftWidth: 0, rightWidth: 0 };
    
    const children = node.data.children || [];
    
    if (children.length === 0) {
      const labelWidth = measureTextWidth(node.data.label || '');
      return { leftWidth: labelWidth / 2, rightWidth: labelWidth / 2 };
    }
    
    const childWidths = children.map(childId => calculateNodeWidth(childId));
    
    let maxStep = 0;
    for (let i = 0; i < children.length - 1; i++) {
      const space = childWidths[i].rightWidth + xSpacing + childWidths[i + 1].leftWidth;
      maxStep = Math.max(maxStep, space);
    }
    
    const subWidth = ((children.length - 1) / 2) * maxStep;
    let leftWidth = subWidth + childWidths[0].leftWidth;
    let rightWidth = subWidth + childWidths[children.length - 1].rightWidth;
    
    const labelWidth = measureTextWidth(node.data.label || '');
    leftWidth = Math.max(leftWidth, labelWidth / 2);
    rightWidth = Math.max(rightWidth, labelWidth / 2);
    
    return { leftWidth, rightWidth, step: maxStep };
  };
  
  const assignRelativePositions = (nodeId) => {
    const node = nodeMap.get(nodeId);
    if (!node) return;
    
    const children = node.data.children || [];
    
    if (children.length > 0) {
      const { step } = calculateNodeWidth(nodeId);
      
      const centerOffset = (children.length - 1) * step / 2;
      
      children.forEach((childId, index) => {
        const child = nodeMap.get(childId);
        if (!child) return;
        
        const relativeX = (index * step) - centerOffset;
        
        child.position.x = relativeX;
        child.position.y = ySpacing;
        
        assignRelativePositions(childId);
      });
    }
  };

  const getAbsolutePosition = (nodeId) => {
    const node = nodeMap.get(nodeId);
    if (!node) return { x: 0, y: 0 };
    
    let absoluteX = node.position.x;
    let absoluteY = node.position.y;
  
    let currentNode = node;
    while (currentNode.parentId) {
      const parent = nodeMap.get(currentNode.parentId);
      if (!parent) break;
      
      absoluteX += parent.position.x;
      absoluteY += parent.position.y;
      currentNode = parent;
    }
    
    return { x: absoluteX, y: absoluteY };
  };

  const getTreeWidth = (nodeId) => {
    const node = nodeMap.get(nodeId);
    if (!node) return 0;

    const treeBoundaryRight = nodesCopy.reduce((max, node) => {
      const absolutePos = getAbsolutePosition(node.id);
      const nodeWidth = measureTextWidth(node.data.label || '');
      return Math.max(max, absolutePos.x + nodeWidth / 2);
    }, -Infinity);
    
    const treeBoundaryLeft = nodesCopy.reduce((min, node) => {
      const absolutePos = getAbsolutePosition(node.id);
      const nodeWidth = measureTextWidth(node.data.label || '');
      return Math.min(min, absolutePos.x - nodeWidth / 2);
    }, Infinity);

    return { treeWidth: treeBoundaryRight + Math.abs(treeBoundaryLeft), treeBoundaryLeft: treeBoundaryLeft };
  }

  const getTreeHeight = (nodeId) => {
    const node = nodeMap.get(nodeId);
    if (!node) return 0;

    const children = node.data.children || [];
    
    if (children.length === 0) {
      return 1; // Base case: leaf node has depth 1
    }
    
    // Find the maximum depth among all children
    const maxChildDepth = Math.max(...children.map(childId => getTreeHeight(childId)));
    
    return maxChildDepth + 1; // Add 1 for current level
  }
  
  const rootNodes = nodesCopy.filter(node => !node.parentId);
  
  let treeWidth = 0;
  let treeHeight = 0;
  let treeBoundaryLeft = 0;
  rootNodes.forEach(rootNode => {
    assignRelativePositions(rootNode.id);
    const { treeWidth: width, treeBoundaryLeft: left } = getTreeWidth(rootNode.id);
    treeWidth = width;
    treeBoundaryLeft = left;
    const depth = getTreeHeight(rootNode.id);
    treeHeight = Math.max(treeHeight, depth * (ySpacing + 10));
  });
  
  return { formattedNodes: nodesCopy, treeWidth, treeHeight, treeBoundaryLeft };
}

export default calculateLayout;