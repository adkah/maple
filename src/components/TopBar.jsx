import { useState } from 'react';
import { PanelLeft } from 'lucide-react';

function TopBar({ isOpen, toggleSidebar }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1100,
        padding: '0.5rem',
      }}
    >
      {/* toggle button */}
      <button
        onClick={toggleSidebar}
        style={{
          width: '2.5rem',
          height: '2.5rem',
          border: 'none',
          backgroundColor: 'transparent',
          fontSize: '1.5rem',
          lineHeight: 1,
          cursor: 'pointer'
        }}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        <PanelLeft />
      </button>

      {/* your title */}
      <h1
        style={{
          fontSize: '1.5rem',
          margin: '0 0 0 0.5rem',
        }}
      >
        Maple
      </h1>

    </div>
  );
}

export default TopBar;