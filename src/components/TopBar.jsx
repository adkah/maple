import { useState } from 'react';
import { PanelLeft } from 'lucide-react';

function TopBar({ isOpen, toggleSidebar }) {
  const sidebarWidth = '20rem';
  const leftOffset = isOpen ? sidebarWidth : '.5rem';

  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: leftOffset,
        display: 'flex',
        alignItems: 'center',
        zIndex: 1100,
        transition: 'left 0.2s ease',
        transform: isOpen
            ? 'translateX(0%)'
            : 'translateX(0)',
      }}
    >
      {/* toggle button */}
      <button
        onClick={toggleSidebar}
        style={{
          transform: isOpen
            ? 'translateX(0)'
            : 'translateX(0)',
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
          transition: 'margin-left 0.2s ease',
        }}
      >
        Maple
      </h1>

    </div>
  );
}

export default TopBar;