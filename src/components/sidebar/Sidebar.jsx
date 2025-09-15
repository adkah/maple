import { useState } from 'react';
import NodeTab from "./node-tab/NodeTab";
import { SquareMousePointer, Network } from 'lucide-react';
import TreeTab from './tree-tab/TreeTab';

export default function Sidebar({ isOpen, toggleSidebar, selectedNode, edges, setSelectedNode }) {
    const width = '20rem';
    const [activeTab, setActiveTab] = useState('node');
    
    const tabs = [
        { id: 'node', label: 'Node', icon: SquareMousePointer },
        { id: 'tree', label: 'Tree', icon: Network }
    ];
  
    const renderTabContent = () => {
        switch (activeTab) {
            case 'node':
                return !selectedNode 
                    ? <div className="sidebarTitle">Select a node to edit.</div>
                    : <NodeTab selectedNode={selectedNode} edges={edges} setSelectedNode={setSelectedNode}/>;
            case 'tree':
                return <TreeTab />;
            default:
                return <div className="sidebarTitle">Select a tab.</div>;
        }
    };
  
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
            display: 'flex',
          }}
        >
          {/* Tab Navigation */}
          <div className="sidebar-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                title={tab.label}
              >
                <span className="tab-icon">
                  <tab.icon size={16} />
                </span>
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="sidebar-content" style={{ padding: '1rem', minWidth: 'calc(100% - 100px)' }}>
            {renderTabContent()}
          </div>
        </div>
      </>
    );
  }
  