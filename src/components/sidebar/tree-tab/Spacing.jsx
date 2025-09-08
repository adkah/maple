import { useReactFlow } from 'reactflow';
import Slider from '@mui/material/Slider';

export default function Spacing({ spacing }) {
    const { xSpacing, ySpacing, setXSpacing, setYSpacing } = spacing;
    const { setCenter } = useReactFlow();
    
    const handleXChange = (event, newValue) => {
        setXSpacing(newValue);
    }

    const handleYChange = (event, newValue) => {
        setYSpacing(newValue);
    }

    const handleXReset = () => {
        setXSpacing(40);
    }

    const handleYReset = () => {
        setYSpacing(80);
    }

    
    return (
        <div>
            <h4>Spacing</h4>
            <div>
                <div className="slider-label">Horizontal</div>   
                <div className="slider-container">
                    <Slider
                        value={xSpacing}
                        min={20}
                        max={200}
                        onChange={handleXChange}
                        aria-labelledby="non-linear-slider"
                        valueLabelDisplay="off"
                        style={{ width: '70%' }}
                    />
                    <button onClick={handleXReset} className="slider-reset-button">Reset</button>
                </div>
            </div>
            <div>
                <div className="slider-label">Vertical</div>
                <div className="slider-container">
                    <Slider
                        value={ySpacing}
                        min={45}
                        max={200}
                        onChange={handleYChange}
                        aria-labelledby="non-linear-slider"
                        valueLabelDisplay="off"
                        style={{ width: '70%' }}
                    />
                    <button onClick={handleYReset} className="slider-reset-button">Reset</button>
                </div>
            </div>
        </div>
    )
}