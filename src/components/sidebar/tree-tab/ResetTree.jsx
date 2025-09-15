import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { resetNodes, resetEdges } from '../../resetTree';
import { useReactFlow } from 'reactflow';
import { useSettings } from '../../../contexts/SettingsContext';

export default function ResetTree() {
    const { resetState } = useLocalStorage();
    const {setNodes, setEdges } = useReactFlow();
    const { resetAllSettings } = useSettings();

    const handleReset = () => {
        let reset = confirm('Reset the tree? All changes will be lost!')
        if (reset) {
          resetState(resetNodes, resetEdges);
          setNodes(resetNodes);
          setEdges(resetEdges);
          resetAllSettings();
        } else return
    }

    return (
        <div style={{ marginTop: '1rem' }}>
            <button 
                className="node-button delete-node-button" 
                onClick={handleReset}
            >
                Reset tree
            </button>
        </div>
    )
}``