import { useState, useEffect, useRef } from "react";
import { useReactFlow } from "reactflow";

export default function NodeName({ selectedNode, edges }) {
  const { setNodes } = useReactFlow();
  const [label, setLabel] = useState(selectedNode.data.label);
  const inputRef = useRef(null);

  // Sync local state if a new node is selected
  useEffect(() => {
    setLabel(selectedNode.data.label);
    // if (inputRef.current) {
    //   // focus the field...
    //   inputRef.current.focus();
    //   // ...and select all the text in it
    //   inputRef.current.select();
    // }
  }, [selectedNode.id, selectedNode.data.label]);

  const handleChange = (e) => {
    const newLabel = e.target.value;
    setLabel(newLabel);
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, label: newLabel } }
          : node
      )
    );
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
                onChange={handleChange}
            />
        </>
    );
}
