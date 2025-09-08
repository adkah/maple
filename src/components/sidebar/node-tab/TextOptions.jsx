import { useReactFlow } from 'reactflow';

export default function TextOptions({ selectedNode, setSelectedNode }) {
    const { setNodes } = useReactFlow();
    
    const isStyleActive = (style) => {
        const textStyles = selectedNode?.data?.textStyles || [];
        return textStyles.includes(style);
    }
    
    const toggleStyle = (style) => {
        setNodes(prevNodes => prevNodes.map(node => {
            if (node.id === selectedNode.id) {
                const currentStyles = node.data.textStyles || [];
                let newStyles;
                
                if (currentStyles.includes(style)) {
                    newStyles = currentStyles.filter(s => s !== style);
                } else {
                    newStyles = [...currentStyles, style];
                }
                
                return { 
                    ...node, 
                    data: { 
                        ...node.data, 
                        textStyles: newStyles,
                    } 
                };
            }
            return node;
        }));
    }

    const handleBold = () => {
        toggleStyle('bold');
    }

    const handleItalic = () => {
        toggleStyle('italic');
    }

    const handleUnderline = () => {
        toggleStyle('underline');
    }

    return (
        <>
        <div>
            <h4>Text</h4>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
                className={`node-button ${isStyleActive('bold') ? 'active' : ''}`}
                onClick={handleBold}
                style={{
                    backgroundColor: isStyleActive('bold') ? '#2e95d3' : '',
                    color: isStyleActive('bold') ? 'white' : ''
                }}
            >
                Bold
            </button>
            <button 
                className={`node-button ${isStyleActive('italic') ? 'active' : ''}`}
                onClick={handleItalic}
                style={{
                    backgroundColor: isStyleActive('italic') ? '#2e95d3' : '',
                    color: isStyleActive('italic') ? 'white' : ''
                }}
            >
                Italic
            </button>
            <button 
                className={`node-button ${isStyleActive('underline') ? 'active' : ''}`}
                onClick={handleUnderline}
                style={{
                    backgroundColor: isStyleActive('underline') ? '#2e95d3' : '',
                    color: isStyleActive('underline') ? 'white' : ''
                }}
            >
                Underline
            </button>
        </div>
        </>
    )
}