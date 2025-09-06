import { useEffect } from "react";

function useKeyboardShortcuts(selectedNode, actions) {
    if (!selectedNode) return;

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'n' && actions.addChild) {
                event.preventDefault();
                actions.addChild();
            }
            if (event.ctrlKey && event.key === 'p' && actions.addParent) {
                event.preventDefault();
                actions.addParent();
            }
            if (event.ctrlKey && event.key === 'l' && actions.addSiblingLeft) {
                event.preventDefault();
                actions.addSiblingLeft();
            }
            if (event.ctrlKey && event.key === 'r' && actions.addSiblingRight) {
                event.preventDefault();
                actions.addSiblingRight();
            }
            if (event.ctrlKey && event.key === 'd' && actions.deleteNode) {
                event.preventDefault();
                actions.deleteNode();
            }
            if (event.ctrlKey && event.key === 't' && actions.convertToTriangle) {
                event.preventDefault();
                actions.convertToTriangle();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedNode, actions]);
}

export default useKeyboardShortcuts;