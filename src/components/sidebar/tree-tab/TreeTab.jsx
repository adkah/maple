import { useReactFlow } from 'reactflow';
import Spacing from './Spacing';

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
        </div>
        </>
    )
}