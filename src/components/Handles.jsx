import {
  Handle,
} from 'reactflow';

export default function MovementHandle(props){
    return (
      <Handle
      type={props.type}
      position={props.position}
      isConnectable={1}
      />
    )
  }