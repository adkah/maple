import NodeOptions from "./node-options/NodeOptions";

export default function Sidebar({ isOpen, toggleSidebar, selectedNode, edges, setSelectedNode }) {
    // fixed sidebar width
    const width =  '20rem';
  
    return (
      <>
        {/* Sidebar panel */}
        <div
          className="sidebar"
          style={{
            position: 'relative',
            width: isOpen ? width : '0',
            height: '100vh',
            background: 'var(--sidebar-bg)',
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
            overflowY: 'auto',
            overflowX: 'hidden',
            transition: 'width 0.2s ease',
            flexShrink: 0,
          }}
        >
          <div style={{ padding: '1rem', minWidth: width }}>
            {!selectedNode 
              ? <div className={"sidebarTitle"}>
                    Select a node to edit.
                </div>
              : <div>
                    <NodeOptions selectedNode={selectedNode} edges={edges} setSelectedNode={setSelectedNode}/>
                </div>
            }
          </div>
        </div>
      </>
    );
  }
  