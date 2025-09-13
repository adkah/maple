import { useReactFlow } from 'reactflow';
import Spacing from './Spacing';
import ResetTree from './ResetTree';

export default function TreeTab({ spacing }) {
    const tree = useReactFlow()

    const handleClick = () => {
        tree.alignLeafNodes()
    }

    return (
        <>
        <strong>Tree Settings</strong>
        <div>
            <Spacing spacing={spacing} />
            <ResetTree />
        </div>
        </>
    )
}