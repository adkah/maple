import { useEffect, useState } from 'react';
import { useReactFlow, getConnectedEdges } from 'reactflow';

export default function NodeEdges({ selectedNode }) {
  const { getNodes, getEdges } = useReactFlow();
  const [parentNodes, setParentNodes] = useState([]);
  const [childNodes, setChildNodes] = useState([]);

  useEffect(() => {
    const nodes = getNodes();
    const edges = getEdges().filter(e => e.type !== 'edgePreview');

    // Edges pointing *into* the selected node
    const parentEdges = edges.filter(e => e.target === selectedNode.id);
    // Edges pointing *out* from the selected node
    const childEdges  = edges.filter(e => e.source === selectedNode.id);

    const parents = Array.from(
      new Set(parentEdges.map(e => e.source))
    )
    .map(id => nodes.find(n => n.id === id))
    .filter(Boolean);

    const children = Array.from(
      new Set(childEdges.map(e => e.target))
    )
    .map(id => nodes.find(n => n.id === id))
    .filter(Boolean);

    setParentNodes(parents);
    setChildNodes(children);
  }, [selectedNode]);

  return (
    <div>
      <h4>Parents:</h4>
      {parentNodes.length > 0 ? (
        <ul>
          {parentNodes.map(n => (
            <li key={n.id}>{n.data.label}</li>
          ))}
        </ul>
      ) : (
        <p><em>No parent nodes</em></p>
      )}

      <h4>Children:</h4>
      {childNodes.length > 0 ? (
        <ul>
          {childNodes.map(n => (
            <li key={n.id}>{n.data.label}</li>
          ))}
        </ul>
      ) : (
        <p><em>No child nodes</em></p>
      )}
    </div>
  );
}
