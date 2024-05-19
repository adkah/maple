import {
  Handle,
} from 'reactflow';

export function TreeHandle(props){
    return (
      <Handle
      isConnectableEnd={false}
      type={props.type}
      position={props.position}
      />
    )
  }

  export function MovementHandle(props){
    return (
      <Handle
      id={props.id}
      type={props.type}
      position={props.position}
      isConnectable={1}
      />
    )
  }