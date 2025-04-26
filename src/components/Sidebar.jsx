import NodeOptions from "./node-options/NodeOptions";

export default function Sidebar({ isOpen, toggleSidebar, selectedNode, edges }) {
    // fixed sidebar width
    const width =  '20rem';
  
    return (
      <>
        {/* Sidebar panel */}
        <div
          className="sidebar"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width,
            height: '100vh',
            background: 'var(--sidebar-bg)',
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
            overflowY: 'auto',               // allow scrolling if content overflows
            transform: isOpen 
              ? 'translateX(0)' 
              : 'translateX(-100%)',        // slide off-screen
            transition: 'transform 0.2s ease',
            zIndex: 1000,
          }}
        >
          <div style={{ padding: '1rem' }}>
            {!selectedNode 
              ? <div style= {{ fontSize: '1.3rem ' }}>
                    Select a node to edit.
                </div>
              : <div style= {{ fontSize: '1.3rem ' }}>
                    <NodeOptions selectedNode={selectedNode} edges={edges}/>
                </div>
            }
          </div>
        </div>
      </>
    );
  }
  