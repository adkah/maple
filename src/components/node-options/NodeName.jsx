import { useState, useEffect, useRef } from "react";
import { useReactFlow } from "reactflow";

export default function NodeName({ selectedNode }) {
  const { setNodes } = useReactFlow();
  const [label, setLabel] = useState(selectedNode.data.label);
  const inputRef = useRef(null);

  useEffect(() => {
    setLabel(selectedNode.data.label);
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [selectedNode.id, selectedNode.data.label]);

  const handleChange = (e) => {
    const newLabel = e.target.value;
    if (newLabel === '') {
      setLabel('')
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, label: '' } }
            : node
        )
      );
    } else {
      setLabel(newLabel);
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, label: newLabel } }
            : node
        )
      );
    }
  };

    return (
        <>
            <strong>
                Name:&nbsp;
            </strong>
            <input
                ref={inputRef}
                type="text"
                className="input-base"
                value={label}
                placeholder="Enter a name..."
                onChange={handleChange}
            />
        </>
    );
}
