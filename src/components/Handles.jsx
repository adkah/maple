import {
  Handle,
} from 'reactflow';

export default function TreeHandle(props){
    return (
      <Handle
      type={props.type}
      position={props.position}
      isConnectable={1}
      />
    )
  }