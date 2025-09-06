function measureTextWidth(text, fontSize = '22pt', fontFamily = '"Computer Modern Serif", serif') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  context.font = `${fontSize} ${fontFamily}`;
  
  const metrics = context.measureText(text);
  return metrics.width;
}

function calculateLayout(nodes) {
  const nodeMap = new Map();
  nodes.forEach(node => nodeMap.set(node.id, node));
  
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
      const space = childWidths[i].rightWidth + 40 + childWidths[i + 1].leftWidth; // 40px horizontal spacing
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
        child.position.y = 80;
        
        assignRelativePositions(childId);
      });
    }
  };
  
  const rootNodes = nodes.filter(node => !node.parentId);
  
  rootNodes.forEach(rootNode => {
    assignRelativePositions(rootNode.id);
  });
  
  return nodes;
}

export default calculateLayout;