import { useSettings } from '../../../contexts/SettingsContext';

export default function MovementStyle() {
    const { movementStyle, setMovementStyle } = useSettings();

    const handleChange = (type) => {
        setMovementStyle(type);
    }

    return (
        <div style={{ marginTop: '1rem' }}>
            <h4>Movement Style</h4>
            <button 
                className="node-button" 
                onClick={() => handleChange('curve')}
            >
                Curved
            </button>
            <button 
                className="node-button" 
                onClick={() => handleChange('straight')}
            >
                Straight
            </button>
        </div>
    )
}