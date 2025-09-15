import { useReactFlow } from 'reactflow';
import Spacing from './Spacing';
import ResetTree from './ResetTree';
import MovementStyle from './MovementStyle';

export default function TreeTab() {
    const tree = useReactFlow()

    const handleClick = () => {
        tree.alignLeafNodes()
    }

    return (
        <>
        <strong>Tree Settings</strong>
        <div>
            <Spacing />
            <MovementStyle />
            <ResetTree />
        </div>
        </>
    )
}