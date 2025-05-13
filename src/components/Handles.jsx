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
      />
    )
  }

  export function TriangleHandle(props){
    return (
      <Handle
      style={{top: -5}}
      id={props.id}
      isConnectable={false}
      type={props.type}
      position={props.position}
      />
    )
  }